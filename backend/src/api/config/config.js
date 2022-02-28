import dotenv from "dotenv";

dotenv.config(); 

export const DB = {
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME,
    API: process.env.DB_API,
  };

export const GENERAL = {
    PORT:process.env.PORT,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY
}

export const FIREBASE = {
    API_KEY: process.env.FAPI_KEY,
    AUTH_DOMAIN: process.env.FAUTH_DOMAIN,
    PROJECT_ID: process.env.FPROJECT_ID,
    STORAGE_BUCKET: process.env.FSTORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.FMESSAGING_SENDER_ID,
    APP_ID: process.env.FAPP_ID,
  };