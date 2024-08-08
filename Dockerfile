# Используем официальный образ Node.js как базовый
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Генерация Prisma Client с учетом правильного бинарного таргета
RUN npx prisma generate

# Открываем порт приложения
EXPOSE 3000

# Запускаем приложение в зависимости от NODE_ENV
CMD ["npm", "run", "prod"]
