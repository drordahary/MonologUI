const express = require("express");
const http = require("http");
const redis = require("./redis");
const validation = require("./validate");
const service = require("./service");

const validate = new validation();
const redisClientTX = new redis(2);
const redisClientRX = new redis(3);
const serviceHandler = new service();

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
        errors = validate.validateConfigs(configs);
        if (Object.keys(errors).length === 0) {
            handleRedis(configs);
        } else {
            socket.emit("errors", errors);
        }
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });

    socket.on("startService", (option) => {
        serviceHandler.setOption(option);
        serviceHandler.startService();
    });

    socket.on("stopService", (option) => {
        serviceHandler.setOption(option);
        serviceHandler.stopService();
    })
});

function handleRedis(jsonObject) {
    let isList = false;
    for (let key in jsonObject) {
        isList = (isArray(jsonObject[key])) ? true : false;
        redisClientTX.updateRedis(key, jsonObject[key], isList);
        redisClientRX.updateRedis(key, jsonObject[key], isList);
    }
}

function isArray(currentObject) {
    return Object.prototype.toString.call(currentObject) === '[object Array]';
}

server.listen(port, () => console.log(`Listening on port ${port}`));