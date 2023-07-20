import proxy from "../../proxy/cartoon/index";

const getCharachters = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const characters = await proxy.getCharachters();

      const filteredResult = characters.results.map((ch)=>{
        return{
          id: ch.id,
          name: ch.name,
          status: ch.status,
          species: ch.species,
          gender: ch.gender,
          image: ch.image,
        };
      });

      resolve(filteredResult);
    } catch (err) {
      reject(err);
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
  getCharachters: getCharachters,
  getCharachterById: getCharachterById
};
