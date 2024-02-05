const controller = require("../controllers/admin.controller.cjs");
const { verifyToken } = require("../middleware/authJwt.cjs");

// Routes des administrateurs
module.exports = function(app) {
  app.post("/api/games", verifyToken, controller.addNewGame);
  app.get("/api/users", verifyToken, controller.getAllUsers);
  app.delete("/api/users", verifyToken, controller.deleteOneUser);
  app.post("/api/plateforms", verifyToken, controller.addNewPlateform);
};