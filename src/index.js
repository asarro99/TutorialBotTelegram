require('dotenv').config();

const TeleBot = require('telebot');
const Quote = require('inspirational-quotes');

const bot = new TeleBot(process.env.TELEGRAM_KEY);

const replyMarkup = bot.keyboard([
    ['/quote']
],{resize: true, once: false});

bot.on(['/start'],(msg)=>{
    const {chat, text} = msg;
    bot.sendMessage(chat.id, 'Ciao sono il bot di prova e per adesso invio solo frasi motivazionali tramite il comando /quote',{replyMarkup})
})

bot.on(['/quote'], (msg)=>{
    const {chat, text} = msg;
    const quote = Quote.getQuote();
    let response = `--Citazione--\n${quote.text}\n\n--Autore--\n${quote.author}`;
    bot.sendMessage(chat.id,response);
})

bot.on('text', (msg)=>{
    const {chat, text} = msg;
    if(text !== '/start' && text !== '/quote') {
        bot.sendMessage(chat.id, 'Al momento posso rispondere solo al comando /quote.')
    }
    
})

bot.start();