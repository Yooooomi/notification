FROM node:18-alpine

ENV NOTIFICATION_MAIL=mail@example.org
ENV NOTIFICATION_PUBLIC_VAPID_KEY=public_key
ENV NOTIFICATION_PRIVATE_VAPID_KEY=private_key
ENV NOTIFICATION_ICON=

WORKDIR /app

RUN apk add python3 gcc g++ make cmake
RUN npm install -g nodemon

COPY package.json package.json
COPY yarn.lock yarn.lock
COPY tsconfig.json tsconfig.json

RUN yarn --frozen-lockfile

COPY src/ src/
COPY scripts/ scripts/

ENTRYPOINT [ "sh", "scripts/run/run.sh" ]