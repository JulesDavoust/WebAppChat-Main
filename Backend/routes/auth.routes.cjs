const controller = require("../controllers/auth.controller.cjs");

// Routes de connexion et inscription
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.post("/api/signin", controller.signin);
  app.post("/api/register", controller.register);
};