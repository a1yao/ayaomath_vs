import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import * as SocketAPI from "../api/RoomSocketAPI"
import { Socket } from 'socket.io-client';

const Game = () => {

  const [ question, setQuestion ] = useState(null);
  const [ answer, setAnswer ] = useState("");
  const { id } = useParams();

  const handleInputChange = (e) => {
    setAnswer(e.target.value);
  }

  useEffect(() => {
    SocketAPI.checkAnswer(id, answer);
  }, [answer]);

  useEffect(() => {
    SocketAPI.joinGameAPI(id);

    SocketAPI.onGameUpdateAPI((data) => {
      console.log("[game:update] Received: ", data.currentQuestion);
      setQuestion(data.currentQuestion);
      setAnswer("");
    })
  }, [id]);


  return (
    <div>
      {question}
      <br></br>
      <input type="text" autoFocus value={answer} onChange={handleInputChange}/>
    </div>
  )
}

export default Game
