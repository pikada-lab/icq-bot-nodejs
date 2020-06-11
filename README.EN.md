# icq-bot

[![codecov](https://codecov.io/gh/pikada-lab/icq-bot-nodejs/branch/master/graph/badge.svg)](https://codecov.io/gh/pikada-lab/icq-bot-nodejs)
[![Build Status](https://travis-ci.org/pikada-lab/icq-bot-nodejs.svg?branch=master)](https://travis-ci.org/github/pikada-lab/icq-bot-nodejs)
[![Known Vulnerabilities](https://snyk.io/test/github/pikada-lab/icq-bot-nodejs/badge.svg?targetFile=package.json)](https://snyk.io/test/github/pikada-lab/icq-bot-nodejs?targetFile=package.json)

Interface for working with ICQ bots for NodeJS / TypeScript. In this package, I (the developer) tried to get rid of all the dependencies as much as possible and made the most similar code and interface to the version of "bot-python" from pip from mail.ru

All server response interfaces and entities are available for working with TypeScrip and are ready for export.

Testing the project is carried out using the mocha framework.

There is also a description of the project in Russian in README.md available after downloading.

# Constraint
- [Introduction](#Introduction)
- [Registration](#Registration)
- [Installation](#Installation)
- [Usage](#Usage)
- [Sample code](#Sample-code)
- [API Description](#api-description)

# Introduction
 
The library supports Bot API 1.0 interface and compatible with NodeJS version 13.10.1

# Registration

To create your own bot, you need to register in ICQ and write a <a href="https://icq.com/people/70001"> Metabot </a> chat

```icq
/newbot
```

Follow the instructions below.

Metobot will be able to answer you if you add it to your contact list or start a dialogue yourself.


# Installation
Install using npm:
```bash
npm install icq-bot -s
```
Pay attention to the current major version of the bot

# Usage

Initialization for JS project
```typescript
const ICQ = requier ("icq-bot").default;
const TOKEN = "XXX.XXX.XXX:XXX"
const bot = new ICQ.Bot(TOKEN);
`` ``
where XXX.XXX.XXX:XXX is the token that issued the meta bot in the dialog

The class constructor supports two parameters
`` `typescript

const options = {
    apiUrlBase: string,
    name: string,
    version: string,
    timeoutS: number,
    pollTimeS: number
};

new ICQ.Bot (TOKEN, options);
```
Where:
* apiUrlBase * - Base reference to the API. default: https://api.icq.net/bot/v1
* name * - bot name
* version * - bot version (used in requests in the header in the User-Agent parameter)
* timeoutS * - Response time. not used anywhere.
* pollTimeS * - time of maximally resolved request

Sending messages through the API

```typescript
const chatId = "XXX";
bot.sendText (charID, "TEXT HERE .."). then (response => {console.log (response.ok)});
```
where XXX is the chat number

How to use pooling

First you need to create a handler. You can use the following handlers (Handlers): ICQ.Handler. *:
* HelpCommand - user sent help command
* Message - the user sent a message
* NewChatMembers - the user has joined the general chat
* LeftChatMembers - user left the chat
* PinnedMessage - user pinned a chat entry
* UnPinnedMessage - user unpin the chat entry
* EditedMessage - user edited post
* DeletedMessage - user deleted the message
* Command - the user sent a command to which team is the first word
* StartCommand - the user sent the start command
* FeedbackCommand - the user sent the command "feedback text" and in response the administrator (specified in the handler parameters) receives a message with the chat number and text
* UnknownCommand - All commands not processed by other handlers
* BotButtonCommandHandler - the user clicked on the button with the command

The handler must be placed in an instance of the dipecher class in an instance of the bot class. To do this, in the previously created bot, you must call the getDispatcher() method which will return the current dispatcher.

Next, call the addHanler (handler: BaseHandler) method and place one of the handlers created above. The example shows the Message handler

```typescript
let handler = new ICQ.Handler.Message (null, (bot, event) => {});
bot.getDispatcher (). addHandler (handler);
bot.startPolling ();
```

How to use filters for handlers

You can use the following filters: ICQ.Filters. *:
* message * - the handler filters only messages with text
* command * - filters only messages with the prefix of the "/" or "."
* file * - the handler filters only sending files
* image * - only sending image files
* video * - only send video files
* audio * - only sending files with sound extensions
* media * - filters image files, video and audio
* sticker * - sticker sent
* url * - only links in messages except for sending files
* regexp - regular expression filter
* mention - messages mentioning you
* forward * - only a message of type Forward (Forwarded message from another chat)
* reply * - only messages with type Reply (Quote message)
* sender - only messages from a specific user



Все фильтры с * возвращают уже созданные объекты. Все остальные возвращают классы.
* new ICQ.Filters.regexp(pattern: RegExp)
* new ICQ.Filters.mention(userId: Number)
* new ICQ.Filters.sender(userId: Number)

Также доступен класс FilterComposite с тремя статическими методами: 
- FilterComposite.or(filter, filter) 
- FilterComposite.and(filter, filter)
- FilterComposite.not (filter)
На вход он принемает любые фильтры, которые будут пременяться согласно выбранного правила обработки.

```typescript
let handler = new ICQ.Handler.Message(ICQ.Filter.url, (bot, event) => { 
   // code here...
});
bot.getDispatcher().addHandler(handler);
bot.startPolling(); 
```

Обратите внимание, что обработчики будут вызывать функцию обратного вызова каждый раз когда они подходят фильтру. Если у вас 2 обработчика, например ICQ.Handler.Message(null,...  и ICQ.Handler.Message(ICQ.Filter.url,... то на сообщение со ссылкой будут вызваны оба обработчика, а на сообщение без ссылки только один обработчик.

## Создание кнопок

Кнопки вынесены в отдельный класс ICQButton

```typescript
let buttonOk = new ICQ.Button("Ok", "1319184")
let buttonOpenWeb = new ICQ.Button("Ok", null, "https://fake-mm.ru")

```

* text - Текст, который будет отображен на кнопке. Допустимо использовать **\n** для того, чтобы текст был на несколько строк
* callbackData - Данные, которые будут отправлены боту в момент нажатия на кнопку
* url - который необходимо открыть по нажатию на кнопку 

Vse fil'try s * vozvrashchayut uzhe sozdannyye ob"yekty. Vse ostal'nyye vozvrashchayut klassy.
* new ICQ.Filters.regexp(pattern: RegExp)
* new ICQ.Filters.mention(userId: Number)
* new ICQ.Filters.sender(userId: Number)

Takzhe dostupen klass FilterComposite s tremya staticheskimi metodami: 
- FilterComposite.or(filter, filter) 
- FilterComposite.and(filter, filter)
- FilterComposite.not (filter)
Na vkhod on prinemayet lyubyye fil'try, kotoryye budut premenyat'sya soglasno vybrannogo pravila obrabotki.

```typescript
let handler = new ICQ.Handler.Message(ICQ.Filter.url, (bot, event) => { 
   // code here...
});
bot.getDispatcher().addHandler(handler);
bot.startPolling(); 
```

Obratite vnimaniye, chto obrabotchiki budut vyzyvat' funktsiyu obratnogo vyzova kazhdyy raz kogda oni podkhodyat fil'tru. Yesli u vas 2 obrabotchika, naprimer ICQ.Handler.Message(null,...  i ICQ.Handler.Message(ICQ.Filter.url,... to na soobshcheniye so ssylkoy budut vyzvany oba obrabotchika, a na soobshcheniye bez ssylki tol'ko odin obrabotchik.

## Sozdaniye knopok

Knopki vyneseny v otdel'nyy klass ICQButton

```typescript
let buttonOk = new ICQ.Button("Ok", "1319184")
let buttonOpenWeb = new ICQ.Button("Ok", null, "https://fake-mm.ru")

```

* text - Tekst, kotoryy budet otobrazhen na knopke. Dopustimo ispol'zovat' **\n** dlya togo, chtoby tekst byl na neskol'ko strok
* callbackData - Dannyye, kotoryye budut otpravleny botu v moment nazhatiya na knopku
* url - kotoryy neobkhodimo otkryt' po nazhatiyu na knopku
Развернуть
1460/5000
All filters with * return already created objects. All others return classes.
* new ICQ.Filters.regexp (pattern: RegExp)
* new ICQ.Filters.mention (userId: Number)
* new ICQ.Filters.sender (userId: Number)

The FilterComposite class is also available with three static methods:
- FilterComposite.or (filter, filter)
- FilterComposite.and (filter, filter)
- FilterComposite.not (filter)
At the input, it accepts any filters that will be changed according to the selected processing rule.

```typescript
let handler = new ICQ.Handler.Message (ICQ.Filter.url, (bot, event) => {
   // code here ...
});
bot.getDispatcher (). addHandler (handler);
bot.startPolling ();
```

Note that handlers will call the callback function every time they match the filter. If you have 2 handlers, for example ICQ.Handler.Message (null, ... and ICQ.Handler.Message (ICQ.Filter.url, ...), then both handlers will be called to the message with the link, and only the message without the link one handler.

## Creating buttons

Buttons moved to a separate ICQButton class

```typescript
let buttonOk = new ICQ.Button ("Ok", "1319184")
let buttonOpenWeb = new ICQ.Button ("Ok", null, "https://fake-mm.ru")

```

* text - The text to be displayed on the button. It is permissible to use ** \ n ** so that the text is on several lines
* callbackData - Data that will be sent to the bot when the button is clicked
* url - which must be opened by clicking on the button

# Sample code

## Simple bot

Purpose:

* We write bot any message
* We get the answer "Hello!"
* Delete your message from everyone
* We receive in response the message "Why!"

### Execution

Commands in the bash terminal

```bash
# Create a directory
mkdir testBot
# Go to it
cd ./testBot
# Create a default npm project
npm init --force
# Install icq-bot dependency
npm i icq-bot -s
```

Next, create and paste the code below with your token in index.js.

- file index.js


```javascript 
const ICQ = require('icq-bot').default;
 
const bot = new ICQ.Bot(ВАШ_ТОКЕН_БОТА);
 
const handlerNewMessage = new ICQ.Handler.Message(null, (bot, event) => { 
    const chatId = event.fromChatId; 
    console.log(`New Message event.fromChatID = ${chatId}`);  
    bot.sendText(chatId, "Привет!");
});
 
const handlerDeleteMessage = new ICQ.Handler.DeletedMessage(null, (bot, event) => {  
    const chatId = event.fromChatId; 
    console.log(`Deleted Message event.fromChatID = ${chatId}`);  
    bot.sendText(chatId, "Зачем!");
});
  
bot.getDispatcher().addHandler(handlerNewMessage);
bot.getDispatcher().addHandler(handlerDeleteMessage);
 
bot.startPolling();
 
``` 

Then it remains to launch our bot

```bash 
node index.js
```