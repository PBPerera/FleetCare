import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyOtp } from '../services/api';

export default function OtpScreen() {
  const [code, setCode] = useState(['','','','','']);
  const navigate = useNavigate();

  function setAt(i, v) {
    const next = [...code];
    next[i] = v.replace(/\D/g,'').slice(0,1);
    setCode(next);
  }

  async function submit(e) {
    e.preventDefault();
    const joined = code.join('');
    const email = localStorage.getItem('resetEmail') || '';
    const res = await verifyOtp(email, joined);
    if (res.ok) navigate('/reset');
    else alert('Invalid code');
  }

  return (
    <div className="lc-page lc-centered-page">
      <div className="lc-small-card">
        <h3>Check Your email</h3>
        <p style={{color:'#666'}}>Enter the 5 digit code we sent to your email</p>
        <form onSubmit={submit} style={{display:'flex', flexDirection:'column', gap:12, alignItems:'center'}}>
          <div style={{display:'flex', gap:10}}>
            {code.map((v,i)=>(<input key={i} value={v} onChange={e=>setAt(i,e.target.value)} className="lc-otp" />))}
          </div>
          <button className="lc-btn" type="submit">Verify Code</button>
        </form>
      </div>
    </div>
  );
}
