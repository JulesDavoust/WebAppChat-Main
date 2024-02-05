module.exports = (sequelize, Sequelize) => {
  const Platforms = sequelize.define(
    "plateforms",
    {
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
  return Platforms;
};