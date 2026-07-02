import { Router } from "express";
import * as FavoriteController from "../controllers/favorite.controller.js";

const router = Router();

router.post("/", FavoriteController.create);
router.get("/", FavoriteController.getAll);
router.delete("/:id", FavoriteController.remove);

export default router;