
const feedbackCommandMessage = {
    "eventId": 1,
    "type": "newMessage",
    "payload": {
        "msgId": "57883346846815032",
        "chat": {
            "chatId": "681869378@chat.agent",
            "type": "channel",
            "title": "The best channel"
        },
        "from": {
            "userId": "1234567890",
            "firstName": "Name",
            "lastName": "SurName"
        },
        "timestamp": 1546290000,
        "text": "feedback text more",
        "parts": [
            null
        ]
    }
}

const newMessageWithFileAudio = {
    "eventId": 1,
    "type": "newMessage",
    "payload": {
        "msgId": "57883346846815032",
        "chat": {
            "chatId": "681869378@chat.agent",
            "type": "channel",
            "title": "The best channel"
        },
        "from": {
            "userId": "1234567890",
            "firstName": "Name",
            "lastName": "SurName"
        },
        "timestamp": 1546290000,
        "text": "Hello!",
        "parts": [
            {
                "type": "file",
                "payload": {
                    "fileId": "ZhSnMuaOmF7FRez2jGWuQs5zGZwlLa0",
                    "type": "audio",
                    "caption": "Last weekend trip"
                }
            }
        ]
    }
};

const newMessageWithFileVideo = {
    "eventId": 1,
    "type": "newMessage",
    "payload": {
        "msgId": "57883346846815032",
        "chat": {
            "chatId": "681869378@chat.agent",
            "type": "channel",
            "title": "The best channel"
        },
        "from": {
            "userId": "1234567890",
            "firstName": "Name",
            "lastName": "SurName"
        },
        "timestamp": 1546290000,
        "text": "Hello!",
        "parts": [
            {
                "type": "file",
                "payload": {
                    "fileId": "ZhSnMuaOmF7FRez2jGWuQs5zGZwlLa0",
                    "type": "video",
                    "caption": "Last weekend trip"
                }
            }
        ]
    }
};

const newMessageWithFile = {
    "eventId": 1,
    "type": "newMessage",
    "payload": {
        "msgId": "57883346846815032",
        "chat": {
            "chatId": "681869378@chat.agent",
            "type": "channel",
            "title": "The best channel"
        },
        "from": {
            "userId": "1234567890",
            "firstName": "Name",
            "lastName": "SurName"
        },
        "timestamp": 1546290000,
        "text": "Hello!",
        "parts": [
            {
                "type": "file",
                "payload": {
                    "fileId": "ZhSnMuaOmF7FRez2jGWuQs5zGZwlLa0",
                    "type": "image",
                    "caption": "Last weekend trip"
                }
            }
        ]
    }
};
const startCommandMessage = {
    "eventId": 1,
    "type": "newMessage",
    "payload": {
        "msgId": "57883346846815032",
        "chat": {
            "chatId": "681869378@chat.agent",
            "type": "channel",
            "title": "The best channel"
        },
        "from": {
            "userId": "1234567890",
            "firstName": "Name",
            "lastName": "SurName"
        },
        "timestamp": 1546290000,
        "text": "sTart text more",
        "parts": [
            null
        ]
    }
};

const URLMessage = {
    "eventId": 1,
    "type": "newMessage",
    "payload": {
        "msgId": "57883346846815032",
        "chat": {
            "chatId": "681869378@chat.agent",
            "type": "channel",
            "title": "The best channel"
        },
        "from": {
            "userId": "1234567890",
            "firstName": "Name",
            "lastName": "SurName"
        },
        "timestamp": 1546290000,
        "text": "https://fake-mm.ru/news",
        "parts": [
            {
                "type": "reply",
                "payload": {
                    "message": {
                        "from": {
                            "firstName": "Name",
                            "lastName": "SurName",
                            "userId": "1234567890"
                        },
                        "msgId": "6724238139063271643",
                        "text": "some text",
                        "timestamp": 1565608694
                    }
                }
            },
            {
                "type": "sticker",
                "payload": {
                    "fileId": "2IWuJzaNWCJZxJWCvZhDYuJ5XDsr7hU"
                }
            },
            {
                "type": "forward",
                "payload": {
                    "message": {
                        "from": {
                            "firstName": "Name",
                            "lastName": "SurName",
                            "userId": "1234567890"
                        },
                        "msgId": "6724238139063271643",
                        "text": "some text",
                        "timestamp": 1565608694
                    }
                }
            }
        ]
    }
};


const timeCommandMessage = {
    "eventId": 1,
    "type": "newMessage",
    "payload": {
        "msgId": "57883346846815032",
        "chat": {
            "chatId": "681869378@chat.agent",
            "type": "channel",
            "title": "The best channel"
        },
        "from": {
            "userId": "1234567890",
            "firstName": "Name",
            "lastName": "SurName"
        },
        "timestamp": 1546290000,
        "text": "/newTime 12.00",
        "parts": [
            null
        ]
    }
};

const helpCommandMessage = {
    "eventId": 1,
    "type": "newMessage",
    "payload": {
        "msgId": "57883346846815032",
        "chat": {
            "chatId": "681869378@chat.agent",
            "type": "channel",
            "title": "The best channel"
        },
        "from": {
            "userId": "1234567890",
            "firstName": "Name",
            "lastName": "SurName"
        },
        "timestamp": 1546290000,
        "text": "help full text",
        "parts": [
            null
        ]
    }
};


