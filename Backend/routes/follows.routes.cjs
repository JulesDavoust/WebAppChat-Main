const controller = require("../controllers/follows.controller.cjs");
const {verifyToken} = require('../middleware/authJwt.cjs')

// Routes de connexion et inscription
module.exports = function(app) {
    const router = require('express').Router()
    // app.get("...", controller....);
    router.get("/getAllDiscussions",
              verifyToken,
              controller.getAllDiscussions);
    router.get("/verifFollow",
              verifyToken,
              controller.verifFollow);
    router.post("/follow", 
                verifyToken, 
                controller.addFollow)
    router.delete("/unfollow", 
                verifyToken, 
                controller.unFollow)

    app.use('/api/follows', router)
  };