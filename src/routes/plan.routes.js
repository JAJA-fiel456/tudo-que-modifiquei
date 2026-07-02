import { Router } from "express";
import * as planController from "../controllers/plan.controller.js";

const router = Router();

router.get("/", planController.getAll);
router.get("/:id", planController.getById);
router.post("/", planController.create);
router.put("/:id", planController.update);
router.delete("/:id", planController.remove);

export default router;
