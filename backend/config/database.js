import { Sequelize } from "sequelize";

const db = new Sequelize("chill_movie_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
            
export default db;
