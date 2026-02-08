export class Player {
    constructor(socketId, playerSocket) {
        this.socketId = socketId;
        this.currentRoomId = undefined;
        this.name = undefined;
        this.isReady = false;
        this.playerNumber = undefined;
    }
}