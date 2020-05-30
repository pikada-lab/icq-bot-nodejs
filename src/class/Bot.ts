import { HttpClient, ICQHttpClient } from "./ICQHttpClient";
import { FormDataICQ } from "./FormDataICQ";

import { Self } from "../interfaces/Entities/Self";

import { Chat } from "../interfaces/Entities/Chat";
import { ICQBot, ICQOptions } from "../interfaces/ICQBot";

import { Event, ResponseEvent } from "../interfaces/Events/Event";
import { Dispatcher } from "../interfaces/Dispatcher";
import { DispatcherMessage } from "./DispatcherMessage";
import { ResponseMessage } from "../interfaces/Response/ResponseMessage";
import { ResponseUploadFile, ResponseSendFile } from "../interfaces/Response/ResponseSendFile";
import { ResponseUploadVoice, ResponseSendVoice } from "../interfaces/Response/ResponseSendVoice";
import { ResponseAdmin } from "../interfaces/Response/ResponseAdmin";
import { ResponseFileInfo } from "../interfaces/Response/ResponseFileInfo";
import { ResponseMembers } from "../interfaces/Response/ResponseMembers";
import { ResponseUsers } from "../interfaces/Response/ResponseUsers";
import { ICQEvent } from "../class/ICQEvent";
import { SkipDuplicateMessageHandler } from "./SkipDuplicateMessageHandler";
import { ICQButton } from "./ICQButton";

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
        if(!token) throw new Error("Нет токена");
        this.token = token;
        this.apiBaseUrl = (options && options.apiUrlBase ? options.apiUrlBase : "https://api.icq.net/bot/v1");
        this.name = options && options.name ? options.name : "NodeBot";
        this.version = (options && options.version) ? options.version : "0.0.1";
        this.timeoutS = options && options.timeoutS ? options.timeoutS : 20
        this.pollTimeS = options && options.pollTimeS ? options.pollTimeS : 60
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
        if (this.running) {
            console.log("Stopping bot.")
            this.running = false
        }
        return this;
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
    sendText(chatId: string, text: String, replyMsgId: String = "", forwardChatId: String = "", forwardMsgId: String = "", inlineKeyboardMarkup?: ICQButton | ICQButton[] | ICQButton[][]): Promise<ResponseMessage> {
        let option = {
            token: this.token,
            chatId: chatId,
            text: text.toString()
        };
        if (replyMsgId) option['replyMsgId'] = replyMsgId;
        if (forwardChatId) option['forwardChatId'] = forwardChatId;
        if (forwardMsgId) option['forwardMsgId'] = forwardMsgId;

        if (inlineKeyboardMarkup) {
            let ICQButtonList = this.getICQButtonList(inlineKeyboardMarkup)
            if (ICQButtonList) option['inlineKeyboardMarkup'] = JSON.stringify(ICQButtonList);
        } 
        return this.http.get<ResponseMessage>(`${this.apiBaseUrl}/messages/sendText`, option, { "user-agent": this.getUserAgent() });
    }

    private getICQButtonList(inlineKeyboardMarkup: ICQButton | ICQButton[] | ICQButton[][]) {

        if (!inlineKeyboardMarkup) return null;
        let ICQButtonList = [];
        if(Array.isArray(inlineKeyboardMarkup[0])) {
            for (let bts of inlineKeyboardMarkup as ICQButton[][]) {
                let line = [];
                for (let bt of bts) {
                    line.push(bt.getQueryStructure())
                }
                ICQButtonList.push(line);
            }
            return  ICQButtonList;

        } else  if(Array.isArray(inlineKeyboardMarkup)) {
            for (let bt of inlineKeyboardMarkup as ICQButton[]) {
                ICQButtonList.push(bt.getQueryStructure())
            }
            return  [ICQButtonList];
        } else {
            return [[(inlineKeyboardMarkup as ICQButton).getQueryStructure()]];
        }
    }
    
    sendFile(chatId: string, fileId: string, file?: string, caption?: String, replyMsgId?: String, forwardChatId?: String, forwardMsgId?: String, inlineKeyboardMarkup?: ICQButton | ICQButton[] | ICQButton[][]): Promise<ResponseUploadFile | ResponseSendFile> {

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

            if (inlineKeyboardMarkup) {
                let ICQButtonList = this.getICQButtonList(inlineKeyboardMarkup)
                if (ICQButtonList) data.append('inlineKeyboardMarkup', ICQButtonList);
            }

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
            if (inlineKeyboardMarkup) {
                let ICQButtonList = this.getICQButtonList(inlineKeyboardMarkup)
                if (ICQButtonList) option['inlineKeyboardMarkup'] = JSON.stringify(ICQButtonList);
            }

            return this.http.get<ResponseSendFile>(`${this.apiBaseUrl}/messages/sendFile`, option, { "user-agent": this.getUserAgent() });

        }
    }
    sendVoice(chatId: string, fileId: string, file: string, replyMsgId: String, forwardChatId: String, forwardMsgId: String, inlineKeyboardMarkup?: ICQButton | ICQButton[] | ICQButton[][]): Promise<ResponseUploadVoice | ResponseSendVoice> {
        if (file) {
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

            if (inlineKeyboardMarkup) {
                let ICQButtonList = this.getICQButtonList(inlineKeyboardMarkup)
                if (ICQButtonList) data.append('inlineKeyboardMarkup', ICQButtonList);
            }

            data.appendFile("file", file);

            return this.http.post<ResponseUploadVoice>(`${this.apiBaseUrl}/messages/sendVoice`, data, { "user-agent": this.getUserAgent() });
        } else {

            let option = {
                token: this.token,
                chatId: chatId,
                fileId: fileId
            };

            if (replyMsgId) option['replyMsgId'] = replyMsgId;
            if (forwardChatId) option['forwardChatId'] = forwardChatId;
            if (forwardMsgId) option['forwardMsgId'] = forwardMsgId;

            if (inlineKeyboardMarkup) {
                let ICQButtonList = this.getICQButtonList(inlineKeyboardMarkup)
                if (ICQButtonList) option['inlineKeyboardMarkup'] = JSON.stringify(ICQButtonList);
            }
            return this.http.get<ResponseSendVoice>(`${this.apiBaseUrl}/messages/sendVoice`, option, { "user-agent": this.getUserAgent() });
        }
    }
    editText(chatId: string, msgId: string, text: String, inlineKeyboardMarkup?: ICQButton[]): Promise<Response> {
        let options =  {
            "token": this.token,
            "chatId": chatId,
            "msgId": msgId,
            "text": text
        };
        if (inlineKeyboardMarkup) {
            let ICQButtonList = this.getICQButtonList(inlineKeyboardMarkup)
            if (ICQButtonList) options['inlineKeyboardMarkup'] = JSON.stringify(ICQButtonList);
        }
        return this.http.get<Response>(`${this.apiBaseUrl}/messages/editText`,
           options, { "user-agent": this.getUserAgent() });
    }
    deleteMessages(chatId: string, msgId: string | string[]): Promise<Response> {
        return this.http.get<Response>(`${this.apiBaseUrl}/messages/deleteMessages`,
            {
                "token": this.token,
                "chatId": chatId,
                "msgId": msgId
            }, { "user-agent": this.getUserAgent() });
    }

    answerCallbackQuery(queryId: string, text: string, showAlert: boolean, url: string): Promise<Response> {
        let options = { 
            "token": this.token,
            "queryId": queryId,
            "text": text
        }

        if (showAlert) options['showAlert'] = showAlert;
        if (url) options['url'] = url;
        return this.http.get<Response>(`${this.apiBaseUrl}/messages/answerCallbackQuery`, options,  { "user-agent": this.getUserAgent()})
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
        if (everyone == !!userId) throw new Error("Должен быть указан один из двух параметров: userId или everyone. Эти параметры не могут быть указаны одновременно.");
        return this.http.get<Response>(`${this.apiBaseUrl}/chats/resolvePending`, options, { "user-agent": this.getUserAgent() });
    }
 
}
