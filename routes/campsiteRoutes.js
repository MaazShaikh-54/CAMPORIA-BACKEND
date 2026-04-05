import express from "express";
import {
  createCampsite,
  getCampsites,
  getCampsiteById,
  updateCampsite,
  deleteCampsite,
} from "../controllers/campsiteController.js";

const campsiteRouter = express.Router();

campsiteRouter.post("/create-campsite", createCampsite);
campsiteRouter.get("/", getCampsites);
campsiteRouter.get("/:id", getCampsiteById);
campsiteRouter.put("/:id", updateCampsite);
campsiteRouter.delete("/:id", deleteCampsite);

export default campsiteRouter;
