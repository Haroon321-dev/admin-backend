import express from "express";
const router = express.Router();

import * as adminController from "../controller/admin-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import adminMiddleware from "../middlewares/admin-middleware.js";

router.route("/users")
  .get(authMiddleware, adminMiddleware, adminController.getAllUsers);

router.route("/contacts")
  .get(authMiddleware, adminMiddleware, adminController.getAllContacts);

router.route("/users/:id")
  .get(authMiddleware, adminMiddleware, adminController.getUserById);

router.route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateUserById);

router.route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteUserById);

export default router;
