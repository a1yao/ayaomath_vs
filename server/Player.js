export class Player {
    constructor(socketId) {
        this.socketId = socketId;
        this.currentRoomId = undefined;
        this.name = undefined;
    }
}