
export interface Self extends Response {
    /** 
     * уникальный идентификатор
     * @example 747432131
     */
    userId: string;

    /**
     * уникальный ник
     * @example "test_api_bot"
     */
    nick: string;

    /**
     * имя
     * @example "TestBot"
     */
    firstName: string;

    /**
     * описание бота
     * @example "The description of the bot"
     */
    about: string

    /**
     * Массив изображений
     */
    photo: [{url: string}];
}
