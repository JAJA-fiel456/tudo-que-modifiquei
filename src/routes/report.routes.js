import { Router } from "express";
import * as ReportController from "../controllers/report.controller.js";

const router = Router();

router.post("/", ReportController.create);
router.get("/", ReportController.getAll);
router.get("/:id", ReportController.getById);
router.delete("/:id", ReportController.remove);

export default router;