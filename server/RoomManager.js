import { Room } from "./Room.js"

export let rooms = {};

export function createRoom(roomId, roomSocket) {
    rooms[roomId] = new Room(roomId, roomSocket);
    console.log(`[room:create] Created room ${roomId}`)
}

export function joinRoom(roomId, player) {
    if (roomId in rooms) {
        rooms[roomId].join(player);
    }
    else {
        console.log("[ERROR] Cannot join room. Room does not exist")
        throw new Error('Cannot join room. Room does not exist');
    }
}

export function leaveRoom(roomId, player) {
    if (roomId in rooms) {
        rooms[roomId].leave(player);
    }
    else {
        console.log("[ERROR] Cannot leave room. Room does not exist")
        throw new Error('Cannot leave room. Room does not exist');
    }
}

export function setReady(roomId, player, isReady) {
    if (roomId in rooms) {
        rooms[roomId].setReady(player, isReady);
    }
    else {
        throw new Error('Cannot set player ready, room does not exist');
    }
}