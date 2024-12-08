import Router from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { checkAdmin } from "../controllers/admin.controller.js";
import { getAllSongs, getFeaturedSongs, getMadeForYou, getTrendingSongs } from "../controllers/song.controller.js";

const router = Router();

router.route('/').get(protectRoute, checkAdmin, getAllSongs);
router.route('/featured').get(getFeaturedSongs);
router.route("/made-for-you").get(getMadeForYou);
router.route("/trending").get(getTrendingSongs);
export default router;