/**
* Типы чатов
*/
export declare enum ChatType {
    PRIVATE = "private",
    GROUP = "group",
    CHANNEL = "channel",
}
/** Чат в ICQ */
export interface Chat {
    /**
     *  Тип чата (тип интерфейса сущности)
     *   @required: true
     *   @return Enum: [ private, group, channel ]
     */
    type: ChatType;
    chatId: string;
}
export interface ChatChannel extends Chat {
    /**
     * @example TestChannel
     */
    title: string;
    /**
     * @example "Channel description"
     */
    about: string;
    /**
     *  @example "Channel rules"
     */
    rules: string;
    /**
     *   @example "https://example.com/chat/AoLFkoRCn4MpaP0DjUI"
     */
    inviteLink: string;
    public: boolean;
    joinModeration: boolean;
}
export interface ChatGroup extends Chat {
    /**
     * @example "TestGroup"
     */
    title: string;
    /**
     * @example "Group description"
     */
    about: string;
    /**
     * @example "Group rules"
     */
    rules: string;
    /**
     * @example: https://example.com/chat/AoLFkoRCn4MpaP0DjUI
     */
    inviteLink: string;
    /**
     * @required true
     */
    public: boolean;
    joinModeration: boolean;
}
export interface ChatPrivate extends Chat {
    /**
     * @example "Name"
     */
    firstName: string;
    /**
     * @example "Surname"
     */
    lastName: string;
    /**
     * @example "nickname"
     */
    nick: string;
    /**
     * @example "Information about user"
     */
    about: string;
    /**
     * Признак ответа бота
     */
    isBot: boolean;
}
