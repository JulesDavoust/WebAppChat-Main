const db = require("../models/index.cjs");
const User = db.Users;
const Users = db.users;

// Controller gerant toutes les opération necessitant un utilisateur (follow, envoyé un message, etc...)
exports.getCurrentUser = (req, res) => {
  User.findOne({ where: { idUser: req.idUser }, attributes: { exclude: ['passwordUser', 'idUser'] } })
    .then(response => {
      if (response) {
        res.json(response);
      } else {
        res.status(404).send({ message: "User not found" });
      }
    })
    .catch(err => res.status(500).send({ message: "An error ocurred when try to retrive current user" }));
}

exports.editUserInfos = (req, res) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  const imageRegex = /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp)$/i;
  if ((!req.body.emailUser || emailRegex.test(req.body.emailUser)) && 
      (!req.body.ppUser || imageRegex.test(req.body.ppUser))) {
    User.update(req.body, { where: { idUser: req.idUser } })
      .then((result) => {
        if (result) {
          if (result[0] != 0) {
            res.send({ message: "User updated" });
          } else {
            res.send({ message: "Value unchanged" });
          }
        } else {
          res.status(404).send({ message: "User not found" });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "An error occured when updating user" });
      });
  } else {
    res.status(500).send({ message: "Not valid format" });
  }
}

exports.editPassword = (req, res) => {
  User.findOne({ where: { idUser: req.idUser }, attributes: ['passwordUser'] })
    .then(response => {
      if (response.passwordUser !== req.body.oldPassword) {
        res.status(500).send({ message: "Wrong password" });
      } else if (req.body.passwordUser !== req.body.confirmPassword) {
        res.status(500).send({ message: "The confirm password must be the same than the new one" });
      } else {
        User.update({ passwordUser: req.body.passwordUser }, { where: { idUser: req.idUser } })
          .then((result) => {
            if (result[0] != 0) {
              res.send({ message: "Password updated" });
            } else {
              res.send({ message: "Value unchanged" });
            }
          })
      }
    })
    .catch(err => res.status(500).send({ message: "An error occured when updating user's pasword" }));
}

exports.getPseudoById = async (req, res) =>{
    const idUser = req.idUser
    const pseudo = await Users.findOne({attributes: ['username'], where : {idUser : idUser}})
    console.log(pseudo)
    res.status(200).json(pseudo)
}

exports.IsAdmin = async (req, res) => {
    const idUser = req.idUser
    console.log("IsAdmin ?")
    const admin = await Users.findOne({attributes: ['isAdmin'], where : {idUser : idUser}})
    console.log("admin : ",admin)
    res.status(200).json(admin)
}