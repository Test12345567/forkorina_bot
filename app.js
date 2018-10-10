const TelegramBot = require('node-telegram-bot-api');

const token = '613248910:AAFxTOijuGVR49p-rHM8U2yEwElUeJjsXcE';

const bot = new TelegramBot(token, {polling: true});

let list = [];

bot.on('message', function (msg) {
    const userId = msg.from.id;

    if(list.find((obj) => {
        if(obj.uid === userId)
            return true;
    })){
        bot.sendMessage(userId, 'Ты уже в списке :)');
        return;
    }

    list.push({ 'uid': userId});

    bot.sendMessage(userId, 'Отлично! Я обязательно напомню, если не сдохну :)');
});

function messageForKorina() {
    const hours = new Date().getHours();
    if(hours > 1 && hours < 6)
        return;

    for(let i = 0; i < list.length; i++){
        bot.sendMessage(list[i].uid, 'Учи JS блять!');
    }
}

setInterval(messageForKorina, 10*1000);