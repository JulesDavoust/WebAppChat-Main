const dbConfig = require("../config/db.config.cjs");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: '0',

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("./users.model.cjs")(sequelize, Sequelize);
db.Games = require("./games.model.cjs")(sequelize, Sequelize);
db.Plateforms = require("./platforms.model.cjs")(sequelize, Sequelize);
db.PlayOn = require("./playon.model.cjs")(sequelize, Sequelize);
db.follows = require('./follows.model.cjs')(sequelize, Sequelize)
db.games = require('./games.model.cjs')(sequelize, Sequelize)
db.discussions = require('./discussions.model.cjs')(sequelize, Sequelize)
db.playons = require('./playons.model.cjs')(sequelize, Sequelize)
db.plateforms = require('./plateforms.model.cjs')(sequelize, Sequelize)
db.users = require('./users.model.cjs')(sequelize, Sequelize)

db.Games.belongsToMany(db.Plateforms, { through: db.PlayOn, foreignKey: 'idGame' });
db.Plateforms.belongsToMany(db.Games, { through: db.PlayOn, foreignKey: 'namePlateform' });

module.exports = db;