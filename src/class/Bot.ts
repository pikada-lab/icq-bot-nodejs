import { HttpClient, FormDataICQ, ICQHttpClient } from "./ICQHttpClient";

import { Self } from "../interfaces/Entities/Self";

import { Chat } from "../interfaces/Entities/Chat";
import { ICQBot, ICQOptions } from "../interfaces/ICQBot";

import { Event, ResponseEvent } from "../interfaces/Events/Event";
import { DispatcherMessage, Dispatcher } from "../interfaces/Dispatcher";
import { MessageHandler } from "../interfaces/Handler";
import { ResponseMessage } from "../interfaces/Response/ResponseMessage";
import { ResponseUploadFile, ResponseSendFile } from "../interfaces/Response/ResponseSendFile";
import { ResponseUploadVoice, ResponseSendVoice } from "../interfaces/Response/ResponseSendVoice";
import { ResponseAdmin } from "../interfaces/Response/ResponseAdmin";
import { ResponseFileInfo } from "../interfaces/Response/ResponseFileInfo";
import { ResponseMembers } from "../interfaces/Response/ResponseMembers";
import { ResponseUsers } from "../interfaces/Response/ResponseUsers";
import { ICQEvent } from "../class/ICQEvent";

export class Bot implements ICQBot { 

    private token;
    private uin;
    private running = false;
    private dispatcher;
    private lastEventId: number = 0;
    private timeoutS: number;
    private pollTimeS: number;
    private version: string;
    private name: string;
    /** Номер таймера для возможной отмены. В версии не используется */
    private pollingThread: number;

    private apiBaseUrl;
    private http: HttpClient;
    constructor(token: string, options?: ICQOptions) {
        this.token = token;
        this.apiBaseUrl = (options.apiUrlBase ? options.apiUrlBase : "https://api.icq.net/bot/v1");
        this.name = name
        this.version = options.version
        this.timeoutS = options.timeoutS ? options.timeoutS : 20
        this.pollTimeS = options.pollTimeS ? options.pollTimeS : 60
        this.dispatcher = new DispatcherMessage(this)
        this.uin = this.token.split(":")[this.token.split(":").length - 1];

        this.setHttpSession(new ICQHttpClient());

        // Пропускает повторяющиеся сообщения (Хранит в кэщ)
        this.dispatcher.addHandler(new SkipDuplicateMessageHandler({}));
    }

    getDispatcher(): Dispatcher {
        return this.dispatcher;
    }
    getUNI(): number {
        return this.uin;
    }
    getUserAgent(): string {
        let libraryVersion = "2.0.0-beta";
        return `${this.name}/${this.version} (uin=${this.uin ? this.uin : null}) bot-nodejs/${libraryVersion}`
    }

    setHttpSession(http: HttpClient) {
        this.http = http;
    }
    startPolling(): ICQBot {
        try {
            // if (!this.lock) {
            //     throw new Error("not object Lock");
            // }
            if (!this.running) {
                console.log("Starting polling.")
                this.running = true
                this.pollingThread = setTimeout(_ => this.polling())
            }
        } catch (ex) {
            console.error("Starting polling.", ex)
        }
        return this;
    }

