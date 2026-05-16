import express from "express";
import authMiddleware, { adminOnly } from "../../middleware/auth.js";
import {
    getCampsites,
    addCampsite,
    updateCampsite,
    deleteCampsite
} from "../../controllers/admin/adminCampsiteController.js";

const adminCampsiteRouter = express.Router();

adminCampsiteRouter.get("/campsites", authMiddleware, adminOnly, getCampsites);
adminCampsiteRouter.post("/add-campsite", authMiddleware, adminOnly, addCampsite);
adminCampsiteRouter.put("/update-campsite/:id", authMiddleware, adminOnly, updateCampsite);
adminCampsiteRouter.delete("/delete-campsite/:id", authMiddleware, adminOnly, deleteCampsite);

export default adminCampsiteRouter;