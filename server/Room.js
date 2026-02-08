import { Game } from "./Game.js";

export class Room {
    constructor(roomId, roomSocket) {
        this.roomId = roomId;
        this.roomSocket = roomSocket;
        this.players = {};
        this.game = undefined;

        this.countdownInterval = undefined;
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

    isAllReady() {
        for (const key in this.players) {
            if (!this.players[key].isReady) {
                return false;
            }
        }
        return true;
    }


    

    getPlayerCount() {
        return Object.keys(this.players).length;
    }

    startCountdown(countdownLength) {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
        }

        this.countdownInterval = setInterval(() => {
            countdownLength--;

            // TODO: Add verfication that players are still ready?

            if (countdownLength > 0) {
                // Emit countdown tick
                console.log(`Room ${this.roomId} countdown: ${countdownLength}`);
                this.roomSocket.emit('room:countdown_tick', countdownLength);
            } 
            else {
                // Countdown finished - start the game!
                console.log(`Game starting for room ${this.roomId}`);
                
                clearInterval(this.countdownInterval);
                this.countdownInterval = null;
                

                Object.values(this.players).forEach(u => {
                    if (u) u.isReady = false;
                  });
                this.roomSocket.emit("room:update", this.players);

                // TODO: Create and start game
                this.game = new Game(this.roomSocket, this.players);
                this.game.startGame();

                

            }
        }, 1000);
    }


}