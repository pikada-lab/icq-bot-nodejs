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

/** Фильтр проверяет наличие 1 символа похожего на "/" или "." */
export class CommandFilter extends MessageFilter {
    COMMAND_PREFIXES: String[] = ["/", "."];

    filter(event: ICQEvent) {
        return (super.filter(event) && this.COMMAND_PREFIXES.findIndex(r => r === (event.data as NewMessageEvent).text.trim()[0]) >= 0)
    }
}

/** Фильтр проверяет регулярным выражением  текст сообщения   */
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
 * Возвращает истину если тип сообщения файл
 */
export class FileFilter extends MessageFilter {
    filter(event) {
        return super.filter(event) && event.data['parts'] &&
            event.data['parts'].findIndex(r => r && r.type == PartsType.FILE) >= 0
    }
}


export class ImageFilter extends FileFilter {
    filter(event: ICQEvent) {
        return super.filter(event) &&
            event.data['parts'].findIndex(r => r && r["payload"] && r.payload["type"] && (r.payload as PartFile).type == PayLoadFileType.IMAGE) >= 0
    }
}

export class VideoFilter extends FileFilter {
    filter(event: ICQEvent) {
        return super.filter(event) &&
            event.data['parts'].findIndex(r => r && r["payload"] && r.payload["type"] && (r.payload as PartFile).type == PayLoadFileType.VIDEO) >= 0
    }
}

export class AudioFilter extends FileFilter {
    filter(event: ICQEvent) {
        return super.filter(event) &&
            event.data['parts'].findIndex(r => r && r["payload"] && r.payload["type"] && (r.payload as PartFile).type == PayLoadFileType.AUDIO) >= 0
    }
}

export class StickerFilter extends MessageFilter {
    filter(event: ICQEvent) { 
        return super.filter(event) && event.data['parts'] &&
            event.data['parts'].findIndex(r => r && r.type == PartsType.STICKER) >= 0
    }
}

export class MentionFilter extends MessageFilter {
    constructor(public userId: Number) {
        super();
    }
    filter(event) {
        return super.filter(event) && event.data['parts'] &&
            event.data['parts'].findIndex(r => r && r.type == PartsType.MENTION && (!this.userId || r.payload.userId == this.userId)) >= 0
    }
}


export class ForwardFilter extends MessageFilter {
    filter(event: ICQEvent) {
        return event.data['parts'] && (event.data as NewMessageEvent).parts.findIndex(r => r && r.type == PartsType.FORWARD) >= 0
    }
}

export class ReplyFilter extends MessageFilter {
    filter(event: ICQEvent) {
        return super.filter(event) && event.data['parts'] &&
            (event.data as NewMessageEvent).parts.findIndex(r => r && r.type == PartsType.REPLY) >= 0
    }
}


export class URLFilter extends RegexpFilter {

    constructor() {
        super(/^\s*https?:\/\/\S+\s*$/i)
    }

    filter(event: ICQEvent) {
        return super.filter(event) && !new FileFilter().filter(event)
    }
}

export enum TypeFilterOperation {
    and = 1,
    or,
    not
}
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
    static message = new MessageFilter()
    static command = new CommandFilter()
    static file = new FileFilter()
    static image = new ImageFilter()
    static video = new VideoFilter()
    static audio = new AudioFilter()
    static media = FilterComposite.or(FilterComposite.or(Filter.image, Filter.video), Filter.audio);
    static data = FilterComposite.and(Filter.file, FilterComposite.not(Filter.media));
    static sticker = new StickerFilter()
    static url = new URLFilter()
    static text = FilterComposite.and(Filter.message, FilterComposite.not(FilterComposite.or(FilterComposite.or(FilterComposite.or(Filter.command, Filter.sticker), Filter.file), Filter.url)));
    static regexp = RegexpFilter
    static mention = MentionFilter
    static forward = new ForwardFilter()
    static reply = new ReplyFilter()
    static sender = SenderFilter
}
