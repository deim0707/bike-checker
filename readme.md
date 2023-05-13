# Bike Availability Checker

This application periodically checks the availability of a specific bike on a website and sends a notification to a specified Telegram chat.

## Environment Variables

The application uses the following environment variables:

- `BOT_TOKEN`: The token of your Telegram bot.
- `TELEGRAM_CHAT_ID`: The ID of the Telegram chat where the bot will send messages.
- `CUSTOM_TIME_IN_MINUTES`: The interval (in minutes) at which the application checks the website. If not specified, the application will check the website every 2 hours by default.

## Usage

1. Set the environment variables `BOT_TOKEN`, `TELEGRAM_CHAT_ID`, and `CUSTOM_TIME_IN_MINUTES` in a `.env` file or in your environment.

2. `npm start` Run the application. The application will start checking the website at the specified interval and send a message to the specified Telegram chat when the bike is available for purchase.