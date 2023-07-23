import WeatherItem from "./index";

export default class DataAccess {
  static getActualWeather() {
    return new Promise(async (resolve, reject) => {
      WeatherItem.findOne(
        {
          timestamp: {
            $gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 1),
          },
        },
        (err, foundItem) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          resolve(foundItem);
        }
      )
        .sort({ $natural: -1 })
        .limit(1);
    });
  }

  static saveActualWeather(data) {
    return new Promise(async (resolve, reject) => {
      const newWeatherItem = new WeatherItem({
        timestamp: new Date(),
        payload: data,
      });
      newWeatherItem.save((err) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(newWeatherItem);
      });
    });
  }
}
