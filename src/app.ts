import express, { Application } from 'express';
import bookRoutes from './routes/book.routes';
import userRoutes from './routes/user.routes';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import passport from './config/passport';

dotenv.config();

const app: Application = express();

// Функция для проверки наличия всех необходимых переменных окружения
function checkEnvVariables() {
  const requiredEnvVariables = [
    'DATABASE_URL',
    'JWT_SECRET',
    'EMAIL_TYPE',
    'EMAIL_HOST',
    'EMAIL_PORT',
    'PORT',
    'FRONTEND_URL',
  ];

  for (const variable of requiredEnvVariables) {
    if (!process.env[variable]) {
      throw new Error(`Missing required environment variable: ${variable}`);
    }
  }
}

// Вызов функции проверки
checkEnvVariables();

app.use(passport.initialize());

// Express Middlewares
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(express.json());

app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Not Found',
  });
});

export default app;
