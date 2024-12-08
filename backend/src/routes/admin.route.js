import Router from "express";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";
import {
    checkAdmin,
    createAlbum,
    createSong,
    deleteAlbum,
    deleteSong,
} from "../controllers/admin.controller.js";

const router = Router();
router.use(protectRoute, requireAdmin);


router.route("/check").get(checkAdmin);

router.route("/songs").get( createSong);
router.route("/delete/:id").delete(deleteSong);
router.route("/albums").post(createAlbum);
router.route("/delete/:id").delete(deleteAlbum);

export default router;
