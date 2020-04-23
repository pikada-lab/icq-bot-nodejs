import { ICQEvent } from "../class/ICQEvent";
export interface Filters {
    filter(event: ICQEvent): boolean;
}
/** Фильтр проверяет тип события и наличие текста в нём */
export declare class MessageFilter implements Filters {
    filter(event: ICQEvent): boolean;
}
/** Фильтр проверяет наличие 1 символа похожего на "/" или "." */
export declare class CommandFilter extends MessageFilter {
    COMMAND_PREFIXES: String[];
    filter(event: ICQEvent): boolean;
}
/** Фильтр проверяет регулярным выражением  текст сообщения   */
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
 * Возвращает истину если тип сообщения файл
 */
export declare class FileFilter extends MessageFilter {
    filter(event: any): boolean;
}
export declare class ImageFilter extends FileFilter {
    filter(event: ICQEvent): boolean;
}
export declare class VideoFilter extends FileFilter {
    filter(event: ICQEvent): boolean;
}
export declare class AudioFilter extends FileFilter {
    filter(event: ICQEvent): boolean;
}
export declare class StickerFilter extends MessageFilter {
    filter(event: ICQEvent): boolean;
}
export declare class MentionFilter extends MessageFilter {
    userId: Number;
    constructor(userId: Number);
    filter(event: any): boolean;
}
export declare class ForwardFilter extends MessageFilter {
    filter(event: ICQEvent): boolean;
}
export declare class ReplyFilter extends MessageFilter {
    filter(event: ICQEvent): boolean;
}
export declare class URLFilter extends RegexpFilter {
    constructor();
    filter(event: ICQEvent): boolean;
}
export declare enum TypeFilterOperation {
    and = 1,
    or = 2,
    not = 3,
}
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
    static message: MessageFilter;
    static command: CommandFilter;
    static file: FileFilter;
    static image: ImageFilter;
    static video: VideoFilter;
    static audio: AudioFilter;
    static media: FilterComposite;
    static data: FilterComposite;
    static sticker: StickerFilter;
    static url: URLFilter;
    static text: FilterComposite;
    static regexp: typeof RegexpFilter;
    static mention: typeof MentionFilter;
    static forward: ForwardFilter;
    static reply: ReplyFilter;
    static sender: typeof SenderFilter;
}
