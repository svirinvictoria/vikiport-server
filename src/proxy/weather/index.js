import axios from "axios";
import config from "../../config/index";

export default class DataAccess {
    static getActualWeather() {
        const url = config.weatherApiUrl;
        return new Promise(async (resolve, reject) => {
            try {
                const headers = {ContentType: 'application/json'};
                const result = await axios.get(url, { headers });
                if (result) {
                    resolve(result.data);
                } else {
                    reject("Can't load data from service. Data is null");
                }
            } catch (err){
                console.error(err);
                reject(err);
            }
        });
    }
}