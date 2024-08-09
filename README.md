# BotHub test task Book-api

Команда запуска

```shell
docker-compose up -d
```

Env vars

```dotenv
DATABASE_URL="postgresql://user:pass@localhost:5432/db"
JWT_SECRET="" # 256 bit
EMAIL_TYPE="gmail" # gmail or smtp
EMAIL_HOST="" # for smtp
EMAIL_PORT="" # for smtp
EMAIL_USERNAME=""
EMAIL_PASSWORD=""
PORT=3000
FRONTEND_URL="localhost:3000" # for link in verification email message
```

P.S. Писал по опыту работы с NestJS, есть некоторые вопросы по архитектуре (например совмещать auth и users в виде `/users/login` так себе идея :)
Но все что требоавлось по ТЗ выполнено

Вы можете назначить роль администратора, указав jwt-токен и отправив пустой POST по адресу `/users/firstAdmin`

UPDATE: Добавил swagger для удобства, доступен по [http://localhost:8082](http://localhost:8082).
