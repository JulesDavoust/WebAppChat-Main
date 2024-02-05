const { Op } = require('sequelize');
const db = require("../models/index.cjs");
const io = require("socket.io");
const Games = db.games
const Playons = db.playons
const Plateforms = db.plateforms
const Discussions = db.discussions
const Game = db.Games;
const Plateform = db.Plateforms;

const rooms = require('../rooms.cjs')

// Controller gérant toutes les opération relative au site ne nécessitant pas un utilisateur connecté (recherches)
const getAllGames = (req, res) => {
  let findingData = { include: { model: Plateform, through: { attributes: [] } }/* , order: [['titleGame', 'ASC']] */ }

  if (req.headers['limit']) { findingData.limit = parseInt(req.headers['limit']); }
  if (req.headers['last_game_retrived']) { findingData.where = { idGame: { [Op.gt]: parseInt(req.headers['last_game_retrived']) } }; }

  Game.findAll(findingData)
    .then(response => res.json(response))
    .catch(err => res.status(500).send({ message: "An error ocurred when try to retrive games" }));
};

const getAllPlatefoms = (req, res) => {
  Plateform.findAll()
    .then(response => res.json(response))
    .catch(err => res.status(500).send({ message: "An error ocurred when try to retrive plateforms" }));
}

// const postRoom = async (req, res) => {
//     if (rooms[req.body.room] != null) {
//         return res.redirect('/')
//     }
//     rooms[req.body.room] = { users: {} }
//     res.redirect(req.body.room)
//     // Send message that new room was created
//     io.emit('room-created', req.body.room)
// }

// const getRoom = async (req, res) => {
//     if (rooms[req.params.room] == null) {
//         return res.redirect('/')
//     }
//     res.render('room', { roomName: req.params.room })
// }

const getDiscussion = async (req, res) => {
    const idDiscussion = req.params.id
    const Discussion = await Discussions.findOne({where : {idDiscussion : idDiscussion}})
    console.log(Discussion)
    res.status(200).json(Discussion)
}

const getOneGame = async (req, res) => {
    const idGame = req.params.id
    const Game = await Games.findOne({where : {idGame : idGame}})
    console.log(Game)
    res.status(200).json(Game)
}

const SearchGame = async(req, res)=>{
    const params = req.params.params
    const paramsSearch = params.split(',')
    console.log(paramsSearch)
    const tabPlatform = []
    for(let i = 4; i < paramsSearch.length; i++){
        tabPlatform.push(paramsSearch[i])
    }
    const dicoParams = {titleGame:paramsSearch[0],typeGame:paramsSearch[1],publisherGame:paramsSearch[2],yearGame:paramsSearch[3],platform:tabPlatform}
    console.log(dicoParams)
    let conditions = []
    if(dicoParams.titleGame != '') {var titleCondition = {titleGame: {[Op.like]: `%${dicoParams.titleGame}%`}}; conditions.push(titleCondition)}
    if(dicoParams.typeGame != '') {var typeCondition = {typeGame : dicoParams.typeGame}; conditions.push(typeCondition)}
    if(dicoParams.publisherGame != '') {var publisherCondition = {publisherGame : dicoParams.publisherGame}; conditions.push(publisherCondition)}
    if(dicoParams.yearGame != '') {var yearCondition = {yearGame : dicoParams.yearGame}; conditions.push(yearCondition)}
    let where ={[Op.and]:conditions}
    if(dicoParams.platform[0] != ''){
        let AllGames = []
        const Playon = await Playons.findAll({where:{namePlateform : {[Op.or]:dicoParams.platform}}})
        const extractedDataPlayons = Playon.map(playon => playon.dataValues);
        console.log(extractedDataPlayons)
        for(let i = 0; i < extractedDataPlayons.length; i++){
            const OneGame = await Games.findOne({where:{[Op.and]:[where, {idGame : extractedDataPlayons[i].idGame}]}})
            if(OneGame != null) AllGames.push(OneGame)
        }
        const extractedDataAllGame = AllGames.map(allgame => allgame.dataValues);
        for(let i = 0; i < extractedDataAllGame.length; i++){
            const platforms = await Playons.findAll({attributes:['namePlateform'], where:{idGame : extractedDataAllGame[i].idGame}})
            console.log(platforms)
            extractedDataAllGame[i]['playon'] = platforms.map(plateform => plateform.dataValues)
        }
        console.log(extractedDataAllGame)
        console.log(AllGames.length)
        res.status(200).json(AllGames)
    }
    else if(dicoParams.titleGame == '' && dicoParams.typeGame == '' && dicoParams.publisherGame == '' && dicoParams.yearGame == ''){
        res.status(200).json([])
    }
    else{
        const Game = await Games.findAll({where})
        const extractedDataGame = Game.map(game => game.dataValues);
        for(let i = 0; i < extractedDataGame.length; i++){
            const platforms = await Playons.findAll({attributes:['namePlateform'], where:{idGame : extractedDataGame[i].idGame}})
            console.log(platforms)
            extractedDataGame[i]['playon'] = platforms.map(plateform => plateform.dataValues)
        }
        console.log(extractedDataGame)
        res.status(200).json(extractedDataGame)
    }
    
}

const allPlatformsGame = async (req,res)=>{
    const allGames = await Plateforms.findAll({})
    console.log(allGames)
    res.status(200).json(allGames)
}

const getTypeGames = async (req, res) => {
    try {
      const results = await Games.findAll({
        attributes: ['typeGame'],
        group: ['typeGame'],
      });
  
      console.log(results)
      res.status(200).json(results)
    } catch (error) {
      console.error('Erreur lors de l\'exécution de la requête :', error);
    }
}

const getPublisherGame = async (req, res) =>{
    const results = await Games.findAll({attributes:['publisherGame'], group:['publisherGame']})
    res.status(200).json(results)
}

const getYearGame = async (req, res) =>{
    const results = await Games.findAll({attributes:['yearGame'], group:['yearGame']})
    res.status(200).json(results)
}
  

module.exports = {
    getOneGame,
    SearchGame,
    allPlatformsGame,
    getTypeGames,
    getPublisherGame,
    getYearGame,
    getDiscussion,
    getAllGames,
    getAllPlatefoms
}

