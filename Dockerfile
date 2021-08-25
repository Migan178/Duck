FROM node

RUN mkdir app
WORKDIR /app
COPY . .

RUN yarn
RUN yarn add @types/node -D

ENV SHELL=/bin/bash

RUN npx tsc

CMD [ "node", "dist" ]