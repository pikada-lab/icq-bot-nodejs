import { PartsType, PartFile, PayLoadFileType } from "./Entities/Part";

import { NewMessageEvent } from "./Events/NewMessageEvent";
import { ICQEvent } from "../class/ICQEvent";


export interface Filters {
    filter(event: ICQEvent): boolean;
}

/** Фильтр проверяет тип события и наличие текста в нём */
export class MessageFilter implements Filters {
    filter(event: ICQEvent): boolean {
        return event.data["text"] && event["text"].length > 0;
    }
}

/** Фильтр проверяет наличие первого символа на равенство "/" или "." */
export class CommandFilter extends MessageFilter {
    COMMAND_PREFIXES: String[] = ["/", "."];

    filter(event: ICQEvent) {  
        return (super.filter(event) && this.COMMAND_PREFIXES.findIndex(r => r === (event.data as NewMessageEvent).text.trim()[0]) >= 0)
    }
}

/** Фильтр проверяет регулярным выражением текст сообщения и фильтрует по нему  */
export class RegexpFilter extends MessageFilter {
    pattern: RegExp;
    constructor(pattern: RegExp) {
        super();
        this.pattern = pattern;
    }

    filter(event) {
        return super.filter(event) && this.pattern.test(event.data["text"])
    }
}

/**
 * Фильтрует сообщения конкретного пользователя
 */
export class SenderFilter extends MessageFilter {
    constructor(private user_id: number) {
        super();
    }
    filter(event) {
        return super.filter(event) && event.data['from'] && event.data['from']['userId'] == this.user_id
    }
}

/**
 * Фильтрует события и оставляет только сообщения с полезной нагрузкой типа файл
 */
export class FileFilter extends MessageFilter {
    filter(event) {
        return super.filter(event) && event.data['parts'] &&
            event.data['parts'].findIndex(r => r && r.type == PartsType.FILE) >= 0
    }
}

/**
 * Фильтрует события и оставляет только сообщения с полезной нагрузкой типа изображение
 */
export class ImageFilter extends FileFilter {
    filter(event: ICQEvent) {
        return super.filter(event) &&
            event.data['parts'].findIndex(r => r && r["payload"] && r.payload["type"] && (r.payload as PartFile).type == PayLoadFileType.IMAGE) >= 0
    }
}

/**
 * Фильтрует события и оставляет только сообщения с полезной нагрузкой типа видел
 */
export class VideoFilter extends FileFilter {
    filter(event: ICQEvent) {
        return super.filter(event) &&
            event.data['parts'].findIndex(r => r && r["payload"] && r.payload["type"] && (r.payload as PartFile).type == PayLoadFileType.VIDEO) >= 0
    }
}

/**
 * Фильтрует события и оставляет только сообщения с полезной нагрузкой типа Аудио
 */
export class AudioFilter extends FileFilter {
    filter(event: ICQEvent) {
        return super.filter(event) &&
            event.data['parts'].findIndex(r => r && r["payload"] && r.payload["type"] && (r.payload as PartFile).type == PayLoadFileType.AUDIO) >= 0
    }
}

/**
 * Фильтрует события и оставляет только сообщения с полезной нагрузкой типа Стикер
 */
export class StickerFilter extends MessageFilter {
    filter(event: ICQEvent) {
        return super.filter(event) && event.data['parts'] &&
            event.data['parts'].findIndex(r => r && r.type == PartsType.STICKER) >= 0
    }
}

/**
 * Фильтрует события где был упомянут пользователь
 */
export class MentionFilter extends MessageFilter {
    constructor(public userId: Number) {
        super();
    }
    filter(event) {
        return super.filter(event) && event.data['parts'] &&
            event.data['parts'].findIndex(r => r && r.type == PartsType.MENTION && (!this.userId || r.payload.userId == this.userId)) >= 0
    }
}

/**
 * Фильтрует события и оставляет только сообщения с полезной нагрузкой типо FORWARD - Перенаправленное (Пересылаемое сообщение)
 */
export class ForwardFilter extends MessageFilter {
    filter(event: ICQEvent) {
        return event.data['parts'] && (event.data as NewMessageEvent).parts.findIndex(r => r && r.type == PartsType.FORWARD) >= 0
    }
}

/**
 * Фильтрует события и оставляет только сообщения с полезной нагрузкой типо Reply - Цитата сообщения
 */
export class ReplyFilter extends MessageFilter {
    filter(event: ICQEvent) {
        return super.filter(event) && event.data['parts'] &&
            (event.data as NewMessageEvent).parts.findIndex(r => r && r.type == PartsType.REPLY) >= 0
    }
}

