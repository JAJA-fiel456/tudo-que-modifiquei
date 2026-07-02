import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth.js";
import * as medicineController from "../controllers/medicine.controller.js";

const router = Router();

router.get("/", medicineController.getAll);
router.get("/search/:termo", medicineController.search);
router.get("/code/:codigo", medicineController.getByCode);
router.get("/most-searched", medicineController.mostSearched);
router.get("/:id", medicineController.getById);

router.post("/", requireAuth, medicineController.create);
router.put("/:id", requireAuth, medicineController.update);
router.delete("/:id", requireAuth, medicineController.remove);

export default router;