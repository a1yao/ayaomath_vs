import { useNavigate } from "react-router-dom";
import { createRoomAPI } from "../api/RoomSocketAPI";
import Button from "../components/Button"


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
                gap: '30px'
            }}>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    alignItems: 'center'
                }}>
                    <Button onClick={createRoom} color="blue" size="large">
                        Create Room
                    </Button>

                    <Button onClick={() => {navigate('/')}} color="gray">
                        Back
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CreateRoom