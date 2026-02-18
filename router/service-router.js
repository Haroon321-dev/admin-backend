import express from "express";
const router = express.Router();

import { services, addService } from "../controller/service-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import adminMiddleware from "../middlewares/admin-middleware.js";

router.route("/service").get(services);
router.route("/service").post(authMiddleware, adminMiddleware, addService);

export default router;
