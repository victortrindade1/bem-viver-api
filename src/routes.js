import { Router } from "express";
import multer from "multer";

import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import FileController from "./app/controllers/FileController";
import IsAdminController from "./app/controllers/IsAdminController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

const upload = multer(multerConfig);

routes.get("/", (req, res) => res.json({ message: "hello world!" }));

routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);

routes.post("/users", UserController.store);
routes.put("/users", UserController.update);

routes.get("/admins", IsAdminController.index);

routes.post("/files", upload.single("file"), FileController.store);

export default routes;
