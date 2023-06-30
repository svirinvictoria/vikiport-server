import mongoose from "mongoose";

try {
    if(mongoose.model("ForexItem")){
        // console.log("model/forex/index is working");
        module.exports = mongoose.model("ForexItem");
    }
}catch(e) {
    if(e.name === "MissingSchemaError") {
        // console.log("model/forex/index has error");
        const forexItemSchema = new mongoose.Schema({
            timestamp:{
                type: Date,
                required: true,
            },
            payload:{
                type: String,
                required: true,
            },
        });
        module.exports = mongoose.model("ForexItem", forexItemSchema);
    }
}