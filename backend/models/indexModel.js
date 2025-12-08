import User from "./userModel.js";
import FavoriteMovie from "./favoriteMovieModel.js";
import FavoriteTVSeries from "./favoriteTVSeriesModel.js";
import db from "../config/database.js";

User.hasMany(FavoriteMovie, { foreignKey: "userId" });
FavoriteMovie.belongsTo(User, { foreignKey: "userId" });

User.hasMany(FavoriteTVSeries, { foreignKey: "userId" });
FavoriteTVSeries.belongsTo(User, { foreignKey: "userId" });

(async () => {
  await db.sync({ alter: true });
})();

export { User, FavoriteMovie, FavoriteTVSeries };
