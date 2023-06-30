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

module.exports = {
  getCharachters: getCharachters,
};
