import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Game from "./GamePage";
import Button from "../components/Button";
import {
  joinRoomAPI,
  leaveRoomAPI,
  onRoomUpdateAPI,
  setReadyAPI,
  onCountdownTickAPI,
  onGameStartAPI,
  onGameLeaveAPI,
} from "../api/RoomSocketAPI";

function Room() {
  const [inGame, setInGame] = useState(false);
  const [users, setUsers] = useState({});
  const [countdown, setCountdown] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const { id } = useParams();

  const joinRoom = async (id) => {
    try {
      await joinRoomAPI(id);
    } catch (error) {
      console.error("Error joining room: ", error);
      alert("Failed to join room");
    }
  };

  const leaveRoom = async (id) => {
    try {
      await leaveRoomAPI(id);
    } catch (error) {
      console.error("Error leaving room: ", error);
    }
  };

  const readyUp = () => {
    setIsReady(!isReady);
  };

  useEffect(() => {
    setReadyAPI(id, isReady);
  }, [isReady]);

  useEffect(() => {
    joinRoom(id);

    onRoomUpdateAPI((data) => {
      console.log("[room:update] Received: ", data);
      setUsers(data);
    });

    onCountdownTickAPI((data) => {
      console.log("[room:countdown_tick] Countdown ticked: ", data);
      setCountdown(data);
    });

    onGameStartAPI(() => {
      console.log("[game:start] Game has been started");
      setInGame(true);
    });

    onGameLeaveAPI(() => {
      console.log("[game:leave] Game left");
      setInGame(false);
      setIsReady(false);
      setCountdown(null);
    });

    return () => {
      leaveRoom(id);
    };
  }, [id]);

  if (inGame) return <Game />;

  return (
    <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#333',
              margin: 0
            }}>
              Room {id}
            </h1>
          </div>
  
          {/* Player List Section */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            <div style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#333'
            }}>
              Players
            </div>
  
            <ul style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {Object.entries(users).map(([socketId, player]) => (
                <li
                  key={socketId}
                  style={{
                    color: player.isReady ? '#4caf50' : '#333',
                    fontSize: '16px',
                    padding: '10px 15px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    wordBreak: 'break-all'
                  }}
                >
                  {socketId}
                </li>
              ))}
            </ul>
          </div>
  
          {/* Controls Section */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              flexWrap: 'wrap'
            }}>
              <Button onClick={readyUp} color={isReady ? 'green' : 'blue'}>
                {isReady ? "Unready" : "Ready"}
              </Button>
  
              {countdown !== null && (
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Starting in {countdown}...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}

export default Room;
