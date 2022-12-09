FROM node:alpine

WORKDIR /usr/src/app

RUN apk update

RUN apk add --no-cache git

RUN apk add vim

RUN apk add openssh

RUN npm install -g eas-cli

EXPOSE 19000

EXPOSE 19001

CMD [ "bash" ]