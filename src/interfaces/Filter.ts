import { PartsType, PartFile, PayLoadFileType } from "./Entities/Part";
import { ICQEvent } from "./Handler";
import { NewMessageEvent } from "./Events/NewMessageEvent";


export interface Filter {
    filter(event: ICQEvent): boolean;
}

/** Фильтр проверяет тип события и наличие текста в нём */
export class MessageFilter implements Filter {
    filter(event: ICQEvent): boolean {
        return event.data["text"] && event["text"].length > 0;
    }
}

export class CommandFilter extends MessageFilter {
    COMMAND_PREFIXES: String[] = ["/", "."];

    filter(event: ICQEvent) {
        return (super.filter(event) && this.COMMAND_PREFIXES.findIndex(r => r === (event.data as NewMessageEvent).text.trim()[0]) >= 0)
    }
}
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


export class SenderFilter extends MessageFilter {
    constructor(private user_id: number) {
        super();
    }
    filter(event) {
        return super.filter(event) && event.data['from'] && event.data['from']['userId'] == this.user_id
    }
}

export class FileFilter extends MessageFilter {
    filter(event) {
        return super.filter(event) && event.data['parts'] &&
            event.data['parts'].findIndex(r => r.type == PartsType.FILE) >= 0

    }
}


export class ImageFilter extends FileFilter {
    filter(event: ICQEvent) {
        return super.filter(event) &&
            event.data['parts'].findIndex(r => r["payload"] && r.payload["type"] && (r.payload as PartFile).type == PayLoadFileType.IMAGE) >= 0
    }
}

export class VideoFilter extends FileFilter {
    filter(event: ICQEvent) {
        return super.filter(event) &&
            event.data['parts'].findIndex(r => r["payload"] && r.payload["type"] && (r.payload as PartFile).type == PayLoadFileType.VIDEO) >= 0
    }
}

export class AudioFilter extends FileFilter {
    filter(event: ICQEvent) {
        return super.filter(event) &&
            event.data['parts'].findIndex(r => r["payload"] && r.payload["type"] && (r.payload as PartFile).type == PayLoadFileType.AUDIO) >= 0
    }
}

export class StickerFilter extends FileFilter {
    filter(event: ICQEvent) {
        return super.filter(event) && event.data['parts'] &&
            event.data['parts'].findIndex(r => r.type == PartsType.STICKER) >= 0
    }
}



export class MentionFilter extends MessageFilter {
    constructor(public userId: Number) {
        super();

    }
    filter(event) {
        return super.filter(event) && event.data['parts'] &&
            event.data['parts'].findIndex(r => r.type == PartsType.MENTION && (!this.userId || r.payload.userId == this.userId)) >= 0
    }
}


export class ForwardFilter extends MessageFilter {
    filter(event: ICQEvent) {
        return event.data['parts'] && (event.data as NewMessageEvent).parts.findIndex(r => r.type == PartsType.FORWARD) >= 0
    }
}

export class ReplyFilter extends MessageFilter {
    filter(event: ICQEvent) {
        return super.filter(event) && event.data['parts'] &&
            (event.data as NewMessageEvent).parts.findIndex(r => r.type == PartsType.REPLY) >= 0
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


export class Filter {
    static message = new MessageFilter()
    static command = new CommandFilter()
    static file = new FileFilter()
    static image = new ImageFilter()
    static video = new VideoFilter()
    static audio = new AudioFilter()
    static media = Filter.image || Filter.video || Filter.audio;
    static data = Filter.file && !Filter.media;
    static sticker = new StickerFilter()
    static url = new URLFilter()
    static text = Filter.message && !(Filter.command || Filter.sticker || Filter.file || Filter.url);
    static regexp = RegexpFilter
    static mention = MentionFilter
    static forward = new ForwardFilter()
    static reply = new ReplyFilter()
    static sender = SenderFilter
}
