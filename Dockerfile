FROM node:18-alpine

RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

WORKDIR /src

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