    private polling() {
        if (this.running) {
            // Exceptions should not stop polling thread.
            // noinspection PyBroadException
            try {
                this.eventsGet(this.pollTimeS, this.lastEventId).then((response: ResponseEvent) => {
                    for (let event of response.events) {
                        this.dispatcher.dispatch(new ICQEvent(event));
                    }
                    this.polling();
                });

            } catch (ex) {
                console.error("Exception while polling!", ex)
            }
        }
    }
    stop(): ICQBot {
        // if (!this.lock) {
        //     throw new Error("not object Lock");
        // }
        if (this.running) {
            console.log("Stopping bot.")
            this.running = false
        }
        return this;
    }
    idle(): ICQBot {
        for (let sig of ["SIGINT", "SIGTERM", "SIGABRT"]) {
            this.signal(sig)
        }
        if (this.running) {
            setTimeout(_ => this.idle(), 1000);
        }
        return this;
    }
    private signal(sig) {
        // Получает сигналы OS
    }
    eventsGet(pollTimeS: number, lastEventId: number): Promise<ResponseEvent> {
        return this.http.get<ResponseEvent>(`${this.apiBaseUrl}/events/get`, {
            token: this.token,
            lastEventId: lastEventId,
            pollTime: pollTimeS
        }, { "user-agent": this.getUserAgent() }).then((response: ResponseEvent) => {
            return new Promise((r, e) => {
                if (response.events) {
                    response.events.forEach((event: Event) => {
                        this.lastEventId = this.lastEventId > event.eventId ? this.lastEventId : event.eventId;
                    });

                }
                r(response as ResponseEvent);
            })
        });
    }
    selfGet(): Promise<Self> {
        return this.http.get<Self>(`${this.apiBaseUrl}/self/get`, { token: this.token }, { "user-agent": this.getUserAgent() });
    }
    sendText(chatId: string, text: String, replyMsgId: String = "", forwardChatId: String = "", forwardMsgId: String = ""): Promise<ResponseMessage> {
        let option = {
            token: this.token,
            chatId: chatId,
            text: text
        };
        if (replyMsgId) option['replyMsgId'] = replyMsgId;
        if (forwardChatId) option['forwardChatId'] = forwardChatId;
        if (forwardMsgId) option['forwardMsgId'] = forwardMsgId;

        return this.http.get<ResponseMessage>(`${this.apiBaseUrl}/messages/sendText`, option, { "user-agent": this.getUserAgent() });
    }
    sendFile(chatId: string, fileId: string, file?: string, caption?: String, replyMsgId?: String, forwardChatId?: String, forwardMsgId?: String): Promise<ResponseUploadFile | ResponseSendFile> {

        if (file) {
            const data = new FormDataICQ();
            data.append("token", this.token);
            data.append("chatId", chatId);
            if (caption)
                data.append("caption", caption);
            if (replyMsgId)
                data.append("replyMsgId", replyMsgId);
            if (forwardChatId)
                data.append("forwardChatId", forwardChatId);
            if (forwardMsgId)
                data.append("forwardMsgId", forwardMsgId);
            data.appendFile("file", file);
            // console.log(data.toString());
            // throw "Нет";
            // return this.http.post<ResponseUploadFile>(`http://auxilium-system.ru:3601/v1/test`, data, { "user-agent": this.getUserAgent() });

            return this.http.post<ResponseUploadFile>(`${this.apiBaseUrl}/messages/sendFile`, data, { "user-agent": this.getUserAgent() });
        } else {

            let option = {
                token: this.token,
                chatId: chatId,
                fileId: fileId
            };

            if (caption) option['caption'] = caption;
            if (replyMsgId) option['replyMsgId'] = replyMsgId;
            if (forwardChatId) option['forwardChatId'] = forwardChatId;
            if (forwardMsgId) option['forwardMsgId'] = forwardMsgId;
            return this.http.get<ResponseSendFile>(`${this.apiBaseUrl}/messages/sendFile`, option, { "user-agent": this.getUserAgent() });

        }
    }
    sendVoice(chatId: string, fileId: string, file: string, replyMsgId: String, forwardChatId: String, forwardMsgId: String): Promise<ResponseUploadVoice | ResponseSendVoice> {

        const data = new FormDataICQ();
        data.append("token", this.token);
        data.append("chatId", chatId);
        data.append("fileId", fileId);
        if (replyMsgId)
            data.append("replyMsgId", replyMsgId);
        if (forwardChatId)
            data.append("forwardChatId", forwardChatId);
        if (forwardMsgId)
            data.append("forwardMsgId", forwardMsgId);
        data.appendFile("file", file);
        return this.http.post<ResponseUploadVoice>(`${this.apiBaseUrl}/messages/sendFile`, data, { "user-agent": this.getUserAgent() });

    }
    editText(chatId: string, msgId: string, text: String): Promise<Response> {
        return this.http.get<Response>(`${this.apiBaseUrl}/messages/editText`,
            {
                "token": this.token,
                "chatId": chatId,
                "msgId": msgId,
                "text": text
            }, { "user-agent": this.getUserAgent() });
    }
    deleteMessages(chatId: string, msgId: string): Promise<Response> {
        return this.http.get<Response>(`${this.apiBaseUrl}/messages/deleteMessages`,
            {
                "token": this.token,
                "chatId": chatId,
                "msgId": msgId
            }, { "user-agent": this.getUserAgent() });
    }
    sendActions(chatId: string, actions: 'looking' | 'typing'): Promise<Response> {
        return this.http.get<Response>(`${this.apiBaseUrl}/chats/sendActions`,
            {
                "token": this.token,
                "chatId": chatId,
                "actions": actions
            }, { "user-agent": this.getUserAgent() });
    }
    getChatInfo(chatId: string): Promise<Chat> {
        return this.http.get<Chat>(`${this.apiBaseUrl}/chats/getInfo`,
            {
                "token": this.token,
                "chatId": chatId
            }, { "user-agent": this.getUserAgent() });
    }
    getChatAdmins(chatId: string): Promise<ResponseAdmin> {
        return this.http.get<ResponseAdmin>(`${this.apiBaseUrl}/chats/getAdmins`,
            {
                "token": this.token,
                "chatId": chatId
            }, { "user-agent": this.getUserAgent() });
    }
    getFileInfo(fileId: string): Promise<ResponseFileInfo> {
        return this.http.get<ResponseFileInfo>(`${this.apiBaseUrl}/files/getInfo`,
            {
                "token": this.token,
                "fileId": fileId
            }, { "user-agent": this.getUserAgent() });
    }
    pinMessage(chatId: string, msgId: string): Promise<Response> {
        return this.http.get<Response>(`${this.apiBaseUrl}/chats/pinMessage`,
            {
                "token": this.token,
                "chatId": chatId,
                "msgId": msgId
            }, { "user-agent": this.getUserAgent() });
    }
    unpinMessage(chatId: string, msgId: string): Promise<Response> {

        return this.http.get<Response>(`${this.apiBaseUrl}/chats/unpinMessage`,
            {
                "token": this.token,
                "chatId": chatId,
                "msgId": msgId
            }, { "user-agent": this.getUserAgent() });
    }
    setTitle(chatId: string, title: string): Promise<Response> {

        return this.http.get<Response>(`${this.apiBaseUrl}/chats/setTitle`,
            {
                "token": this.token,
                "chatId": chatId,
                "title": title
            }, { "user-agent": this.getUserAgent() });
    }
    setAbout(chatId: string, text: string): Promise<Response> {
        return this.http.get<Response>(`${this.apiBaseUrl}/chats/setAbout`,
            {
                "token": this.token,
                "chatId": chatId,
                "about": text
            }, { "user-agent": this.getUserAgent() });
    }
    setRules(chatId: string, rules: string): Promise<Response> {
        return this.http.get<Response>(`${this.apiBaseUrl}/chats/setRules`,
            {
                "token": this.token,
                "chatId": chatId,
                "rules": rules
            }, { "user-agent": this.getUserAgent() });
    }

