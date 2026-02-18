
import { getAllServices, createService } from "../services/service.service.js";

export const services = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;

    const result = await getAllServices(page, limit);

    res.status(200).json({
      data: result.services,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addService = async (req, res) => {
  try {
    const newService = await createService(req.body);

    res.status(201).json({
      message: "Service added successfully",
      data: newService,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


