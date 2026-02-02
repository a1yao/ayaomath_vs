import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

import { joinRoomAPI } from "../api/SocketAPI";

function Home() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [roomId, setRoomId] = useState("");

  const navigate = useNavigate();


  const joinRoom = async (roomId) => {
    try {
        // TODO: Should we add a check to if backend returns positive or is this sufficient? Should we add the backend returning roomId convention
        await joinRoomAPI(roomId);
        navigate(`/room/${roomId}`);
    }
    catch (error) {
        console.error('Error joining room: ', error);
        alert('Failed to create room');
    }
  }


//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       console.log("received!")
//       setMessageReceived(data.message)
//     }, [socket])
//   })
  return (
    <div className="App">
      <input placeholder="Room ID..." onChange={(event) => {
        setRoomId(event.target.value)
      }}/>
      <button onClick={() => {navigate(`/room/${roomId}`)}}> Join Room </button>
      <input placeholder="Message..." onChange={(event) => {
        setMessage(event.target.value)
      }}/>
      <button onClick={() => {navigate('/createRoom')}}> Create Room </button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
}

export default Home;