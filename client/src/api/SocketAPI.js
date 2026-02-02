import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001");

async function createRoomAPI() {
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

function onRoomUpdateAPI(callback) {
    const handler = (data) => callback(data);
    socket.on('room:update', handler);
}

async function joinRoomAPI(roomId) {
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
async function leaveRoomAPI(roomId) {
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

export { socket, createRoomAPI, joinRoomAPI, leaveRoomAPI, onRoomUpdateAPI }