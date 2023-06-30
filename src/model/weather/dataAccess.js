import WeatherItem from "./index";

export default class DataAccess {
  static getActualWeather() {
    console.log('DataAccess is getting actual weather');
    return new Promise(async (resolve, reject) => {
      //идем в базу данных в коллекцию weatherItem
      WeatherItem.find({}, (err, foundItem) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(foundItem);
      })
      // сортируем в порядке убывания
        .sort({ $natural: -1 })
        .limit(1);
    });
  }

  static saveActualWeather(data) {
    return new Promise(async (resolve, reject) => {
      console.log('dataAccess is saving actual weather' );
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