    getMembers(chatId: string, cursor?: string): Promise<ResponseMembers> {
        const options = {
            "token": this.token,
            "chatId": chatId
        };
        if (cursor) options['cursor'] = cursor;
        return this.http.get<ResponseMembers>(`${this.apiBaseUrl}/chats/getMembers`,
            options, { "user-agent": this.getUserAgent() });
    }
    getBlockedUsers(chatId: string): Promise<ResponseUsers> {
        return this.http.get<ResponseUsers>(`${this.apiBaseUrl}/chats/getBlockedUsers`,
            {
                "token": this.token,
                "chatId": chatId
            }, { "user-agent": this.getUserAgent() });
    }
    getPendingUsers(chatId: string): Promise<ResponseUsers> {
        return this.http.get<ResponseUsers>(`${this.apiBaseUrl}/chats/getPendingUsers`,
            {
                "token": this.token,
                "chatId": chatId
            }, { "user-agent": this.getUserAgent() });
    }
    blockUser(chatId: string, userId: string, delLastMessages?: boolean): Promise<Response> {
        const options = {
            "token": this.token,
            "chatId": chatId,
            "userId": userId
        };
        if (delLastMessages) options['delLastMessages'] = true;
        return this.http.get<Response>(`${this.apiBaseUrl}/chats/blockUser`, options, { "user-agent": this.getUserAgent() });
    }
    unblockUser(chatId: string, userId: string): Promise<Response> {
        const options = {
            "token": this.token,
            "chatId": chatId,
            "userId": userId
        };
        return this.http.get<Response>(`${this.apiBaseUrl}/chats/unblockUser`, options, { "user-agent": this.getUserAgent() });
    }
    resolvePending(chatId: string, approve: boolean, userId?: string, everyone?: boolean): Promise<Response> {
        const options = {
            "token": this.token,
            "chatId": chatId,
        };
        if (approve) options['approve'] = true;
        if (everyone) options['everyone'] = true;
        if (userId) options['userId'] = userId;
        if (everyone != !!userId) throw new Error("Должен быть указан один из двух параметров: userId или everyone. Эти параметры не могут быть указаны одновременно.");
        return this.http.get<Response>(`${this.apiBaseUrl}/chats/resolvePending`, options, { "user-agent": this.getUserAgent() });
    }
}


/**
 * Пропускает повторяющиеся транзакции сверяя их номера (сообщений) с номерами в кэше
 */
class SkipDuplicateMessageHandler extends MessageHandler {
    /**
     * 
     * @param cache Это объект типо ключ значение, где ключ это номер в виде строки, а значение - текст сообщения
     */
    constructor(protected cache: { [key: string]: string }) {
        super(null, null)
        if (!this.cache) this.cache = {};
    }
    public check(event, dispatcher) {
        if (super.check(event, dispatcher)) {
            for (let i in this.cache) {
                if (i == event.data.msgId && this.cache[i] == event.data.text) {
                    throw new Error(`Caught StopDispatching id'${i}' exception, stopping dispatching.`);
                }
            }
        }
        return true
    }
}
