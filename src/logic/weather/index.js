
import dataAccess from "../../model/weather/dataAccess";
import proxy from "../../proxy/weather/index";

const getActualWeather = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let weatherData = await dataAccess.getActualWeather();
     
      if (weatherData == null || weatherData.length == 0){
        console.log("WeatherData is empty");
        const weather = await proxy.getActualWeather();
        const serialized = JSON.stringify(weather);
        weatherData = await dataAccess.saveActualWeather(serialized);
      }

      // console.log(weatherData);
      resolve(weatherData);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getActualWeather: getActualWeather,
};