/**
 * Фильтрует сообщения состоящии из одной URL ссылки. Допускаются пробелы в начале и конце сообщения.
 */
export class URLFilter extends RegexpFilter {

    constructor() {
        super(/^\s*https?:\/\/\S+\s*$/i)
    }

    filter(event: ICQEvent) {
        return super.filter(event) && !new FileFilter().filter(event)
    }
}

/** Типы операций над фильтрами */
export enum TypeFilterOperation {
    and = 1,
    or,
    not
}

/** Создаёт композитный фильтр из двух, применяя к ним оператор сравнения. Рекомендую использовать статические методы and, or, not */
export class FilterComposite implements Filters {
    constructor(private type: TypeFilterOperation, private leftFilter: Filters, private rightFilter?: Filters) {

    }
    static and(leftFilter: Filters, rightFilter: Filters) {
        return new FilterComposite(TypeFilterOperation.and, leftFilter, rightFilter);
    }
    static or(leftFilter: Filters, rightFilter: Filters) {
        return new FilterComposite(TypeFilterOperation.or, leftFilter, rightFilter);
    }
    static not(filter: Filters) {
        return new FilterComposite(TypeFilterOperation.not, filter);

    }
    filter(event: ICQEvent) {
        switch (this.type) {
            case TypeFilterOperation.and:
                return this.leftFilter.filter(event) && this.rightFilter.filter(event);
            case TypeFilterOperation.or:
                return this.leftFilter.filter(event) || this.rightFilter.filter(event);
            case TypeFilterOperation.not:
                return !this.leftFilter.filter(event);
        }
        throw "Not type filter"
    }
}


export class Filter {

    /** 
     * Фильтр проверяет тип события 
     * и наличие текста в нём 
     */
    static message = new MessageFilter()

    /** 
     * Фильтр проверяет наличие первого 
     * символа на равенство "/" или "." 
     */
    static command = new CommandFilter()

    /** Фильтрует сообщения конкретного пользователя */
    static file = new FileFilter()

    /**
     * Фильтрует события и оставляет только 
     * сообщения с полезной нагрузкой типа изображение
     */
    static image = new ImageFilter()

    /**
     * Фильтрует события и оставляет только 
     * сообщения с полезной нагрузкой типа Видео
     */
    static video = new VideoFilter()

    /**
     * Фильтрует события и оставляет только 
     * сообщения с полезной нагрузкой типа Аудио
     */
    static audio = new AudioFilter()


    /**
     * Фильтрует события и оставляет только сообщения 
     * с полезной нагрузкой типа Аудио, Видео, Изображение
     */
    static media = FilterComposite.or(FilterComposite.or(Filter.image, Filter.video), Filter.audio);


    /**
     * Фильтрует события и оставляет только 
     * сообщения с полезной нагрузкой типа Аудио, 
     * Видео, Изображение, Файл
     */
    static data = FilterComposite.and(Filter.file, FilterComposite.not(Filter.media));

    /**
     * Фильтрует события и оставляет только 
     * сообщения с полезной нагрузкой типа Стикер
     */
    static sticker = new StickerFilter()

    /**
     * Фильтрует сообщения состоящии из одной URL ссылки. 
     * Допускаются пробелы в начале и конце сообщения.
     */
    static url = new URLFilter()


    /**
     * Фильтрует события и оставляет только сообщения 
     * с полезной нагрузкой типа Аудио, Видео, 
     * Изображение, Файл, Стикер, Ссылка
     * 
     * Все сообщения у которых может быть текст.
     */
    static text = FilterComposite.and(Filter.message, FilterComposite.not(FilterComposite.or(FilterComposite.or(FilterComposite.or(Filter.command, Filter.sticker), Filter.file), Filter.url)));

    /** 
     * Фильтр проверяет регулярным выражением 
     * текст сообщения и фильтрует по нему 
     */
    static regexp = RegexpFilter

    /**
     * Фильтрует события где был упомянут пользователь
     */
    static mention = MentionFilter

    /** 
     * Фильтрует события и оставляет только сообщения 
     * с полезной нагрузкой типо FORWARD - 
     * Перенаправленное (Пересылаемое сообщение) */
    static forward = new ForwardFilter()

    /**  Фильтрует события и оставляет только сообщения 
     * с полезной нагрузкой типо Reply - Цитата сообщения */
    static reply = new ReplyFilter()

    /**
     * Фильтрует сообщения отпраленные конкретным пользователем
     */
    static sender = SenderFilter
}
