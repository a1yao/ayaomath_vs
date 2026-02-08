import * as PlayerManager from './PlayerManager.js'

let VICTORY_SCORE = 5;

export class Game {
    constructor(roomSocket, players) {
        this.roomSocket = roomSocket;
        this.gameState = { score: 0 };
        this.currentAnswer = undefined;
        this.players = players;
    }

    generateNewQuestion() {
        // Define operation types
        const operations = ['+', '-', '*', '/'];
        
        // Randomly select an operation
        const operation = operations[Math.floor(Math.random() * operations.length)];
        
        let num1, num2, answer, question;
        
        switch(operation) {
            case '+':
            num1 = Math.floor(Math.random() * 99) + 2;
            num2 = Math.floor(Math.random() * 99) + 2;
            answer = num1 + num2;
            question = `${num1} + ${num2}`;
            break;
            
            case '-':
            num1 = Math.floor(Math.random() * 99) + 2;
            num2 = Math.floor(Math.random() * 99) + 2;
            answer = num1;
            num1 = num1 + num2; 
            question = `${num1} - ${num2}`;
            break;
            
            case '*':
            num1 = Math.floor(Math.random() * 11) + 2;
            num2 = Math.floor(Math.random() * 99) + 2;
            answer = num1 * num2;
            question = `${num1} × ${num2}`;
            break;
            
            case '/':
            num1 = Math.floor(Math.random() * 11) + 2; 
            num2 = Math.floor(Math.random() * 99) + 2; 
            answer = num2; 
            num1 = num1 * num2; 
            num2 = num1 / answer; 
            question = `${num1} ÷ ${num2}`;
            break;
        }
        this.gameState.currentQuestion = question;
        this.currentAnswer = answer;
    }

    // TODO: This is messy in many ways. Emitting a "game:" inside the room.js class along with many other issues
    assignPlayerNumbers() {
        var i = 1;
        for (const key in this.players) {
            this.players[key].playerNumber = i;
            i++;

            PlayerManager.GetPlayerSocket(key).emit("game:player_numbers", this.players[key].playerNumber)
        }
    }

    startGame() {
        this.roomSocket.emit("game:start");
        this.generateNewQuestion();
    }

    emitGameState() {
        this.roomSocket.emit("game:state", this.gameState);
    }


    // TODO: Should this not be business logic?
    checkVictory() {
        if (this.gameState.score === VICTORY_SCORE) {
            this.roomSocket.emit("game:victory", 2);
            return true;
        }
        else if (this.gameState.score === VICTORY_SCORE * -1) {
            this.roomSocket.emit("game:victory", 1);
            return true;
        }
        return false;
    }
}