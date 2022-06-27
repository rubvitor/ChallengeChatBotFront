FROM node:16.15 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.17.1
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/chat-bot-app /usr/share/nginx/html