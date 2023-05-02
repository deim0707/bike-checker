const puppeteer = require('puppeteer');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const URL = 'https://www.canyon.com/en-es/road-bikes/endurance-bikes/endurace/cf/endurace-cf-7/2735.html';
const SELECTOR = '[data-product-size=S] .productConfiguration__availabilityTop';
const SEARCH_TEXT = 'Coming soon';

const hour = 60 * 60 * 1000
const TIME = 2 * hour;

const bot = new TelegramBot(BOT_TOKEN);
async function scrapeWebsite(url, selector, searchText) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);


    const element = await page.$(selector);
    const textContent = await element.evaluate(node => node.textContent);
    const isAvailableForPurchase = !textContent.includes(searchText);
    if (isAvailableForPurchase) {
        await bot.sendMessage(TELEGRAM_CHAT_ID, 'Urgently buy a bike!!!');
    }

    await browser.close();
}


console.log('Run application');

setInterval(
    () => scrapeWebsite(URL, SELECTOR, SEARCH_TEXT),
    TIME
)
