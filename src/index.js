const axios = require('axios');
const cheerio = require('cheerio');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();


const BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const CUSTOM_TIME_IN_MINUTES = process.env.CUSTOM_TIME_IN_MINUTES;

const URL = 'https://www.canyon.com/en-es/road-bikes/endurance-bikes/endurace/cf/endurace-cf-7/2735.html';
const SELECTOR = '[data-product-size=S] .productConfiguration__availabilityTop';
const SEARCH_TEXT = 'Coming soon';

const minute = 60 * 1000;
const hour = 60 * minute;
const TIME = (CUSTOM_TIME_IN_MINUTES * minute) || (2 * hour);

const bot = new TelegramBot(BOT_TOKEN);

async function scrapeWebsite(url, selector, searchText) {
    console.log("------------Start scrape");
    try {
        const {data} = await axios.get(url);
        const $ = cheerio.load(data);
        const element = $(selector);
        const textContent = element.text();
        const isAvailableForPurchase = !textContent.includes(searchText);
        
        await makeActionAfterScrape(isAvailableForPurchase);
    } catch (e) {
        console.error('catch:  ', e)
    }
}

async function makeActionAfterScrape(isAvailableForPurchase) {
    if (isAvailableForPurchase) {
        console.log('Try send the message to bot: Urgently buy a bike!!!')
        await bot.sendMessage(TELEGRAM_CHAT_ID, 'Urgently buy a bike!!!');
    } else {
        console.log('Try send the message to bot: Bike no available')
        await bot.sendMessage(TELEGRAM_CHAT_ID, 'Bike no available');
    }
}


console.log(`Run application with CUSTOM_TIME_IN_MINUTES: ${CUSTOM_TIME_IN_MINUTES}, BOT_TOKEN: ${BOT_TOKEN},
TELEGRAM_CHAT_ID: ${TELEGRAM_CHAT_ID},
`);


scrapeWebsite(URL, SELECTOR, SEARCH_TEXT);
setInterval(
    () => scrapeWebsite(URL, SELECTOR, SEARCH_TEXT),
    TIME
)
