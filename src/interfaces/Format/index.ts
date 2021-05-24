export type ParseMode = 'MarkdownV2' | 'HTML' | ''

export interface FormatRange {
    bold?: Position[]
    italic?: Position[]
    underline?: Position[]
    strikethrough?: Position[]
    link?: FormatLink[]
    mention?: Position[]
    inline_code?: Position[]
    pre?: FormatPre[]
    ordered_list: Position[]
    unordered_list: Position[]
    quote: Position[]
}

export interface Position {
    /** отступ в UTF-16 code units, откуда начинается стиль */
    offset: number
    /** длина стиля в UTF-16 code units */
    length: number
}

export interface FormatLink extends Position {
    /** Ссылка */
    url: string;
}
export interface FormatPre extends Position {
    /** Тип кода */
    code: string;
}

export interface Format {
    mode: ParseMode
    range?: FormatRange
}