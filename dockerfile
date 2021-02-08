FROM node:15.5.0-alpine3.10

WORKDIR /app

COPY . .

RUN yarn workspace server install --frozen-lockfile --non-interactive

CMD ["yarn", "workspace", "server", "start:dev"]