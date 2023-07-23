import mongoose from "mongoose";

try {
    if(mongoose.model("CartoonItem")){
        module.exports = mongoose.model("CartoonItem");
    }
}catch(e) {
    if(e.name === "MissingSchemaError") {
        const cartoonItemSchema = new mongoose.Schema({
            timestamp:{
                type: Date,
                required: true,
            },
            payload:{
                type: String,
                required: true,
            },
        });
        module.exports = mongoose.model("CartoonItem", cartoonItemSchema);
    }
}