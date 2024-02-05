const controller = require("../controllers/intern.controller.cjs");

// Routes relative au site ne nécessitant pas un utilisateur connecté (recherches)

module.exports = function(app) {
  app.get("/api/games", controller.getAllGames);
  app.get("/api/plateforms", controller.getAllPlatefoms);
  app.get('/api/intern/getOneGame/:id', controller.getOneGame)
  app.get('/api/intern/searchGame/:params', controller.SearchGame)
  app.get('/api/intern/allPlatformsGame', controller.allPlatformsGame)
  app.get('/api/intern/allTypesGame', controller.getTypeGames)
  app.get('/api/intern/allPublishersGame', controller.getPublisherGame)
  app.get('/api/intern/allYearsGame', controller.getYearGame)
  app.get('/api/intern/getDiscussion/:id', controller.getDiscussion)
  // router.post('/room', controller.postRoom)
  // router.get('/:room', controller.getRoom)
};