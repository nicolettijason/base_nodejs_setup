import { Router } from "express";
import { userRouter } from "./controllers/user.controller";
import { categoryRouter } from "./controllers/category.controller";

const router = Router();
router.use("/categories", categoryRouter);

router.use("/users", userRouter);

export default router;
