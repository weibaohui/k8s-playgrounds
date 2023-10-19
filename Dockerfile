FROM node as builder

# Create app directory
WORKDIR /app

COPY package*.json ./
RUN sed -i '/^    "electron/g' package.json
RUN sed -i '/^    "postinstall/g' package.json
RUN npm install -g pnpm openapi-typescript-codegen
RUN pnpm install
COPY . .
RUN rm -rf vite.config.ts && mv vite-web.config.ts vite.config.ts \
    && rm -rf src/backend/app/ \
    && rm -rf src/backend/index.ts && mv src/backend/index-web.ts src/backend/index.ts \
RUN <<EOF cat >> /root/.kube/config
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: LS0tL==
    server: https://kubernetes.docker.internal:6443
  name: docker-desktop
contexts:
- context:
    cluster: docker-desktop
    user: docker-desktop
  name: docker-desktop
current-context: docker-desktop
kind: Config
preferences: {}
users:
- name: docker-desktop
  user:
    client-certificate-data: LS0tL==
    client-key-data: LS0tL==
EOF

RUN nohup pnpm dev & sleep 10 &&  openapi --input ./swagger-spec.json --output ./src/frontend/generated --useOptions --name=Play
RUN pnpm build

FROM bitnami/kubectl:latest as kubectl

FROM node as final
WORKDIR /app
RUN npm install pm2@latest -g
COPY --from=builder /app/dist /app/
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=kubectl /opt/bitnami/kubectl/bin/kubectl /usr/local/bin/kubectl


EXPOSE 3007
CMD [ "pm2-runtime","start", "/app/backend/index.js" ]
