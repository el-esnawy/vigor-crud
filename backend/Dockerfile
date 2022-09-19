FROM node:alpine
RUN apk add --no-cache nodejs npm
COPY . /server
COPY package.json /server
COPY . /server
EXPOSE 8080
WORKDIR /server
CMD node server.js
