import { Pool } from 'pg'
import app from './app'
import { config } from './config'

export const pool = new Pool({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_DATABASE,
  password: config.DB_PASSWORD,
  port: Number(config.DB_PORT) || 5432,
})

app.listen(config.PORT, () => {
  console.log(`server running at http://localhost:${config.PORT}`)
})
