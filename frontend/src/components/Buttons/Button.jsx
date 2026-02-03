import React from 'react';
import './Button.css';

const Button = ({ children, variant = 'primary', onClick, disabled, ...props }) => {
  return (
    <button
      className={`custom-btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;