import { UserWidthName } from "./User";
import { Message } from "./Message";
/**
 * Части
 */
export declare enum PartsType {
    FILE = "file",
    STICKER = "sticker",
    MENTION = "mention",
    VOICE = "voice",
    FORWARD = "forward",
    REPLY = "reply",
}
export interface Part {
    type: PartsType;
    payload: PartSticker | PartMention | PartVoice | PartFile | PartForward | PartReply;
}
export interface PartSticker {
    /**
     * @example "2IWuJzaNWCJZxJWCvZhDYuJ5XDsr7hU"
     */
    fileId: String;
}
export interface PartMention extends UserWidthName {
}
export interface PartVoice {
    /**
     * @example "IdjUEXuGdNhLKUfD5rvkE03IOax54cD"
     */
    fileId: String;
}
/**
 * тип - Полезная нагрузка файлов
 */
export declare enum PayLoadFileType {
    IMAGE = "image",
    VIDEO = "video",
    AUDIO = "audio",
}
export interface PartFile {
    /**
     * @example "ZhSnMuaOmF7FRez2jGWuQs5zGZwlLa0"
     */
    fileId: string;
    /**
     * @example "image"
     */
    type: PayLoadFileType;
    /**
     * @example "Last weekend trip"
     */
    caption: string;
}
export interface PartForward {
    message: Message;
}
export interface PartReply {
    message: Message;
}
