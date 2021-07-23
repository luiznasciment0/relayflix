import dotenv from 'dotenv'

dotenv.config()

export const config = {
  BASE_URL: process.env.BASE_URL,
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  API_KEY: process.env.API_KEY,
  API_HOST: process.env.API_HOST,
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  PORT: process.env.PORT || 9000,
}