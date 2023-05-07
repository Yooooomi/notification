FROM node:18-alpine

ENV NOTIFICATION_PUBLIC_VAPID_KEY=public_key

WORKDIR /app

RUN apk add python3 gcc g++ make cmake
RUN npm install -g nodemon serve

COPY scripts/ scripts/
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY tsconfig.json tsconfig.json

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-production}

RUN yarn --frozen-lockfile --dev

COPY src/ src/
COPY public/ public/

RUN sh scripts/build/*.sh

ENTRYPOINT [ "sh", "/app/scripts/run/run.sh" ]
