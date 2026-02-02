import { useNavigate } from "react-router-dom";
import { createRoomAPI } from "../api/SocketAPI";


function CreateRoom() {
    const navigate = useNavigate();

    const createRoom = async () => {
        try {
            const roomId = await createRoomAPI();
            console.log(roomId);

            // TODO: Create enumeration for response statuses
            navigate(`/room/${roomId}`);
        }
        catch (error) {
            console.error('Error creating room: ', error);
            alert('Failed to create room');
        }
    }
    return (
        <div>
            <h1>
                <button onClick={() => {navigate('/')}}> Back </button>
                <button onClick={createRoom}> Create Room </button>
            </h1>
        </div>
    );
}

export default CreateRoom