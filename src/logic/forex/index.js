import dataAccess from "../../model/forex/dataAccess";
import proxy from "../../proxy/forex/index"

const getActualForex = () =>{
    return new Promise(async (resolve, reject) => {
        try{

            // Try to load data from Mongo
            let forexData = await dataAccess.getActualForex();

            // If it is an empty or outdated
            if (forexData == null || forexData.length == 0){

                // Get actual data from proxy
                const forex = await proxy.getActualForex();

                // Extract only necessary data
                const actualForexData = convertToResponseObject(forex);

                // Stringiry to save that in Mongo
                const serialized = JSON.stringify(actualForexData);

                // Save necessary data in Mongo
                forexData = await dataAccess.saveActualForex(serialized);
            }
            
            // Deserialize data data from Mongo
            const response = JSON.parse(forexData.payload);

            // Reslve promise with necessary information as json
            resolve(response);

        } catch (err) {
            reject (err);
        }
    });
};

const convertToResponseObject = (result) => {
    return { data: {
        meta: result.meta,
        data: {
            USD: result.data.EUR,
            EUR: result.data.EUR,
            GBP: result.data.GBP,
            JPY: result.data.JPY,
            ILS: result.data.ILS
        }
    }}
}

module.exports = {getActualForex: getActualForex};