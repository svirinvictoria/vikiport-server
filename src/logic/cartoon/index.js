import dataAccess from "../../model/cartoon/dataAccess";
import proxy from "../../proxy/cartoon/index";

const getCartoonItems = () => {
    return new Promise(async (resolve, reject) => {
      try{
          let cartoonData = await dataAccess.getActualCartoon();
          if (cartoonData == null || cartoonData.length == 0){
            const cartoonItems = await proxy.getCharachters();
            const filteredResult = cartoonItems.results.map((ch)=>{
              return{
                id: ch.id,
                name: ch.name,
                status: ch.status,
                species: ch.species,
                gender: ch.gender,
                image: ch.image,
              };
            });
            const serialized = JSON.stringify(filteredResult);
            cartoonData = await dataAccess.saveActualCartoon(serialized);
          }
          const result = JSON.parse(cartoonData.payload);
          resolve(result)
      } catch (err) {
          reject (err);
      }
    });
};

const getCharachterById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ch = await proxy.getCharachterById(id);
      const filteredResult = {
          id: ch.id,
          name: ch.name,
          status: ch.status,
          species: ch.species,
          gender: ch.gender,
          image: ch.image,
      };
      resolve(filteredResult);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  getCartoonItems: getCartoonItems,
  getCharachterById: getCharachterById
};
