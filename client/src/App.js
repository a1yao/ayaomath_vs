import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/HomePage';
import CreateRoom from './pages/CreateRoomPage';
import Room from './pages/RoomPage';

const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [roomId, setRoomId] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message, roomId });
  }
  const joinRoom = () => {
    socket.emit("join_room", roomId);
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("received!")
      setMessageReceived(data.message)
    }, [socket])
  })
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/createRoom" element={<CreateRoom />} />
        <Route path="/room/:id" element={<Room />} />
      </Routes>
    </Router>
  );
}

export default App;
