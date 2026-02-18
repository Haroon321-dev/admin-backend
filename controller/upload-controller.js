import multer from "multer";
import path from "path";

const fileController = async (req, res) => {
    try {
        if (!req.file) {     
            return res.status(400).json({ message: "No file uploaded!" });
        }

        return res.status(200).json({
            message: "File uploaded successfully!",
            file: req.file.filename,    
        });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ message: error.message });
    }
};

export default fileController;
