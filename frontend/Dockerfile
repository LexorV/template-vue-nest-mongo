FROM node:20-alpine AS builder

# Устанавливаем зависимости для сборки
RUN apk add g++ make py3-pip

WORKDIR /app

# Сначала копируем все файлы проекта
COPY . .

# Устанавливаем глобально Quasar CLI
RUN yarn global add @quasar/cli

# Удаляем существующий package-lock.json чтобы избежать конфликтов
RUN rm -f package-lock.json

# Устанавливаем зависимости через yarn
RUN yarn install

# Собираем приложение
RUN yarn quasar build

# Этап production
FROM nginx:1.23.1-alpine as production

# Очищаем дефолтные файлы nginx
RUN rm -rf /usr/share/nginx/html/* \
    && rm -rf /etc/nginx/conf.d/*

# Копируем собранные файлы
COPY --from=builder /app/dist/spa /usr/share/nginx/html
COPY --from=builder /app/nginx/conf.d/default.conf /etc/nginx/conf.d/

EXPOSE 3020

CMD ["nginx", "-g", "daemon off;"]
