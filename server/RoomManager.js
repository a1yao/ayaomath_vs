import { Room } from "./Room.js"

export let rooms = {};

let COUNTDOWN_LENGTH = 3;

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
    if (!(roomId in rooms)) {
        throw new Error('Cannot set player ready, room does not exist');
    }
        
    rooms[roomId].setReady(player, isReady);

    if (rooms[roomId].getPlayerCount() == 2 && rooms[roomId].isAllReady()) {
        rooms[roomId].startCountdown(COUNTDOWN_LENGTH);
    }
}

export function initGame(roomId) {
    if (!(roomId in rooms)) {
        throw new Error('Cannot initialize game, room does not exist');
    }

    rooms[roomId].game.assignPlayerNumbers();


    rooms[roomId].game.generateNewQuestion();
    console.log("Emitting game state for room: ", roomId);
    rooms[roomId].game.emitGameState();
}

export function checkAnswer(roomId, player, answer) {
    if (!(roomId in rooms)) {
        throw new Error('Cannot initialize game, room does not exist');
    }
    var game = rooms[roomId].game;
    console.log("[game:check] Checking answer: ", game.currentAnswer, answer)
    if (game.currentAnswer === Number(answer)) {

        // TODO: Point system
        if (player.playerNumber === 1) {
            game.gameState.score -= 1;
        }
        else {
            game.gameState.score += 1;
        }
        console.log("[game:check] Correct! Generating new quesiton and emitting game state");
        game.generateNewQuestion();
        game.emitGameState();
    }
}