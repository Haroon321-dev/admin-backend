import Service from "../models/service-model.js";

export const getAllServices = async (page = 1, limit = 4) => {
  const skip = (page - 1) * limit;

  const services = await Service.find()
    .skip(skip)
    .limit(limit);

  const totalServices = await Service.countDocuments();

  return {
    services,
    totalServices,
    totalPages: Math.ceil(totalServices / limit),
    currentPage: page,
  };
};

export const createService = async (data) => {
  return await Service.create(data);
};


