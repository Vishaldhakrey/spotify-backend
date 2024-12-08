import Router from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getStats } from "../controllers/stats.controller.js";

const router = Router();

router.route('/stats').get(protectRoute, getStats);

export default router;