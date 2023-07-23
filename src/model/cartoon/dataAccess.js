import CartoonItem from "./index";

export default class DataAccess {
  static getActualCartoon() {
    return new Promise(async (resolve, reject) => {
      CartoonItem.findOne(
        {
          timestamp: {
            $gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 3),
          },
        },
        (err, foundItem) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          resolve(foundItem);
        }
      ).sort({ $natural: -1 });
    });
  }

  static saveActualCartoon(data) {
    return new Promise(async (resolve, reject) => {
      const newCartoonItem = new CartoonItem({
        timestamp: new Date(),
        payload: data,
      });
      newCartoonItem.save((err) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(newCartoonItem);
      });
    });
  }
}
