import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../services/api';

export default function ForgetPasswordEmail() {
  const [email, setEmail] = useState('');
  const nav = useNavigate();
  const [sending, setSending] = useState(false);

  async function send(e) {
    e.preventDefault();
    setSending(true);
    const res = await sendOtp(email);
    setSending(false);
    if (res.ok) {
      // store email for subsequent screens
      localStorage.setItem('resetEmail', email);
      nav('/otp');
    } else alert(res.message || 'Error sending OTP');
  }

  return (
    <div className="lc-page lc-centered-page">
      <div className="lc-small-card">
        <h3>Forgot Password ?</h3>
        <form onSubmit={send} style={{display:'flex', flexDirection:'column', gap:12}}>
          <input className="lc-input" placeholder="Enter your email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <div style={{display:'flex', justifyContent:'flex-end', gap:8}}>
            <button type="button" className="lc-btn lc-btn-secondary" onClick={()=>nav('/login')}>Cancel</button>
            <button className="lc-btn" type="submit">{sending ? 'Sending...' : 'Send The OTP'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
