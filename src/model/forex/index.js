import mongoose from "mongoose";

try {
    if(mongoose.model("ForexItem")){
        module.exports = mongoose.model("ForexItem");
    }
}catch(e) {
    if(e.name === "MissingSchemaError") {
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