import { Router } from "express";
import { userRouter } from "./controllers/user.controller";

const router = Router();
router.use("/users", userRouter);

export default router;
