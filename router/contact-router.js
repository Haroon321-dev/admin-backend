import express from "express";
const contactRouter = express.Router();

import contactForm from "../controller/contact-controller.js";

contactRouter.route("/contact").post(contactForm);

export default contactRouter;
