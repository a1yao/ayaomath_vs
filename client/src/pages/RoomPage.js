import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { socket, joinRoomAPI, leaveRoomAPI, onRoomUpdateAPI } from "../api/SocketAPI";

function Room() {
    const [ users, setUsers ] = useState({});
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

    useEffect(() => {
        joinRoom(id);
        onRoomUpdateAPI((data) => {
            console.log("[room:update] Received: ", data);
            setUsers(data);
            console.log(users);
            
        });

        return () => {
            leaveRoom(id);
        }
    }, [id])
    return (
        <div>
            <h1> Room Id: {id}</h1>

            <br></br>
            <ul>
                {Object.keys(users).map(socketId => (
                    <li key={socketId}>{socketId}</li>
                ))}
            </ul>
        </div>
    )
}

export default Room