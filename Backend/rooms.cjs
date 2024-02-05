const db = require("./models/index.cjs");
const Discussions = db.discussions

const discussionNames = async () =>{
    const discussions = await Discussions.findAll({ attributes: ['idDiscussion'] });
    const ids = discussions.map(disc => disc.dataValues.idDiscussion);
    return ids;
}

module.exports = discussionNames;