# use light weight image
FROM node:20-alpine

# create working directory for app
WORKDIR /app

# copy package*.json files first
COPY package*.json ./