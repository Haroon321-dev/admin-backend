import { createContactMessage } from "../services/contact.service.js";

const contactForm = async (req, res, next) => {
  try {
    await createContactMessage(req.body);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });

  } catch (error) {
    next(error); // central error handler
  }
};

export default contactForm;
