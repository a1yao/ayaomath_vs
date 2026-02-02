import { Player } from "./Player.js";
import * as RoomManager from "./RoomManager.js"

export let players = {};


export function AddPlayer(socketId) {
    players[socketId] = new Player(socketId);
}

export function RemovePlayer(socketId) {
    if (!(socketId in players)) {
        throw new Error('Player does not exist');
    }

    const currentRoom = players[socketId].currentRoomId;
    if (currentRoom) {
        RoomManager.rooms[currentRoom].leave(players[socketId]);
    }

    delete players[socketId];
}