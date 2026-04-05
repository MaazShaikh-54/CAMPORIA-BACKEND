import express from "express";
import {
  createReview,
  getReview,
  deleteReview,
} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/create-review", createReview);
reviewRouter.get("/", getReview);
reviewRouter.delete("/:id", deleteReview);

export default reviewRouter;
