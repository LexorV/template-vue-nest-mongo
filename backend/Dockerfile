# С помощью директивы AS можно дать образу имя
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Устанавливаем зависимости
RUN npm i
# Копируем исходный код и собираем приложение
COPY . .
RUN npm run build

FROM node:16-alpine as production
RUN npm install pm2 -g
WORKDIR /app
# С помощью параметера --from указываем, что копировать нужно из образа builder
# Копируем package.json и package-lock.json (потребуются для установки зависимостей)
COPY --from=builder /app/package*.json ./
# Устанавливаем только зависимости, необходимые в продакшене
# --omit=dev означает пропустить dev-зависимости
RUN npm i --omit=dev \
&& npm i @nestjs/config
# Копируем директорию со сборкой приложения
COPY --from=builder /app/dist ./dist
RUN mkdir /app/dist/static
COPY --from=builder /app/ecosystem.config.js ./ecosystem.config.js
EXPOSE 3000
# Указываем команду для запуска приложения
CMD [ "pm2-runtime", "start", "ecosystem.config.js"]