const eventMessage = {
    "eventId": 1,
    "type": "newMessage",
    "payload": {
        "msgId": "57883346846815032",
        "chat": {
            "chatId": "681869378@chat.agent",
            "type": "channel",
            "title": "The best channel"
        },
        "from": {
            "userId": "1234567890",
            "firstName": "Name",
            "lastName": "SurName"
        },
        "timestamp": 1546290000,
        "text": "Hello!",
        "parts": [
            null
        ]
    }
};

const eventEditMessage = {
    "eventId": 2,
    "type": "editedMessage",
    "payload": {
        "msgId": "57883346846815032",
        "chat": {
            "chatId": "681869378@chat.agent",
            "type": "channel",
            "title": "The best channel"
        },
        "from": {
            "userId": "1234567890",
            "firstName": "Name",
            "lastName": "SurName"
        },
        "timestamp": 1546290000,
        "text": "Hello! Comrade!",
        "editedTimestamp": 1546290099
    }
};

const eventDeleteMessage = {
    "eventId": 3,
    "type": "deletedMessage",
    "payload": {
        "msgId": "57883346846815032",
        "chat": {
            "chatId": "681869378@chat.agent",
            "type": "channel",
            "title": "The best channel"
        },
        "timestamp": 1546290000
    }
}

const eventPinnedMessage = {
    "eventId": 4,
    "type": "pinnedMessage",
    "payload": {
        "chat": {
            "chatId": "681869378@chat.agent",
            "type": "group",
            "title": "The best group"
        },
        "from": {
            "userId": "9876543210",
            "firstName": "Name",
            "lastName": "SurName"
        },
        "msgId": "6720509406122810315",
        "text": "Some important information!",
        "timestamp": 1564740530
    }
};

const eventUnpunnedMessage = {
    "eventId": 5,
    "type": "unpinnedMessage",
    "payload": {
        "chat": {
            "chatId": "681869378@chat.agent",
            "type": "group",
            "title": "The best group"
        },
        "msgId": "6720509406122810315",
        "timestamp": 1564740530
    }
}

const eventNewChatMembers = {
    "eventId": 6,
    "type": "newChatMembers",
    "payload": {
        "chat": {
            "chatId": "681869378@chat.agent",
            "type": "group",
            "title": "The best group"
        },
        "newMembers": [
            {
                "userId": "1234567890",
                "firstName": "Name",
                "lastName": "SurName"
            }
        ],
        "addedBy": {
            "userId": "9876543210",
            "firstName": "Name",
            "lastName": "SurName"
        }
    }
};

const eventLeftChatMembers = {
    "eventId": 7,
    "type": "leftChatMembers",
    "payload": {
        "chat": {
            "chatId": "681869378@chat.agent",
            "type": "group",
            "title": "The best group"
        },
        "leftMembers": [
            {
                "userId": "1234567890",
                "firstName": "Name",
                "lastName": "SurName"
            }
        ],
        "removedBy": {
            "userId": "9876543210",
            "firstName": "Name",
            "lastName": "SurName"
        }
    }
}


const eventCallbackQuery = {
    "eventId": 8,
    "type": "callbackQuery",
    "payload": {
      "queryId": "QDFWEscvSW",
      "chat": {
        "chatId": "681869378@chat.agent",
        "type": "group",
        "title": "The best group"
      },
      "from": {
        "userId": "1234567890",
        "firstName": "Name",
        "lastName": "SurName"
      },
      "message": {
        "eventId": 1,
        "type": "newMessage",
        "payload": {
          "msgId": "57883346846815032",
          "chat": {
            "chatId": "681869378@chat.agent",
            "type": "channel",
            "title": "The best channel"
          },
          "from": {
            "userId": "1234567890",
            "firstName": "Name",
            "lastName": "SurName"
          },
          "timestamp": 1546290000,
          "text": "Hello!",
          "parts": [
            null
          ]
        }
      },
      "callbackData": "RXhhbXBsZSBjYWxsYmFjayBkYXRhCg=="
    }
  }


exports.eventCallbackQuery = eventCallbackQuery
exports.eventMessage = eventMessage;
exports.eventEditMessage = eventEditMessage;
exports.eventDeleteMessage = eventDeleteMessage;
exports.eventUnpunnedMessage = eventUnpunnedMessage;
exports.eventPinnedMessage = eventPinnedMessage;
exports.eventNewChatMembers = eventNewChatMembers;
exports.eventLeftChatMembers = eventLeftChatMembers;
exports.helpCommandMessage = helpCommandMessage;
exports.startCommandMessage = startCommandMessage;
exports.feedbackCommandMessage = feedbackCommandMessage;
exports.timeCommandMessage = timeCommandMessage;
exports.newMessageWithFile = newMessageWithFile;
exports.URLMessage = URLMessage;

exports.newMessageWithFileVideo = newMessageWithFileVideo;
exports.newMessageWithFileAudio = newMessageWithFileAudio;