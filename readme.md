# Web Scraper with Puppeteer and Telegram Bot Integration

This Node.js script checks a `canyon.com` website every 2 hours using Puppeteer.

## Prerequisites

- Node.js installed on your machine
- A Telegram account and a bot created with BotFather
- A chat ID for the bot to send messages to

## Installation

1. Clone this repository or download the `index.js` file.
2. Run `npm install` to install the required dependencies.
3. Create a `.env` file in the root directory and add the following variables:

```dotenv
BOT_TOKEN=<your_bot_token>
TELEGRAM_CHAT_ID=<your_chat_id>
```

Replace `<your_bot_token>` with the token of your Telegram bot, and `<your_chat_id>` with the chat ID of the user or group where you want to receive the bot messages.

## Usage

To start the script, run the command:

```bash
npm start
```

The script will run indefinitely, checking the specified website every 2 hours. If the bike is available for purchase, a message will be sent to the Telegram bot.

You can modify the following constants in the script to customize the behavior:

- `URL`: the URL of the website to check
- `SELECTOR`: the CSS selector of the element to check
- `SEARCH_TEXT`: the text to search for in the element
- `TIME`: the interval between checks, in milliseconds (default: 2 hours)

