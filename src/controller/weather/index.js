import { Router } from "express";
import logic from "../../logic/weather/index";
import "regenerator-runtime/runtime";

export default ({}) => {
  const api = Router();

  api.get("/isalive", (request, response) => {
    response.status(200).json({
      isAlive: true,
    });
  });

  api.get("/actual", async (req, res) => {
    try {
      const result = await logic.getActualWeather();
      res.status(200).json({ data: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({message: "Failed to load current data"})
    }
  });

  return api;
};
