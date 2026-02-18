import Contact from "../models/contact-model.js";

export const createContactMessage = async (contactData) => {
  if (!contactData.email || !contactData.message) {
    const error = new Error("REQUIRED_FIELDS_MISSING");
    error.statusCode = 400;
    throw error;
  }

  return await Contact.create(contactData);
};
