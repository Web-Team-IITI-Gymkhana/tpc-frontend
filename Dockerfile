FROM node:alpine

WORKDIR /usr/app

RUN npm install --global pm2

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install --frozen-lockfile

COPY ./ ./

RUN npm run build

USER node

CMD [ "pm2-runtime", "npm", "--", "start" ]