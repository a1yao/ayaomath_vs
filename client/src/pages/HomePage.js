import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Button from "../components/Button";


function Home() {
  const [roomId, setRoomId] = useState("");

  const navigate = useNavigate();


  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#333',
          margin: 0
        }}>
          ayaomath_vs
        </h1>

        {/* Join Room Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          width: '100%',
          alignItems: 'center'
        }}>
          <input 
            placeholder="Room ID..." 
            value={roomId}
            onChange={(event) => {
              setRoomId(event.target.value)
            }}
            style={{
              fontSize: '18px',
              padding: '15px 20px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              textAlign: 'center',
              width: '100%',
              outline: 'none'
            }}
          />
          <Button 
            onClick={() => {navigate(`/room/${roomId}`)}} 
            color="blue"
            fullWidth
          >
            Join Room
          </Button>
        </div>

        {/* Divider */}
        <div style={{
          width: '100%',
          textAlign: 'center',
          color: '#999',
          fontSize: '16px'
        }}>
          or
        </div>

        {/* Create Room Section */}
        <Button 
          onClick={() => {navigate('/createRoom')}} 
          color="blue"
          fullWidth
        >
          Create Room
        </Button>
      </div>
    </div>

  );
}

export default Home;