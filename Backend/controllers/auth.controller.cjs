const db = require("../models/index.cjs");
const config = require("../config/auth.config.cjs");
const User = db.Users;

const jwt = require("jsonwebtoken");

// Controller gerant toutes les opérations de connexion et inscription
exports.signin = (req, res) => {
    console.log(req.body);
    User.findOne({
      where: {
        emailUser: req.body.email
      }
    })
      .then(response => {
        if (!response) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = (req.body.password === response.passwordUser);
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
        var token = jwt.sign({ idUser: response.idUser, isAdmin: response.isAdmin }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
        res.status(200).send({
          idUser: response.idUser,
          emailUser: response.emailUser,
          accessToken: token
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.register = (req, res) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  const imageRegex = /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp)$/i;
  if (emailRegex.test(req.body.emailUser) && imageRegex.test(req.body.ppUser) || req.body.ppUser === "") {
    var newUser = req.body;
    newUser.isAdmin = 0;

    User.create(newUser)
      .then((result) => {
        res.json({ message: "Registered" });
      })
      .catch((err) => {
        const errorMessage = err.errors[0].message;
        if (errorMessage.includes("emailUser_UNIQUE")) {
          res.status(500).send({ message: "Email already taken" });
        } else if (errorMessage.includes("username_UNIQUE")) {
          res.status(500).send({ message: "Username already taken" });
        } else {
          res.status(500).send({
            message:
              /* err.message ||  */"Some error occurred while creating the new order.",
          });
        }
        
    });
  } else {
    res.status(500).send({ message: "Not valid format" });
  }
};