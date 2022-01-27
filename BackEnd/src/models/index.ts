import fs from "fs";
import path from "path";
import { DataTypes, Options, Sequelize } from "sequelize";
import config from "../../config/database";

const sequelize = new Sequelize(config as Options);

const db = {
  sequelize,
  Sequelize,
};

// fs.readdirSync(__dirname)
//   .filter(
//     (file) =>
//       file.indexOf(".") !== 0 &&
//       file !== path.basename(__filename) &&
//       file.slice(-3) === ".ts"
//   )
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(sequelize, DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

export { db };
