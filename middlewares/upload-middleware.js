import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ 
    storage,
    limits: {
        fileSize: 1 * 1024 * 1024, // 1 MB
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const mime = file.mimetype;
        if (ext === ".png" && mime === "image/png") {
            cb(null, true);
        } else {
            cb(new Error("Only .png files are allowed!"));
        }
    },
});

export default upload;
