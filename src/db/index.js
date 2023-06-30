
import mongoose from "mongoose";
import config from "../config/index"

export default () => {
  let dbConnector = null;
  
  const connectionString = config.mongoDbUrl;
  
  mongoose.connect(connectionString, function (err, database) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    dbConnector = database;
    console.log("Connection to MongoDb established successfully");
  });
};
