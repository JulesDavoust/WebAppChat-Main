const db = require("../models/index.cjs");

// Controller gerant toutes les opération necessitant un utilisateur (follow, envoyé un message, etc...)

const Follows = db.follows
const Game = db.games
const Discussions = db.discussions

//get all discussions

const unFollow = async (req ,res)=>{
    const userId = req.idUser; // l'ID de l'utilisateur qui va suivre
    const idGame = req.body.idGame; // l'ID de la discussion que l'utilisateur souhaite suivre
    console.log(idGame)
    try {
        
        
        let discussionsLet = await Discussions.findOne({ attributes:['idDiscussion'],
            where: {idGame : idGame}
        })

        // Vérifie si le suivi existe déjà
        const existingFollow = await Follows.findOne({
            where: {
                idUser: userId,
                idDiscussion: discussionsLet.idDiscussion
            }
        });
        console.log(discussionsLet.idGame)
        if (!existingFollow) {
            return res.status(409).json({ message: "L'utilisateur ne suit déjà pas cette discussion." });
        }

        // Crée un nouveau suivi
        const newUnFollow = await Follows.destroy({
            where:{idDiscussion:discussionsLet.idDiscussion}
        });

        return res.status(201).json(newUnFollow);
    } catch (error) {
        console.error('Erreur lors de l\'ajout d\'un suivi : ', error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
}

const addFollow = async (req, res) => {
    const userId = req.idUser; // l'ID de l'utilisateur qui va suivre
    const idGame = req.body.idGame; // l'ID de la discussion que l'utilisateur souhaite suivre
    console.log(idGame)
    try {
        
        
        let discussionsLet = await Discussions.findOne({ attributes:['idDiscussion'],
            where: {idGame : idGame}
        })

        // Vérifie si le suivi existe déjà
        const existingFollow = await Follows.findOne({
            where: {
                idUser: userId,
                idDiscussion: discussionsLet.idDiscussion
            }
        });
        console.log(discussionsLet.idDiscussion)
        if (existingFollow) {
            return res.status(409).json({ message: "L'utilisateur suit déjà cette discussion." });
        }

        // Crée un nouveau suivi
        const newFollow = await Follows.create({
            idUser: userId,
            idDiscussion: discussionsLet.idDiscussion,
            isAdmin: false
        });

        return res.status(201).json(newFollow);
    } catch (error) {
        console.error('Erreur lors de l\'ajout d\'un suivi : ', error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

const verifFollow = async (req, res)=>{
    const id = req.idUser
    console.log(id)
    let userDiscussions = await Follows.findAll({
        attributes:['idDiscussion'], 
        where: {idUser : id}
    })
    const extractedDataFollows = userDiscussions.map(follow => follow.dataValues);
    let discussionsLet = []
    for(let i = 0; i<extractedDataFollows.length; i++){
        discussionsLet.push(await Discussions.findOne({ attributes:['idGame'],
            where: {idDiscussion : extractedDataFollows[i].idDiscussion}
        }))
    }
    let extractedDataDiscussion = discussionsLet.map(discussions => discussions.dataValues)

    console.log(extractedDataDiscussion);
    let uniqueGames = {};
    let extractedDataGames = [];
    for (let game of extractedDataDiscussion) {
        let gameData = game.idGame;
        console.log(uniqueGames)
        if (!uniqueGames[game.idGame]) {
            uniqueGames[game.idGame] = true;
            extractedDataGames.push(game.idGame);
        }
    }
    console.log(extractedDataGames);
    res.json(extractedDataGames);
}

const getAllDiscussions = async(req,res) => {
    const id = req.idUser
    console.log(id)
    try{
        let userDiscussions = await Follows.findAll({
            where: {idUser : id}
        })
        const extractedDataFollows = userDiscussions.map(follow => follow.dataValues);

        try {
            let discussionsLet = []
            for(let i = 0; i<extractedDataFollows.length; i++){
                discussionsLet.push(await Discussions.findOne({
                    where: {idDiscussion : extractedDataFollows[i].idDiscussion}
                }))
            }
            const extractedDataDiscussion = discussionsLet.map(discussions => discussions.dataValues)

            try {
                let userGames = []
                for(let i = 0; i < discussionsLet.length; i++){
                    userGames.push(await Game.findOne({
                        where: {idGame : extractedDataDiscussion[i].idGame}
                    }))
                }

                let uniqueGames = {};
                let extractedDataGames = [];

                for (let game of userGames) {
                    let gameData = game.dataValues;
                    if (!uniqueGames[gameData.idGame]) {
                        uniqueGames[gameData.idGame] = true;
                        extractedDataGames.push(gameData);
                    }
                }

                const resAll = {extractedDataFollows, extractedDataDiscussion, extractedDataGames}
                console.log(resAll)
                res.json(resAll);

            } catch (error) {
                console.error('3ème catch : une erreur est survenue:', error);
                res.status(500).send("Une erreur est survenue")
            }

        } catch (error) {
            console.error('2ème catch : une erreur est survenue:', error);
            res.status(500).send("Une erreur est survenue")
        }

    }catch(error){
        console.error('Une erreur est survenue:', error);
        res.status(500).send("Une erreur est survenue")
    }
}

module.exports = {
    getAllDiscussions,
    verifFollow,
    addFollow,
    unFollow,
}