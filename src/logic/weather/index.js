import dataAccess from "../../model/weather/dataAccess";
import proxy from "../../proxy/weather/index";

const getActualWeather = () => {
  return new Promise(async (resolve, reject) => {
    try {

      // Try to load data from Mongo
      let weatherData = await dataAccess.getActualWeather();

      // If it is an empty or outdated
      if (weatherData == null || weatherData.length == 0) {

         // Get actual data from proxy
        const weather = await proxy.getActualWeather();

        console.log(weather);

        // Extract only necessary data
        const actualWeatherData = convertToResponseObject(weather);

        // Stringiry to save that in Mongo
        const serialized = JSON.stringify(actualWeatherData);

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

const convertToResponseObject = (result) => {
  return result;
}

module.exports = {
  getActualWeather: getActualWeather,
};
