import cloudinary from "../config/cloudinary.js";
import { User, FavoriteMovie, FavoriteTVSeries } from "../models/indexModel.js";
import dotenv from "dotenv";

dotenv.config();

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await User.findAll();

    // Validation
    if (users.find((user) => user.username === username)) {
      res.status(401).json({ message: "Username sudah terdaftar" });
    } else {
      const response = await User.create({ username, password });
      res.status(200).json({
        message: "Register berhasil",
        data: {
          id: response.id,
          username: response.username,
        },
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username, password } });

    // Validation
    if (!user) res.status(401).json({ message: "Username tidak terdaftar" });
    if (user.password !== password)
      res.status(401).json({ message: "Kata sandi salah" });

    res.status(200).json({
      message: "Login berhasil",
      data: {
        id: user.id,
        avatar: user.avatar,
        username: user.username,
        password: user.password,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(401).json({ message: "User tidak ditemukan" });

    let newAvatar = user.avatar;

    if (req.file) {
      // Hapus avatar lama dari Cloudinary, jika ada
      if (user.avatar !== null) {
        try {
          const publicId = user.avatar.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.log("Gagal menghapus avatar lama:", error);
        }
      }

      // Upload avatar baru ke Cloudinary
      await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "avatars" },
          (error, result) => {
            if (error) reject(error);

            newAvatar = result.secure_url;
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
    }

    await user.update({
      username: req.body.username,
      password: req.body.password,
      avatar: newAvatar,
    });

    return res.status(200).json({
      message: "User berhasil diperbarui",
      data: {
        id: user.id,
        username: user.username,
        password: user.password,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const addFavoriteMovie = async (req, res) => {
  try {
    const { userId, videoId } = req.body;

    const exist = await FavoriteMovie.findOne({
      where: { userId, videoId },
    });

    if (exist) {
      return res
        .status(401)
        .json({ message: "Video ini sudah ada di daftar favorite kamu" });
    }

    const favoriteMovie = await FavoriteMovie.create({ userId, videoId });
    res.status(200).json({
      message: "Favorite berhasil ditambahkan",
      data: favoriteMovie,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getFavoriteMovies = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(401).json({ message: "User tidak ditemukan" });

    const favoriteMovies = await FavoriteMovie.findAll({
      where: { userId: req.params.userId },
    });

    // fetch details for each favorite movie
    const result = await Promise.all(
      favoriteMovies.map(async ({ videoId }) => {
        const url = `https://api.themoviedb.org/3/movie/${videoId}`;

        const res = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
          },
        });

        const data = await res.json();

        return data;
      })
    );

    res.status(200).json({
      message: "Berhasil mendapatkan daftar favorite",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const addFavoriteTVSeries = async (req, res) => {
  try {
    const { userId, videoId } = req.body;

    const exist = await FavoriteTVSeries.findOne({
      where: { userId, videoId },
    });

    if (exist) {
      return res
        .status(401)
        .json({ message: "Video ini sudah ada di daftar favorite kamu" });
    }

    const favoriteTVSeries = await FavoriteTVSeries.create({ userId, videoId });
    res.status(200).json({
      message: "Favorite berhasil ditambahkan",
      data: favoriteTVSeries,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getFavoriteTVSeries = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(401).json({ message: "User tidak ditemukan" });

    const favoriteTVSeries = await FavoriteTVSeries.findAll({
      where: { userId: req.params.userId },
    });

    // fetch details for each favorite tv series
    const result = await Promise.all(
      favoriteTVSeries.map(async ({ videoId }) => {
        const url = `https://api.themoviedb.org/3/tv/${videoId}`;

        const res = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
          },
        });

        const data = await res.json();

        return data;
      })
    );

    res.status(200).json({
      message: "Berhasil mendapatkan daftar favorite",
      data: result,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const removeFavoriteMovie = async (req, res) => {
  try {
    const { userId, videoId } = req.params;

    const favoriteMovie = await FavoriteMovie.destroy({
      where: { userId, videoId },
    });

    res
      .status(200)
      .json({ message: "Favorite berhasil dihapus", data: favoriteMovie });
  } catch (err) {
    res.status(500).json(err);
  }
};

const removeFavoriteTVSeries = async (req, res) => {
  try {
    const { userId, videoId } = req.params;

    const favoriteTVSeries = await FavoriteTVSeries.destroy({
      where: { userId, videoId },
    });

    res
      .status(200)
      .json({ message: "Favorite berhasil dihapus", data: favoriteTVSeries });
  } catch (err) {
    res.status(500).json(err);
  }
};

export {
  registerUser,
  loginUser,
  updateUser,
  addFavoriteMovie,
  getFavoriteMovies,
  addFavoriteTVSeries,
  getFavoriteTVSeries,
  removeFavoriteMovie,
  removeFavoriteTVSeries,
};
