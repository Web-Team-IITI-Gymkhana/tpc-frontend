FROM node:alpine

WORKDIR /usr/app

ENV NEXT_PUBLIC_BACKEND_URL=https://placement.iiti.ac.in
ENV NEXT_PUBLIC_FRONTEND_URL=https://placement.iiti.ac.in
COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install --frozen-lockfile

COPY ./ ./

RUN yarn build

USER node

CMD [ "yarn", "start" ]