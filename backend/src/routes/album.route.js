import Router from "express";
import { getAlbumById, getAllAlbums } from "../controllers/album.middlerware.js";

const router = Router();

router.route("/").get(getAllAlbums);
router.route("/:albumId").get(getAlbumById);


export default router;