import User from "./userModel.js";
import FavoriteMovie from "./favoriteMovieModel.js";
import FavoriteTVSeries from "./favoriteTVSeriesModel.js";
import Subscription from "./SubscriptionModel.js";
import db from "../config/database.js";

User.hasMany(FavoriteMovie, { foreignKey: "userId" });
FavoriteMovie.belongsTo(User, { foreignKey: "userId" });

User.hasMany(FavoriteTVSeries, { foreignKey: "userId" });
FavoriteTVSeries.belongsTo(User, { foreignKey: "userId" });

Subscription.hasMany(User, { foreignKey: "subscriptionId" });
User.belongsTo(Subscription, { foreignKey: "subscriptionId" });

(async () => {
  await db.sync({ alter: true });
})();

export { User, FavoriteMovie, FavoriteTVSeries, Subscription };
