# icq-bot  

[![codecov](https://codecov.io/gh/pikada-lab/icq-bot-nodejs/branch/master/graph/badge.svg)](https://codecov.io/gh/pikada-lab/icq-bot-nodejs)
[![Build Status](https://travis-ci.org/pikada-lab/icq-bot-nodejs.svg?branch=master)](https://travis-ci.org/github/pikada-lab/icq-bot-nodejs)
[![Known Vulnerabilities](https://snyk.io/test/github/pikada-lab/icq-bot-nodejs/badge.svg?targetFile=package.json)](https://snyk.io/test/github/pikada-lab/icq-bot-nodejs?targetFile=package.json)

Интерфейс для работы с ICQ ботами для NodeJS/TypeScript. В этом пакете я (разработчик) попытался максимально избавится от всех зависимостей и сделал максимально похожий код и интерфейс на версию "bot-python" из pip от mail.ru

Все интерфейсы ответов сервера, сущностей и  доступны для работы с TypeScrip и готовы к экспорту.

Тестирование проекта выполняется с помощью фреймворка mocha.

Также имеется описание проекта на английском языке в README.EN.md доступное после скачивания.

# Создержание
- [Вступление](#Вступление)
- [Регистрация](#Регистрация)
- [Установка](#Установка)
- [Использование](#Использование)
- [Пример кода](#Пример-кода)
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
```typescript
const ICQ = requier("icq-bot").default;
const TOKEN = "XXX.XXX.XXX:XXX"
const bot = new ICQ.Bot(TOKEN);
```
где XXX.XXX.XXX:XXX - токен, который выдал метобот в диалоге

Конструктор класса поддерживает два параметра
```typescript

const options = { 
    apiUrlBase: string, 
    name:       string, 
    version:    string, 
    timeoutS:   number, 
    pollTimeS:  number
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

```typescript
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
* BotButtonCommandHandler - пользователь нажал на кнопку с командой

### С версии 2.1.42
* deleteMembers - удалить членов группы по номеру пользователя или массиву. Бот должен быть администратором.
* setAvatar - установить аватар для группы. Бот должен быть администратором.

Хэндлер должен быть помещён в экземпляр класса дипечер в экземпляре класса бот. Для этого в ранее созданном боте необходимо вызвать метод getDispatcher() который вернёт актуальный диспетчер. 

Далее следует вызвать метод addHanler( handler: BaseHandler ) и поместить один из выше перечисленных созданных обработчиков. В примере приведен обработчик Message

```typescript
let handler = new ICQ.Handler.Message(null, (bot, event) => { });
bot.getDispatcher().addHandler(handler);
bot.startPolling(); 
```

Как использовать фильтры для обработчиков 

Вы можете использовать следующие фильтры: ICQ.Filters.* :
* message * - обработчик фильтрует только сообщения с текстом
* command * - филтрует только сообщения с префиксом команд  "/" или "."
* file * - обработчик фильтрует только отправку файлов
* image * - только отправка файлов изображений
* video * - только отправка файлов видео
* audio * - только отправка файлов со звуковыми расширениями
* media * - фильтрует файлы изображений, видео и аудио
* sticker * - отправлен стикер
* url * - только ссылки в сообщениях за исключением отправки файлов
* regexp - фильтр по регулярному выражению
* mention - сообщения с упомянанием вас
* forward * - только сообщение с типом Forward (Пересланное сообщение из другого чата)
* reply * - только сообщения с типом Reply (Цитируемое сообщение)
* sender - только сообщения конкретного пользователя 

Все фильтры с * возвращают уже созданные объекты. Все остальные возвращают классы.
* new ICQ.Filters.regexp(pattern: RegExp)
* new ICQ.Filters.mention(userId: Number)
* new ICQ.Filters.sender(userId: Number)

Обратите внимание, что все классы находятся в пространстве имён ICQ

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

# Пример кода

## Простой бот

Цель: 

* Пишем боту любое сообщение
* Получаем в ответ "Привет!"
* Удаляем своё сообщение у всех
* Получаем в ответ сообщение "Зачем!"

### Исполнение

Команды в терминале bash

```bash
# Создаём директорию
mkdir testBot
# Переходим в неё
cd ./testBot
# Создаём npm проект по умолчанию
npm init --force
# Устанавливаем зависимость icq-bot
npm i icq-bot -s
```

Далее создаём и вставляем в index.js код ниже со своим токеном.

- Файл index.js

```javascript
// Импортируем бота
const ICQ = require('icq-bot').default;

// Создаём фасад пакета ICQ
const bot = new ICQ.Bot(ВАШ_ТОКЕН_БОТА);

// Создаём обработчик для новых сообщений
const handlerNewMessage = new ICQ.Handler.Message(null, (bot, event) => {
    // Получаем номер чата из объекта event
    const chatId = event.fromChatId;
    // Выводим в консоль тип события и номер чата
    console.log(`New Message event.fromChatID = ${chatId}`); 
    // Отправляем сообщение в чат отправителя
    bot.sendText(chatId, "Привет!");
});

// Создаём обработчик для удалённых сообщений
const handlerDeleteMessage = new ICQ.Handler.DeletedMessage(null, (bot, event) => { 
    // Получаем номер чата из объекта event
    const chatId = event.fromChatId;
    // Выводим в консоль тип события и номер чата
    console.log(`Deleted Message event.fromChatID = ${chatId}`); 
    // Отправляем сообщение в чат отправителя
    bot.sendText(chatId, "Зачем!");
});
 
// Получаем диспетчер бота и добавляем в него обработчики 
bot.getDispatcher().addHandler(handlerNewMessage);
bot.getDispatcher().addHandler(handlerDeleteMessage);

// Запускаем пулинг для получения команд обработчикам
bot.startPolling();
 
``` 

Далее остаётся запустить нашего бота

```bash
# Запускаем проект
node index.js
```
 


## Бот с кнопками

Цель: 
Сценарий 1
* Отпарвляем команду  "/update" или ".update"
* Получаем сообщение с 2 кнопками 
* Нажимаем на кнопку "Отменить обработку"
* Получаем нотификацию "Обработка данных прервана; ID: 1"
* Нажимаем на эту кнопку повторно
* Получаем попап "Задача ID: 1 не найдена!"
* Нажимаем на кнопку "Читать статьи"
* Открывается сторонний сайт

Сценарий 2
* Отправляем команду ".help" или "/help"
* Получаем сообщение с 1 кнопкой
* Нажимаем кнопку "Открыть мануал"
* Появляется диалоговое окно с предложением перейти на сторонний сайт


### Исполнение
Аналогично первому примеру создадим проект и в файл index.js добавим следующий код:

```javascript 
const ICQ = require('icq-bot').default;
const TaskService = require("./TaskService").default; 
  
const bot = new ICQ.Bot(ВАШ_ТОКЕН_БОТА);

const service = new TaskService();

const handlerCommand = new ICQ.Handler.Command("update",null, (bot, event) => { 
    let buttonOpenWeb = new ICQ.Button("Читать статьи", null, "https://fake-mm.ru")  
    // Вызов метода сервиса обработки данных и получение ID задачи
    const id = service.addTask();
    let buttonOk = new ICQ.Button("Отменить обработку", `{"name": "removeTask","id": ${id}}`)
    bot.sendText(event.fromChatId, "Данные в очереди на обработку ", null,null,null,[buttonOk,buttonOpenWeb ]);
});

const helpCommand = new ICQ.Handler.HelpCommand(null,(bot, event) => {
    const id = Math.random();
    let buttonOk = new ICQ.Button("Открыть мануал", `{"name": "openManual", "id": ${id}}`)
    bot.sendText(event.fromChatId, "Вся документация доступна по кнопке", null,null,null,[buttonOk]);
}) 

const handlerButton = new ICQ.Handler.BotButtonCommand(null,(bot,event) => { 
    try {
        const command = JSON.parse(event.data.callbackData);
        switch(command.name) {
            case "removeTask" :
                if(service.removeTask(command.id)) {
                    bot.answerCallbackQuery(event.data.queryId,"Обработка данных прервана; ID: "+command.id,false)
                } else {
                    bot.answerCallbackQuery(event.data.queryId,"Задача ID: "+command.id + " не найдена!",true) 
                }
            break;
            case "openManual" :
                bot.answerCallbackQuery(event.data.queryId,"Мануал по ссылке",false,"https://fake-mm.ru/features") 
            break;
            default: 
                bot.answerCallbackQuery(event.data.queryId,"Обработка кнопки не задана!",true) 
        }
    } catch(ex) {
        bot.answerCallbackQuery(event.data.queryId,"Ошибка распознания команды!",true) 
    }
})

bot.getDispatcher().addHandler(handlerCommand);  
bot.getDispatcher().addHandler(helpCommand);  
bot.getDispatcher().addHandler(handlerButton); 

bot.startPolling();
```

Далее создадим файл сервиса  **TaskService.js** и вставим код ниже

```javascript

class TaskService {
    static inc = 0;
    constructor() {
        this.task = [];
    }
    addTask() {
        const id = ++TaskService.inc;
        this.task.push(id)
        console.log(this.task)
        return id;
    }
    removeTask(id) { 
        const index = this.getIndex(id); 
        if(index != -1) {
            delete this.task[index]

            console.log(this.task)
            return true;
        }

        console.log(this.task)
        return false;
    } 
    getIndex(id) {
        return this.task.findIndex(tid => tid == id);
    }
}

exports.default = TaskService;
```

Далее остаётся запустить нашего бота

```bash
# Запускаем проект
node index.js
```
 
 
# API description
<ul>
    <li><a href="https://icq.com/botapi/">icq.com/botapi/</a></li>
    <li><a href="https://agent.mail.ru/botapi/">agent.mail.ru/botapi/</a></li>
</ul>
