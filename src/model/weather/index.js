import mongoose from "mongoose";

try {
  if (mongoose.model("WeatherItem")) {
    module.exports = mongoose.model("WeatherItem");
  }
} catch (e) {
  if (e.name === "MissingSchemaError") {
    const weatherItemSchema = new mongoose.Schema({
      timestamp: {
        type: Date,
        required: true,
      },
     payload: {
        type: String,
        required: true,
      },
    });
    module.exports = mongoose.model("WeatherItem", weatherItemSchema);
  }
}
