const controller = require("../controllers/user.controller.cjs");
const { verifyToken } = require("../middleware/authJwt.cjs");

// Routes necessitant un utilisateur (follow, envoyé un message, etc...)
module.exports = function (app) {
  app.get("/api/users/@me", verifyToken, controller.getCurrentUser);
  app.put("/api/users/@me", verifyToken, controller.editUserInfos);
  app.put("/api/users/@me/password", verifyToken, controller.editPassword);
  app.get('/api/users/getPseudoById', verifyToken, controller.getPseudoById)
  app.get('/api/users/admin', verifyToken, controller.IsAdmin)
  // router.post('/room', controller.postRoom)
  // router.get('/:room', controller.getRoom)
};