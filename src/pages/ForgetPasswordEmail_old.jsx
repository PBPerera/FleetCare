import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/api';

export default function ResetPassword() {
  const [pwd, setPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    if (pwd.length < 6) return alert('Password too short (min 6)');
    if (pwd !== confirm) return alert('Passwords do not match');
    const email = localStorage.getItem('resetEmail') || '';
    const res = await resetPassword(email, pwd);
    if (res.ok) {
      alert('Password reset successful');
      navigate('/login');
    } else alert('Error resetting password');
  }

  return (
    <div className="lc-page lc-centered-page">
      <div className="lc-small-card">
        <h3>Create New Password</h3>
        <form onSubmit={submit} style={{display:'flex', flexDirection:'column', gap:12}}>
          <input className="lc-input" type="password" placeholder="Enter New Password" value={pwd} onChange={e=>setPwd(e.target.value)} required />
          <input className="lc-input" type="password" placeholder="Confirm password" value={confirm} onChange={e=>setConfirm(e.target.value)} required />
          <div style={{display:'flex', justifyContent:'flex-end', gap:8}}>
            <button type="button" className="lc-btn lc-btn-secondary" onClick={()=>navigate('/login')}>Cancel</button>
            <button className="lc-btn" type="submit">Reset Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}
