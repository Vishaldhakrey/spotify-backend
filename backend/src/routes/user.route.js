import Router from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getAllUsers, getMessages } from "../controllers/user.controller.js";

const router = Router();

router.route('/').get(protectRoute, getAllUsers);
router.route('/messages/:userId', protectRoute, getMessages);

export default router;