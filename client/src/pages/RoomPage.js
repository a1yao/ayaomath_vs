import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Game from "./GamePage";
import { joinRoomAPI, leaveRoomAPI, onRoomUpdateAPI, setReadyAPI, onCountdownTickAPI, onGameStartAPI } from "../api/RoomSocketAPI";

function Room() {
    const [ inGame, setInGame ] = useState(false);
    const [ users, setUsers ] = useState({});
    const [ countdown, setCountdown ] = useState(null);
    const [ isReady, setIsReady ] = useState(false);
    const { id } = useParams();

    const joinRoom = async (id) => {
        try {
            await joinRoomAPI(id);
        }
        catch (error) {
            console.error('Error joining room: ', error);
            alert('Failed to join room');
        }
      }
    const leaveRoom = async (id) => {
        try {
            await leaveRoomAPI(id);
        }
        catch (error) {
            console.error('Error leaving room: ', error);
        }
    }

    const readyUp = () => {
        setIsReady(!isReady);
    }

    useEffect(() => {
        setReadyAPI(id, isReady);
    }, [isReady])

    useEffect(() => {
        joinRoom(id);
        onRoomUpdateAPI((data) => {
            console.log("[room:update] Received: ", data);
            setUsers(data);
            console.log(users);
            
        });
        onCountdownTickAPI((data) => {
            console.log("[room:countdown_tick] Countdown ticked: ", data);
            setCountdown(data);
        })
        onGameStartAPI(() => {
            console.log("[game:start] Game has been started");
            setInGame(true);
        })

        return () => {
            leaveRoom(id);
        }
    }, [id])
    return inGame ? (<Game/>) : (
        <div>
            <h1> Room Id: {id}</h1>

            <br></br>
            <ul>
                {Object.entries(users).map(([socketId, player]) => (
                    <li 
                        key={socketId}
                        style={{ color: player.isReady ? 'green' : 'black' }}
                    >
                        {socketId}
                    </li>
                ))}
            </ul>
            <button onClick={readyUp}> {isReady ? "Unready" : "Ready"} </button>

            {countdown}
        </div>
    )
}

export default Room