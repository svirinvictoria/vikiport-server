
import express from "express";
import weather from "../controller/weather/index";
import forex from "../controller/forex/index";
import cartoon from "../controller/cartoon/index";


let router = express();

router.use("/weather/v1", weather({}));
router.use("/forex/v1", forex({}));
router.use("/cartoon/v1", cartoon({}));

export default router;
