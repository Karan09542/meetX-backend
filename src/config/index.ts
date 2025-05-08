import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(__dirname, "../../.env") })

export const PORT = process.env.PORT || 3000
export const IS_PRODUCTION = process.env.NODE_ENV === "production"
export const DB_URL = IS_PRODUCTION ? process.env.DB_URL?.replace("<db_password>", process.env.DB_PASSWORD as string) : process.env.DB_URL