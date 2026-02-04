export class Room {
    constructor(roomId, roomSocket) {
        this.roomId = roomId;
        this.roomSocket = roomSocket;
        this.players = {};
    }

    // TODO: Refactor so that player cap logic is placed in BLL under RoomManager? Same with socket emitting?
    join(player) {
        if (player.socketId in this.players) {
            console.log("[ERROR] Player is already in this room");
            throw Error("Player is already in this room");
        }
        if (Object.keys(this.players).length < 2) {
            player.currentRoomId = this.roomId;
            this.players[player.socketId] = player;
            console.log("[room:updated] Emitting to socket: ", this.players);
            this.roomSocket.emit("room:update", this.players);
            
        } 
        else {
            console.log("[ERROR] Room is full")
            throw Error("Room is full");
        }

        
    }

    leave(player) {
        if (!(player.socketId in this.players)) {
            throw Error("Player is not in this room");
        }

        delete this.players[player.socketId];

        player.currentRoomId = undefined;
        
        this.roomSocket.emit("room:update", this.players);

    }

    setReady(player, isReady) {
        if (!(player.socketId in this.players)) {
            throw Error("Player is not in this room");
        }

        this.players[player.socketId].isReady = isReady;
        console.log(this.players);
        this.roomSocket.emit("room:update", this.players);
    }


}