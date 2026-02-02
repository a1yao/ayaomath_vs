import * as RoomManager from './RoomManager.js';
import * as PlayerManager from './PlayerManager.js'
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require("express")
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})



let users = [];

io.on("connection", (socket) => {
    console.log(`[connection] User Connected: ${socket.id}`);
    PlayerManager.AddPlayer(socket.id);


    socket.once("disconnect", () => {
        console.log(`[disconnect] Disconnecting socket: ${socket.id}`);
        PlayerManager.RemovePlayer(socket.id);
    })

    socket.on("room:join", (roomId, callback) => {
        console.log(`[room:join] Joining room ${roomId}`);
        
        try {
            socket.join(roomId);
            RoomManager.joinRoom(roomId, PlayerManager.players[socket.id]);

            callback({ status: "ok"});
        }
        catch (error) {
            callback({ status: "error", description: error.message});
        }
    })

    socket.on("room:leave", (roomId, callback) => {
        console.log(`[room:leave] Leaving room ${roomId}`);
        try {
            RoomManager.leaveRoom(roomId, PlayerManager.players[socket.id]);
            socket.leave(roomId);
            callback({status: "ok"});
        }
        catch (error) {
            console.log(error.message);
            callback({ status: "error", description: error.message});
        }
        
    })

    socket.on("room:create", (callback) => {
        const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
        RoomManager.createRoom(roomId, io.to(roomId));
        // TODO: Will roomId ever be duplicate?
        // TODO: Handle room deletion
        callback({ status: "ok", room_id: roomId})
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
    })

    
})

server.listen(3001, () => {
    console.log("Server is listening on port: 3001");
})