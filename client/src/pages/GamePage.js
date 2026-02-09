import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import * as SocketAPI from "../api/RoomSocketAPI"
import { Socket } from 'socket.io-client';
import ScoreBar from '../components/ScoreBar';
import GameOverlay from '../components/GameOverlay';
import { useNavigate } from "react-router-dom"

const Game = () => {

  const [ question, setQuestion ] = useState(null);
  const [ answer, setAnswer ] = useState("");
  const [ playerNumber, setPlayerNumber ] = useState(null)
  const [ score, setScore ] = useState(null);
  const [ gameOver, setGameOver ] = useState(false);
  const [ winner, setWinner ] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  const returnHome = () => {
    navigate('/');
  }


  const returnToRoom = () => {
    SocketAPI.rejoinRoomAPI(id);
  }

  const handleInputChange = (e) => {
    setAnswer(e.target.value);
  }

  useEffect(() => {
    SocketAPI.checkAnswer(id, answer);
  }, [answer]);

  useEffect(() => {
    SocketAPI.joinGameAPI(id);

    SocketAPI.onGamePlayerAssignmentAPI((data) => {
      console.log("[game:player_numbers] Received: ", data);
      setPlayerNumber(data);

      // TODO: Do we need to use useEffect to enable the answer box once the player number is set? I don't think it is human reactable to answer that fast though?
    })

    SocketAPI.onGameVictoryAPI((data) => {
      console.log("[game:victory] Received: ", data);
      setWinner(data);
      setGameOver(true);
    })

    SocketAPI.onGameUpdateAPI((data) => {
      console.log("[game:update] Received: ", data);
      setQuestion(data.currentQuestion);


      console.log(playerNumber, 2)
      if (playerNumber === 2) {
        console.log(data.score * -1)
        setScore(data.score * -1);
      }
      else {
        setScore(data.score)
      }
      
      setAnswer("");
    })
  }, [id, playerNumber]);


  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Score Bar at top */}
      <div style={{
        width: '100%',
        padding: '20px'
      }}>
        <ScoreBar score={score}/>
      </div>

      {/* Question and Answer - centered but shifted up */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '80px',
        padding: '20px'
      }}>
        {/* Question Display */}
        <div style={{
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <p style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#333',
            margin: 0
          }}>
            {question} =
          </p>
        </div>

        {/* Answer Input */}
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <input 
            type="text" 
            autoFocus 
            value={answer} 
            onChange={handleInputChange}
            style={{
              fontSize: '24px',
              padding: '15px 20px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              width: '200px',
              outline: 'none'
            }}
          />
        </div>
      </div>

      <GameOverlay 
        isVisible={gameOver} 
        isWinner={winner === playerNumber} 
        onReturnHome={returnHome} 
        onReturnToRoom={returnToRoom}
      />
    </div>
  )
}

export default Game
