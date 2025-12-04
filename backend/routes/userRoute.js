import express from "express";
import multer from "../middleware/upload.js";
import {
  registerUser,
  loginUser,
  updateUser,
  addFavoriteMovie,
  getFavoriteMovies,
  addFavoriteTVSeries,
  getFavoriteTVSeries,
  removeFavoriteMovie,
  removeFavoriteTVSeries,
} from "../controller/userController.js";

const router = express.Router();

router.post("/user/favorite/movie", addFavoriteMovie);
router.get("/user/favorite/movie/:userId", getFavoriteMovies);
router.delete("/user/favorite/movie/:userId/:videoId", removeFavoriteMovie);
router.post("/user/favorite/tv", addFavoriteTVSeries);
router.get("/user/favorite/tv/:userId", getFavoriteTVSeries);
router.delete("/user/favorite/tv/:userId/:videoId", removeFavoriteTVSeries);
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.put("/user/update/:id", multer.single("avatar"), updateUser);

export default router;
