import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-small.png';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="logo-section" onClick={() => navigate('/')}>
        <img src={logo} alt="FleetCare Logo" className="header-logo" />
        <div className="header-title">FleetCare</div>
      </div>
    </header>
  );
}
