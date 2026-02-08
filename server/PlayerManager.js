import { Player } from "./Player.js";
import * as RoomManager from "./RoomManager.js"

export let players = {};


export function AddPlayer(socketId, playerSocket) {
    players[socketId] = {player: new Player(socketId), playerSocket: playerSocket};
}

export function RemovePlayer(socketId) {
    if (!(socketId in players)) {
        throw new Error('Player does not exist');
    }

    const currentRoom = players[socketId].player.currentRoomId;
    if (currentRoom) {
        RoomManager.rooms[currentRoom].leave(players[socketId].player);
    }

    delete players[socketId];
}

export function GetPlayer(socketId) {
    return players[socketId].player;
}

export function GetPlayerSocket(socketId) {
    return players[socketId].playerSocket;
}