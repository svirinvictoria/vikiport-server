import dataAccess from "../../model/forex/dataAccess";
import proxy from "../../proxy/forex/index"

const getActualForex = () =>{
    return new Promise(async (resolve, reject) => {
        try{
            console.log("logic/forex is working");
            let forexData = await dataAccess.getActualForex();
            if (forexData == null || forexData.length == 0){

                const forex = await proxy.getActualForex();
                const serialized = JSON.stringify(forex);
                forexData = await dataAccess.saveActualForex(serialized);
                
            }
            resolve(forexData)
        } catch (err) {
            console.log("logic/forex has error");
            reject (err);
        }
    });
};

module.exports = {getActualForex: getActualForex};