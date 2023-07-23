import dataAccess from "../../model/forex/dataAccess";
import proxy from "../../proxy/forex/index"

const getActualForex = () =>{
    return new Promise(async (resolve, reject) => {
        try{
            let forexData = await dataAccess.getActualForex();
            if (forexData == null || forexData.length == 0){
                const forex = await proxy.getActualForex();
                const serialized = JSON.stringify(forex);
                forexData = await dataAccess.saveActualForex(serialized);
            }
            resolve(forexData)
        } catch (err) {
            reject (err);
        }
    });
};

module.exports = {getActualForex: getActualForex};