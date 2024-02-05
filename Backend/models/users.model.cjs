module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define(
      "users",
      {
        idUser: {
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        username: {
          type: Sequelize.STRING,
        },
        isAdmin: {
          type: Sequelize.TINYINT,
        },
        emailUser: {
          type: Sequelize.STRING,
        },
        passwordUser: {
          type: Sequelize.STRING,
        },
        ppUser: {
            type: Sequelize.STRING
        }
      },
      {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
      }
    );
    return Users;
  };
  