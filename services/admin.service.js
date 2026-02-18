import User from "../models/user-model.js";
import Contact from "../models/contact-model.js";

export const fetchAllUsers = async () => {
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) throw { status: 404, message: "No User Found!" };
    return users;
};

export const fetchUserById = async (id) => {
    const user = await User.findById(id, { password: 0 });
    if (!user) throw { status: 404, message: "User not found" };
    return user;
};

export const updateUser = async (id, updatedData) => {
    const result = await User.updateOne({ _id: id }, { $set: updatedData });
    return result;
};

export const deleteUser = async (id) => {
    await User.deleteOne({ _id: id });
    return true;
};

export const fetchAllContacts = async () => {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) throw { status: 404, message: "No Contact Found!" };
    return contacts;
};
