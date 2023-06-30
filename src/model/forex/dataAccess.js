import ForexItem from "./index";

export default class DataAccess {
    static getActualForex() {
        return new Promise(async (resolve, reject)=>{
            console.log("model/forex/getActualForex is working");
            ForexItem.findOne(
                {
                timestamp:{
                    $gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 3),
                },
            },
            (err, foundItem) => {
                if (err) {
                    console.log("model/forex/getActualForex has error");
                    
                    console.error(err);
                    reject(err);
                }
                resolve(foundItem);
            }
            ).sort({ $natural: -1});
        });
    }

    static saveActualForex(data) {
        return new Promise(async (resolve, reject)=>{
            const newForexItem = new ForexItem({
                timestamp: new Date(),
                payload: data,
            });
            newForexItem.save((err)=>{
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve (newForexItem)
            });
        });
    }
}