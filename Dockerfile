FROM node as builder

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN sed -i '/^    "electron/g' package.json
RUN sed -i '/^    "postinstall/g' package.json
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN rm -rf vite.config.ts && mv vite-web.config.ts vite.config.ts \
    && rm -rf src/backend/app/ && rm -rf src/backend/index.ts && mv src/backend/index-web.ts src/backend/index.ts
RUN pnpm build

FROM bitnami/kubectl:latest as kubectl

FROM node:alpine as final
WORKDIR /app
RUN npm install pm2@latest -g
COPY --from=builder /usr/src/app/dist /app/
COPY --from=builder /usr/src/app/node_modules /app/node_modules
COPY --from=kubectl /opt/bitnami/kubectl/bin/kubectl /usr/local/bin/kubectl

RUN apk update && apk --no-cache add ca-certificates bash

EXPOSE 3007
CMD [ "pm2-runtime","start", "/app/backend/index.js" ]
