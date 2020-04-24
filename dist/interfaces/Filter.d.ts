import { ICQEvent } from "../class/ICQEvent";
export interface Filters {
    filter(event: ICQEvent): boolean;
}
/** Фильтр проверяет тип события и наличие текста в нём */
export declare class MessageFilter implements Filters {
    filter(event: ICQEvent): boolean;
}
/** Фильтр проверяет наличие первого символа на равенство "/" или "." */
export declare class CommandFilter extends MessageFilter {
    COMMAND_PREFIXES: String[];
    filter(event: ICQEvent): boolean;
}
/** Фильтр проверяет регулярным выражением текст сообщения и фильтрует по нему  */
export declare class RegexpFilter extends MessageFilter {
    pattern: RegExp;
    constructor(pattern: RegExp);
    filter(event: any): boolean;
}
/**
 * Фильтрует сообщения конкретного пользователя
 */
export declare class SenderFilter extends MessageFilter {
    private user_id;
    constructor(user_id: number);
    filter(event: any): boolean;
}
/**
 * Фильтрует события и оставляет только сообщения с полезной нагрузкой типа файл
 */
export declare class FileFilter extends MessageFilter {
    filter(event: any): boolean;
}
/**
 * Фильтрует события и оставляет только сообщения с полезной нагрузкой типа изображение
 */
export declare class ImageFilter extends FileFilter {
    filter(event: ICQEvent): boolean;
}
/**
 * Фильтрует события и оставляет только сообщения с полезной нагрузкой типа видел
 */
export declare class VideoFilter extends FileFilter {
    filter(event: ICQEvent): boolean;
}
/**
 * Фильтрует события и оставляет только сообщения с полезной нагрузкой типа Аудио
 */
export declare class AudioFilter extends FileFilter {
    filter(event: ICQEvent): boolean;
}
/**
 * Фильтрует события и оставляет только сообщения с полезной нагрузкой типа Стикер
 */
export declare class StickerFilter extends MessageFilter {
    filter(event: ICQEvent): boolean;
}
/**
 * Фильтрует события где был упомянут пользователь
 */
export declare class MentionFilter extends MessageFilter {
    userId: Number;
    constructor(userId: Number);
    filter(event: any): boolean;
}
/**
 * Фильтрует события и оставляет только сообщения с полезной нагрузкой типо FORWARD - Перенаправленное (Пересылаемое сообщение)
 */
export declare class ForwardFilter extends MessageFilter {
    filter(event: ICQEvent): boolean;
}
/**
 * Фильтрует события и оставляет только сообщения с полезной нагрузкой типо Reply - Цитата сообщения
 */
export declare class ReplyFilter extends MessageFilter {
    filter(event: ICQEvent): boolean;
}
/**
 * Фильтрует сообщения состоящии из одной URL ссылки. Допускаются пробелы в начале и конце сообщения.
 */
export declare class URLFilter extends RegexpFilter {
    constructor();
    filter(event: ICQEvent): boolean;
}
/** Типы операций над фильтрами */
export declare enum TypeFilterOperation {
    and = 1,
    or = 2,
    not = 3,
}
/** Создаёт композитный фильтр из двух, применяя к ним оператор сравнения. Рекомендую использовать статические методы and, or, not */
export declare class FilterComposite implements Filters {
    private type;
    private leftFilter;
    private rightFilter;
    constructor(type: TypeFilterOperation, leftFilter: Filters, rightFilter?: Filters);
    static and(leftFilter: Filters, rightFilter: Filters): FilterComposite;
    static or(leftFilter: Filters, rightFilter: Filters): FilterComposite;
    static not(filter: Filters): FilterComposite;
    filter(event: ICQEvent): boolean;
}
export declare class Filter {
    /**
     * Фильтр проверяет тип события
     * и наличие текста в нём
     */
    static message: MessageFilter;
    /**
     * Фильтр проверяет наличие первого
     * символа на равенство "/" или "."
     */
    static command: CommandFilter;
    /** Фильтрует сообщения конкретного пользователя */
    static file: FileFilter;
    /**
     * Фильтрует события и оставляет только
     * сообщения с полезной нагрузкой типа изображение
     */
    static image: ImageFilter;
    /**
     * Фильтрует события и оставляет только
     * сообщения с полезной нагрузкой типа Видео
     */
    static video: VideoFilter;
    /**
     * Фильтрует события и оставляет только
     * сообщения с полезной нагрузкой типа Аудио
     */
    static audio: AudioFilter;
    /**
     * Фильтрует события и оставляет только сообщения
     * с полезной нагрузкой типа Аудио, Видео, Изображение
     */
    static media: FilterComposite;
    /**
     * Фильтрует события и оставляет только
     * сообщения с полезной нагрузкой типа Аудио,
     * Видео, Изображение, Файл
     */
    static data: FilterComposite;
    /**
     * Фильтрует события и оставляет только
     * сообщения с полезной нагрузкой типа Стикер
     */
    static sticker: StickerFilter;
    /**
     * Фильтрует сообщения состоящии из одной URL ссылки.
     * Допускаются пробелы в начале и конце сообщения.
     */
    static url: URLFilter;
    /**
     * Фильтрует события и оставляет только сообщения
     * с полезной нагрузкой типа Аудио, Видео,
     * Изображение, Файл, Стикер, Ссылка
     *
     * Все сообщения у которых может быть текст.
     */
    static text: FilterComposite;
    /**
     * Фильтр проверяет регулярным выражением
     * текст сообщения и фильтрует по нему
     */
    static regexp: typeof RegexpFilter;
    /**
     * Фильтрует события где был упомянут пользователь
     */
    static mention: typeof MentionFilter;
    /**
     * Фильтрует события и оставляет только сообщения
     * с полезной нагрузкой типо FORWARD -
     * Перенаправленное (Пересылаемое сообщение) */
    static forward: ForwardFilter;
    /**  Фильтрует события и оставляет только сообщения
     * с полезной нагрузкой типо Reply - Цитата сообщения */
    static reply: ReplyFilter;
    /**
     * Фильтрует сообщения отпраленные конкретным пользователем
     */
    static sender: typeof SenderFilter;
}
