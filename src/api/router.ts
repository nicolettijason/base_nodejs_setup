import { Router } from "express";
import { userRouter } from "./controllers/user.controller";
import { categoryRouter } from "./controllers/category.controller";

const router = Router();
router.use("/users", userRouter);
router.use("/categories", categoryRouter);

export default router;
