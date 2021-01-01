const express = require("express");
const http = require("http");
const redis = require("./redis");

const redisClient = new redis(3);

const port = 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

socketIo.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("configuration", (configs) => {
        handleRedis(configs);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

function handleRedis(jsonObject) {
    for(let key in jsonObject) {
        redisClient.updateRedis(key, jsonObject[key]);
    }
}

server.listen(port, () => console.log(`Listening on port ${port}`));