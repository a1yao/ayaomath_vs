import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001");

export async function createRoomAPI() {
    return new Promise((resolve, reject) => {
        socket.emit('room:create', (response) => {
            // TODO: error handling
            if (response.status === 'ok') {
                resolve(response.room_id);
            }
            else {
                reject(new Error(response.description || 'Failed to create room'));
            }
        })
    })
}

export function onRoomUpdateAPI(callback) {
    const handler = (data) => callback(data);
    socket.on('room:update', handler);
}

export function onCountdownTickAPI(callback) {
    const handler = (data) => callback(data);
    socket.on("room:countdown_tick", handler);
}

export function onGameUpdateAPI(callback) {
    const handler = (data) => callback(data);
    socket.on("game:state", handler);
}

export function onGamePlayerAssignmentAPI(callback) {
    const handler = (data) => callback(data);
    socket.on("game:player_numbers", handler);
}

export function onGameStartAPI(callback) {
    const handler = () => callback();
    socket.on("game:start", handler);
}

export function onGameLeaveAPI(callback) {
    const handler = () => callback();
    socket.on("game:leave", handler);
}

export function onGameVictoryAPI(callback) {
    const handler = (data) => callback(data);
    socket.on("game:victory", handler);
}

export function rejoinRoomAPI(roomId) {
    socket.emit("room:rejoin", roomId);
}

export function checkAnswer(roomId, answer) {
    socket.emit("game:check", roomId, answer);
}

export function joinGameAPI(roomId) {
    socket.emit('game:join', roomId);
}

export async function joinRoomAPI(roomId) {
    return new Promise((resolve, reject) => {
        socket.emit('room:join', roomId, (response) => {
            if (response.status === 'ok') {
                resolve();
            }
            else {
                reject(new Error(response.description || 'Failed to join room'));
            }
        })
    })
}

// TODO: Should this still be structured like this? I left it like this because I wanted to mirror the joinRoomAPI. 
export async function leaveRoomAPI(roomId) {
    return new Promise((resolve, reject) => {
        socket.emit('room:leave', roomId, (response) => {
            if (response.status == 'ok') {
                resolve();
            }
            else {
                reject(new Error(response.description || 'Failed to leave room'));
            }
        })
    })
}

export function setReadyAPI(roomId, isReady) {
    socket.emit('room:ready', roomId, isReady);
}