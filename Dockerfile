FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build && npm prune --production && rm -rf src

ENV NODE_ENV=production

EXPOSE 8080

CMD ["npm", "run", "start:api"]