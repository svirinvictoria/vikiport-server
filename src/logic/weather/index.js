import dataAccess from "../../model/weather/dataAccess";
import proxy from "../../proxy/weather/index";

const getActualWeather = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // Try to load data from Mongo
      let weatherData = await dataAccess.getActualWeather();

      console.log("mongo", weatherData);

      // If it is an empty or outdated
      if (weatherData == null || weatherData.length == 0) {

        // Get actual data from proxy
        const weather = await proxy.getActualWeather();

        // Stringiry to save that in Mongo
        const serialized = JSON.stringify(weather);

        // Save necessary data in Mongo
        weatherData = await dataAccess.saveActualWeather(serialized);
      }

      // Deserialize data data from Mongo
      const response = JSON.parse(weatherData.payload);

      // Reslve promise with necessary information as json
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getActualWeather: getActualWeather,
};
