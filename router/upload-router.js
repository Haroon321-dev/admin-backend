import express from "express";
const router = express.Router();

import upload from "../middlewares/upload-middleware.js";
import fileController from "../controller/upload-controller.js";

router.route("/").post(upload.single("myFile"), fileController);

export default router;
