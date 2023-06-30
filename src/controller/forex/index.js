import { Router } from "express";
import * as logic from "../../logic/forex/index";
import "regenerator-runtime/runtime";


export default ({}) =>{
    const api = Router();

    api.get("/isalive", (request, response)=>{
        console.log("controller/forex is working");

        response.status(200).json({
            isAlive: true,
        });
        
    });

    api.get("/actual", async(req, res)=>{
        try {
            const result = await logic.getActualForex();
            res.status(200).json({ data: result });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to load current data" });
        }
    });
    return api;
};