import {
    fetchAllUsers,
    fetchUserById,
    updateUser,
    deleteUser,
    fetchAllContacts,
} from "../services/admin.service.js";

const getAllUsers = async (req, res, next) => {
    try {
        const users = await fetchAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await fetchUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const updateUserById = async (req, res, next) => {
    try {
        const result = await updateUser(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        await deleteUser(req.params.id);
        res.status(200).json({ message: "User Deleted Successfully!" });
    } catch (error) {
        next(error);
    }
};

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await fetchAllContacts();
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

export {
    getAllUsers,
    getAllContacts,
    deleteUserById,
    getUserById,
    updateUserById,
};
