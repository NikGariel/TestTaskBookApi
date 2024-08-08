export interface JwtPayload {
  userId: number;
  iat?: number; // Время выпуска токена (опционально)
  exp?: number; // Время истечения токена (опционально)
  iss?: string; // Издатель токена (опционально)
  aud?: string; // Аудитория токена (опционально)
}
