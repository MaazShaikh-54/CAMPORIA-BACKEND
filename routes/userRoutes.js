import express from "express";
import {
    userProfile,
    editUserProfile,
    deleteUserProfile
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/profile", userProfile);
userRouter.put("/edit-profile", editUserProfile);
userRouter.delete("/delete-profile", deleteUserProfile);

export default userRouter;