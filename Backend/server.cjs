const getDiscussionNames = require('./rooms.cjs')
const express = require("express");
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

var corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Sequelize init
const db = require("./models/index.cjs");
db.sequelize.sync();

//serialize
app.get("/", (req, res) => {
  res.json({ message: "API connected." });
});

require("./routes/auth.routes.cjs")(app);
require("./routes/intern.routes.cjs")(app);
require("./routes/user.routes.cjs")(app);
require("./routes/admin.routes.cjs")(app);
require("./routes/follows.routes.cjs")(app);

const io = socketIo(server, {
  cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
  }
});

let discussionNames = []
fetchDiscussionNames()
console.log(discussionNames)

io.on('connection', (socket) => {
  // Lorsque l'utilisateur rejoint une discussion
  socket.on('joinDiscussion', (discussionName) => {
    const discussionId = parseInt(discussionName, 10);
    console.log(discussionName)
    console.log(discussionNames)
    console.log(discussionNames.includes(discussionId))
      if (discussionNames.includes(discussionId)) {
        console.log("joined : ", discussionId)
        socket.join(discussionId);
      }
  });

  // Lorsqu'un message est envoyé dans une discussion
  socket.on('sendMessage', (data) => {
    console.log('sendMessage');
      const {pseudo, discussionName, message } = data;
      const discussionId = parseInt(discussionName, 10);
      if (discussionNames.includes(discussionId)) {
        console.log(pseudo);
        io.to(discussionId).emit('newMessage', {pseudo, message});
      }
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


async function fetchDiscussionNames() {
  discussionNames = await getDiscussionNames();
  console.log(discussionNames);
}