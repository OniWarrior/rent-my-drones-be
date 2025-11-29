# use light weight image
FROM node:20-alpine

# create working directory for app
WORKDIR /app

# copy package*.json files first
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# copy the rest of backend source
COPY . .

# set the environment
ENV NODE_ENV=production 