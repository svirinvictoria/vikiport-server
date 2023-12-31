
import { Router } from "express";
import * as logic from "../../logic/cartoon";
import "regenerator-runtime/runtime";

export default ({}) => {
  const api = Router();

  api.get("/isalive", (request, response) => {
    response.status(200).json({
      isAlive: true,
    });
  });

  api.get("/cartoons", async (req, res) => {
    try {
      const result = await logic.getCartoonItems();
      res.status(200).json({ data: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to load current data" });
    }
  });

  api.get("/cartoons/:id", async (req, res) => {
    try {
      const result = await logic.getCharachterById(req.params.id);
      res.status(200).json({ data: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to load current data" });
    }
  });

  return api;
};
