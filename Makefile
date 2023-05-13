include .env

IMAGE_NAME=bike-check

.PHONY: build run stop

build:
	docker build --platform linux/amd64 -t $(IMAGE_NAME) .

run:
	docker run --name $(IMAGE_NAME) -d -e BOT_TOKEN=$(BOT_TOKEN) -e TELEGRAM_CHAT_ID=$(TELEGRAM_CHAT_ID) -e CUSTOM_TIME_IN_MINUTES=1 $(IMAGE_NAME)

stop:
	docker stop $(IMAGE_NAME)
	docker rm $(IMAGE_NAME)

runExternal:
	docker run --platform linux/amd64 -i --init --cap-add=SYS_ADMIN --rm ghcr.io/puppeteer/puppeteer:latest node -e "$(cat src/index.js)"