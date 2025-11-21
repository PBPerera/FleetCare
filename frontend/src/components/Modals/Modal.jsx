import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, title, onClose, children, onConfirm, confirmText = 'Confirm', isForm = false }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">{children}</div>
        {!isForm && (
          <div className="modal-footer">
            <button className="modal-btn cancel" onClick={onClose}>Cancel</button>
            {onConfirm && (
              <button className="modal-btn confirm" onClick={onConfirm}>{confirmText}</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
