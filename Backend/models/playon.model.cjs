module.exports = (sequelize, Sequelize) => {
  const PlayOn = sequelize.define(
    "playons",
    {
      idGame: {
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      namePlateform: {
        primaryKey: true,
        type: Sequelize.STRING,
      }
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  return PlayOn;
};
