const db = require("../models/index.cjs");
const Game = db.Games;
const User = db.Users;
const PlayOn = db.PlayOn;
const Plateform = db.Plateforms;

// Controller gérant toutes les opération que peuvent faire les administrateurs
exports.addNewGame = (req, res) => {
  if (!(req.isAdmin == 1)) {
    res.status(500).send({ message: "Unauthorized" });
  } else {
    Game.create(req.body)
      .then((result) => {
        for (let i = 0; i < req.body.plateforms.length; i++) {
          const newPlayOnData = {
            idGame: result.idGame,
            namePlateform: req.body.plateforms[i]
          }
          PlayOn.create(newPlayOnData)
            .catch(err => res.status(500).send({ message: "Error while associating plateform(s) with game !" }));
        }

        res.send({ message: "New book created" });
      })
      .catch((err) => {
        res.status(500).send({ message: "An error occured while creating new game" })
      });
  }
};

exports.getAllUsers = (req, res) => {
  if (!(req.isAdmin == 1)) {
    res.status(500).send({ message: "Unauthorized" });
  } else {
    User.findAll({ attributes: { exclude: 'passwordUser' } })
      .then(response => res.json(response))
      .catch(err => res.status(500).send({ message: "An error ocurred when try to retrive users" }));
  }
}

exports.deleteOneUser = (req, res) => {
  if (!(req.isAdmin == 1)) {
    res.status(500).send({ message: "Unauthorized" });
  } else {
    User.findOne({ where: { idUser: req.body.idUser } })
      .then(data => {
        if (!data) {
          res.send({ message: "An error occured while deleting the user" });
        } else if (data.isAdmin != 1) {
          User.destroy({ where: { idUser: req.body.idUser } })
            .then(response => res.send({ message: "User deleted" }))
            .catch(err => res.status(500).send({ message: "An error occured while deleting the user" }));
        } else {
          res.status(500).send({ message: "Unauthorized" });
        }
      })
      .catch(err => res.status(500).send({ message: "An error occured while deleting the user" }));
  }
}

exports.addNewPlateform = (req, res) => {
  if (!(req.isAdmin == 1)) {
    res.status(500).send({ message: "Unauthorized" });
  } else {
    Plateform.create(req.body)
      .then((result) => res.send({ message: "New plateform created" }))
      .catch((err) => {
        res.status(500).send({ message: "An error occured while creating new plateform" })
      });
  }
};