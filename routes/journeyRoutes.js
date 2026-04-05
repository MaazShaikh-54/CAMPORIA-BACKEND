import express from "express";
import {
  createJourney,
  getJourneys,
  getJourneyById,
  updateJourney,
  deleteJourney,
} from "../controllers/journeyController.js";

const journeyRouter = express.Router();

journeyRouter.post("/create-journey", createJourney);
journeyRouter.get("/get", getJourneys);
journeyRouter.get("/:id", getJourneyById);
journeyRouter.put("/:id", updateJourney);
journeyRouter.delete("/:id", deleteJourney);

export default journeyRouter;
