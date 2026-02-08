import React from 'react';

const ScoreBar = ({ score = 0, minScore = -5, maxScore = 5 }) => {
  // Calculate position percentage (0-100%) from score
  const scoreRange = maxScore - minScore;
  const scorePercentage = ((score - minScore) / scoreRange) * 100;

  // Determine indicator color based on score
  const getIndicatorColor = () => {
    if (score === 0) return '#666';
    return score > 0 ? '#f44336' : '#2196f3';
  };

  // Generate array of score values from minScore to maxScore
  const scoreValues = [];
  for (let i = minScore; i <= maxScore; i++) {
    scoreValues.push(i);
  }

  return (
    <div style={{ 
      width: '100%', 
      height: '40px', 
      position: 'relative',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Line of dots */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        position: 'relative'
      }}>
        {/* Connecting line - left side (blue) */}
        <div style={{
          position: 'absolute',
          left: 0,
          right: '50%',
          top: '50%',
          height: '3px',
          backgroundColor: '#2196f3',
          transform: 'translateY(-50%)',
          zIndex: 0
        }}></div>
        
        {/* Connecting line - right side (red) */}
        <div style={{
          position: 'absolute',
          left: '50%',
          right: 0,
          top: '50%',
          height: '3px',
          backgroundColor: '#f44336',
          transform: 'translateY(-50%)',
          zIndex: 0
        }}></div>
        
        {scoreValues.map((dotScore) => {
          const isEndDot = dotScore === minScore || dotScore === maxScore;
          const dotSize = isEndDot ? '14px' : '10px';
          
          return (
            <div
              key={dotScore}
              style={{
                width: dotSize,
                height: dotSize,
                backgroundColor: dotScore === 0 ? '#666' : (dotScore < 0 ? '#2196f3' : '#f44336'),
                borderRadius: '50%',
                position: 'relative',
                zIndex: 1,
                border: '2px solid white'
              }}
            ></div>
          );
        })}
        
        {/* Score indicator - positioned absolutely over the dots */}
        <div style={{
          position: 'absolute',
          left: `${scorePercentage}%`,
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '30px',
          height: '30px',
          backgroundColor: getIndicatorColor(),
          borderRadius: '50%',
          border: '3px solid white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          transition: 'left 0.3s ease, background-color 0.3s ease',
          zIndex: 2
        }}></div>
      </div>
    </div>
  );
};

export default ScoreBar;