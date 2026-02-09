import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  color = 'blue', 
  size = 'medium',
  fullWidth = false,
  disabled = false,
  type = 'button'
}) => {
  // Color options
  const colors = {
    blue: {
      normal: '#2196f3',
      hover: '#1976d2'
    },
    red: {
      normal: '#f44336',
      hover: '#d32f2f'
    },
    gray: {
      normal: '#757575',
      hover: '#616161'
    },
    green: {
      normal: '#4caf50',
      hover: '#388e3c'
    }
  };

  // Size options
  const sizes = {
    small: {
      padding: '8px 16px',
      fontSize: '14px'
    },
    medium: {
      padding: '15px 30px',
      fontSize: '18px'
    },
    large: {
      padding: '20px 40px',
      fontSize: '22px'
    }
  };

  const colorScheme = colors[color] || colors.blue;
  const sizeStyle = sizes[size] || sizes.medium;

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={{
        ...sizeStyle,
        fontWeight: 'bold',
        backgroundColor: disabled ? '#cccccc' : colorScheme.normal,
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.6 : 1,
        transition: 'background-color 0.2s'
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = colorScheme.hover;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = colorScheme.normal;
        }
      }}
    >
      {children}
    </button>
  );
};

export default Button;