export class Game {
    constructor(roomSocket) {
        this.roomSocket = roomSocket;
    }

    startGame() {
        this.roomSocket.emit("game:start");
    }
}