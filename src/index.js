import http from "http";
import express from "express";
import router from "./router";
import connectToMongo from "./db/index";
import config from "./config/index";

const app = express();
app.server = http.createServer(app);
const cors = require("cors");
app.use(cors());


// app.get("/test-route", (req, res) => {
//   res.json({
//     message: "Test route is working!",
//   });
// });

app.use("/api", router);

connectToMongo();

app.server.listen(config.port);
console.log(`Started on port ${app.server.address().port}`);
