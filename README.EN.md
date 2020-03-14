# icq-bot  

[For Russian](README.RU.md)

Pure NodeJS/TypeScript interface for Bot API.

# Table of contents
- [Introduction](#introduction)
- [Getting started](#getting-started)
- [Installing](#installing)
- [Using](#Using)
- [API description](#api-description)

# Introduction

This library provides complete Bot API 1.0 interface and compatible with Node.js v13.10.1

# Getting started

Create your own bot by sending the /newbot command to <a href="https://icq.com/people/70001">Metabot</a> and follow the instructions.

Note a bot can only reply after the user has added it to his contact list, or if the user was the first to start a dialogue.

# Installing
Install using npm:
```bash
npm install icq-bot 
```

# Using

initialization 
```nodejs
const ICQ = requier("icq-bot").default;
const TOKEN = "XXX.XXX.XXX:XXX"
const bot = new ICQ.Bot(TOKEN);
```

send message

```nodejs
const chatId = "XXX";
bot.sendText(charID,"TEXT HERE..").then( response =>{ console.log( response.ok ) });
```

How using pooling

You can using handlers: ICQ.Handler.* :
* HelpCommand
* Message  
* NewChatMembers 
* LeftChatMembers
* PinnedMessage 
* UnPinnedMessage 
* EditedMessage 
* DeletedMessage  
* Command
* StartCommand  
* FeedbackCommand  
* UnknownCommand

```nodejs
let handler = new ICQ.Handler.Message(null, (bot, event) => { });
bot.getDispatcher().addHandler(handler);
bot.startPolling(); 
```

How using filter

You can using filters: ICQ.Filters.* :
* message  
* command - only command where message start on "/" or "."
* file  
* image 
* video
* audio
* media
* sticker
* url
* regexp
* mention
* forward
* reply
* sender

```nodejs
let handler = new ICQ.Handler.Message(new ICQ.Filter.url(), (bot, event) => { 
   // code here
});
bot.getDispatcher().addHandler(handler);
bot.startPolling(); 
```


# API description
<ul>
    <li><a href="https://icq.com/botapi/">icq.com/botapi/</a></li>
    <li><a href="https://agent.mail.ru/botapi/">agent.mail.ru/botapi/</a></li>
</ul>
