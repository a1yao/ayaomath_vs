import React from 'react';

const GameOverlay = ({ isVisible, isWinner, onReturnHome, onReturnToRoom }) => {
  console.log("GameOverlay rendered:", { isVisible, isWinner });
  
  if (!isVisible) return null;

  const buttonColor = isWinner ? '#2196f3' : '#f44336';

  const handleHomeClick = (e) => {
    console.log("Home button clicked");
    e.preventDefault();
    e.stopPropagation();
    onReturnHome();
  };

  const handleRoomClick = (e) => {
    console.log("Room button clicked");
    e.preventDefault();
    e.stopPropagation();
    onReturnToRoom();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      {/* Victory/Defeat Message */}
      <h1 style={{
        fontSize: '72px',
        fontWeight: 'bold',
        color: isWinner ? '#2196f3' : '#f44336',
        marginBottom: '40px'
      }}>
        {isWinner ? 'You Win!' : 'You Lose!'}
      </h1>

      {/* Buttons */}
      <div style={{
        display: 'flex',
        gap: '20px'
      }}>
        <button
          onClick={handleHomeClick}
          type="button"
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            fontWeight: 'bold',
            backgroundColor: buttonColor,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Return to Home
        </button>

        <button
          onClick={handleRoomClick}
          type="button"
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            fontWeight: 'bold',
            backgroundColor: buttonColor,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Return to Room
        </button>
      </div>
    </div>
  );
};

export default GameOverlay;