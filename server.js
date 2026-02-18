import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "./swagger/swagger.js"
import router from "./router/router.js";
import contactRouter from "./router/contact-router.js";
import serviceRouter from "./router/service-router.js";
import uploadRouter from "./router/upload-router.js";
import adminRouter from "./router/admin-router.js";
import connectDb from "./utils/db.js";
import errorMiddleware from "./middlewares/error-middleware.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cookieParser());
app.use("/api/route", router);
app.use("/api/form", contactRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/data", serviceRouter);
app.use("/api/admin", adminRouter);
app.use(errorMiddleware);

const PORT = 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
});

