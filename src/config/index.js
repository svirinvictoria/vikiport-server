const path = require("path");
const dotenv = require("dotenv");

process.env.NODE_ENV == "local" || process.env.NODE_ENV == "dev" || process.env.NODE_ENV == "qa"
  ? dotenv.config({ path: path.join(__dirname, `../../env/.env.${process.env.NODE_ENV}`) })
  : dotenv.config();

export default {
  port: process.env.PORT || 3000,
  mongoDbUrl: process.env.MONGODB_URL,
  forexApiUrl: process.env.FOREX_API_URL,
  weatherApiUrl: process.env.WEATHER_API_URL,
  cartoonApiUrl: process.env.CARTOON_API_URL,
};

