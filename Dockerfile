FROM node:8

WORKDIR /app

RUN apt-get update
RUN apt-get install -y graphicsmagick

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

ENV CHARCOAL_FACTOR=0.8

CMD ["node", "index.js"]
