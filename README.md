# icq-bot  

[![codecov](https://codecov.io/gh/pikada-lab/icq-bot-nodejs/branch/master/graph/badge.svg)](https://codecov.io/gh/pikada-lab/icq-bot-nodejs)
[![Build Status](https://travis-ci.org/pikada-lab/icq-bot-nodejs.svg?branch=master)](https://travis-ci.org/github/pikada-lab/icq-bot-nodejs)

Интерфейс для работы с ICQ ботами для NodeJS/TypeScript. В этом пакете я (разработчик) попытался максимально избавится от всех зависимостей и сделал максимально похожий код и интерфейс на версию "bot-python" из pip от mail.ru

Все интерфейсы ответов сервера, сущностей и  доступны для работы с TypeScrip и готовы к экспорту.

Тестирование проекта выполняется с помощью фреймворка mocha.

Также имеется описание проекта на английском языке в README.EN.md доступное после скачивания.

# Создержание
- [Вступление](#Вступление)
- [Регистрация](#Регистрация)
- [Установка](#Установка)
- [Использование](#Использование)
- [Описание API](#api-description)

# Вступление
 
Библиотека поддерживает Bot API 1.0 интерфейс и совместимый с NodeJS верси 13.10.1

# Регистрация

Что бы создать собственного бота необходимо зарегистрироваться в ICQ и написать в чат <a href="https://icq.com/people/70001">Metabot</a> команду  

```
/newbot 
```

Далее следуйте инструкции.

Метобот сможет ответить вам если вы добавите его в список контактов или сами начнёте диалог.


# Установка
Установка с использованием npm:
```bash
npm install icq-bot -s
```
Обратите внимание на актуальную мажерную версию бота

# Использование

Инициализация для JS проекта
```nodejs
const ICQ = requier("icq-bot").default;
const TOKEN = "XXX.XXX.XXX:XXX"
const bot = new ICQ.Bot(TOKEN);
```
где XXX.XXX.XXX:XXX - токен, который выдал метобот в диалоге

Конструктор класса поддерживает два параметра
```nodehs

const options = { 
    apiUrlBase:string, 
    name:string, 
    version:string, 
    timeoutS: number, 
    pollTimeS: number
};

new ICQ.Bot(TOKEN, options);
```
где:
- *apiUrlBase* - Базовая ссылка на API. по умолчанию: https://api.icq.net/bot/v1
- *name* - имя бота
- *version* - версия бота (используется в запросах в заголовке в параметре User-Agent)
- *timeoutS* - Время на ответ. не используется нигде.
- *pollTimeS* - время максимально разрещенного запроса 

Отправка сообщений чрез API

```nodejs
const chatId = "XXX";
bot.sendText(charID,"TEXT HERE..").then( response =>{ console.log( response.ok ) });
```
где XXX - номер чата

Как использовать пулинг

Для начала нужно созать обработчик. Вы можете использовать следующие обработчики (Хэндлеры): ICQ.Handler.* :
* HelpCommand - пользователь отправил команду help
* Message - пользователь отправил сообщение
* NewChatMembers - пользователь присоединился к общему чату
* LeftChatMembers - пользователь покинул чат
* PinnedMessage - пользователь закрепил запись в чате
* UnPinnedMessage - пользователь открепил запись в чате
* EditedMessage  - пользователь отредактировал запись
* DeletedMessage  - пользователь удалил сообщение
* Command - пользователь отправил команду в которая команда это первое слово
* StartCommand  - пользователь отправил команду start 
* FeedbackCommand  - пользователь отправил команду "feedback текст" и в ответ администратор (указанный в параметрах обработчика) получает сообщение с номером чата и текстом
* UnknownCommand - Все не обработанные команды другими обработчиками

Хэндлер должен быть помещён в экземпляр класса дипечер в экземпляре класса бот. Для этого в ранее созданном боте необходимо вызвать метод getDispatcher() который вернёт актуальный диспетчер. 

Далее следует вызвать метод addHanler( handler: BaseHandler ) и поместить один из выше перечисленных созданных обработчиков. В примере приведен обработчик Message
```nodejs
let handler = new ICQ.Handler.Message(null, (bot, event) => { });
bot.getDispatcher().addHandler(handler);
bot.startPolling(); 
```

Как использовать фильтры для обработчиков 

Вы можете использовать следующие фильтры: ICQ.Filters.* :
* message - обработчик фильтрует только сообщения с текстом
* command - филтрует только сообщения с префиксом команд  "/" или "."
* file  - обработчик фильтрует только отправку файлов
* image - только отправка файлов изображений
* video - только отправка файлов видео
* audio - только отправка файлов со звуковыми расширениями
* media - фильтрует файлы изображений, видео и аудио
* sticker - отправлен стикер
* url - только ссылки в сообщениях за исключением отправки файлов
* regexp - фильтр по регулярному выражению
* mention - сообщения с умомянанием вас
* forward - только сообщение с типом Forward (Пересланное сообщение из другого чата)
* reply - только сообщения с типом Reply (Цитируемое сообщение)
* sender - только сообщения конкретного пользователя 

Также доступен класс FilterComposite с тремя статическими методами: 
- FilterComposite.or(filter, filter) 
- FilterComposite.and(filter, filter)
- FilterComposite.not (filter)
На вход он принемает любые фильтры, которые будут пременяться согласно выбранного правила обработки.

```nodejs
let handler = new ICQ.Handler.Message(new ICQ.Filter.url(), (bot, event) => { 
   // code here...
});
bot.getDispatcher().addHandler(handler);
bot.startPolling(); 
```



# API description
<ul>
    <li><a href="https://icq.com/botapi/">icq.com/botapi/</a></li>
    <li><a href="https://agent.mail.ru/botapi/">agent.mail.ru/botapi/</a></li>
</ul>
