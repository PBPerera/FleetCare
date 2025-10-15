 import React from 'react'
    import { Link } from 'react-router-dom'
    export default function Onboard(){
      return (
        <div style={{padding:16}}>
          <div className="hero card">
            <div className="topnav">
              <div className="logoBox">
                <div className="mark">FC</div>
                <div style={{fontWeight:800}}>FleetCare</div>
              </div>
              <nav style={{display:'flex',gap:12}}>
                <Link to="/" style={{color:'white',textDecoration:'none'}}>Home</Link>
                <Link to="/about" style={{color:'white',textDecoration:'none'}}>About Us</Link>
                <Link to="/contact" style={{color:'white',textDecoration:'none'}}>Contact Us</Link>
              </nav>
            </div>
            <div className="hero-inner">
              <img src="/src/assets/logo-placeholder.png" alt="logo" style={{width:96,height:96,objectFit:'contain',margin:'6px auto'}}/>
              <div className="hero-title">One Platform<br/><span style={{fontSize:20}}>Total Fleet Control</span></div>
              <div className="hero-sub">Office of the Regional Health Service - Kalutara</div>
              <div className="login-cta" style={{marginTop:12}}>
                <Link to="/login"><button className="btn">Log in</button></Link>
              </div>
              <div className="wave" aria-hidden="true"></div>
            </div>
            <div className="hero-visual" style={{backgroundImage:'url(/src/assets/hero-bg.jpg)'}}>
              <div style={{position:'absolute',left:18,top:18,color:'white',fontWeight:700}}>Fleet Images</div>
              <div className="hero-cards">
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
              </div>
            </div>
          </div>
    
          <div className="section">
            <div className="about-grid">
              <div className="about-card">
                <h3>About US</h3>
                <p style={{color:'#334e64',marginTop:6}}>Our Mission</p>
                <p style={{fontSize:14,color:'#234'}}>To provide efficient fleet management solutions for the health service.</p>
                <h4 style={{marginTop:12}}>What We Do</h4>
                <p style={{fontSize:14,color:'#234'}}>Track vehicles, schedule trips, and manage maintenance with ease.</p>
                <h4 style={{marginTop:12}}>Our Values</h4>
                <p style={{fontSize:14,color:'#234'}}>Safety, Reliability and Efficiency.</p>
              </div>
              <div>
                <div className="contact-card">
                  <img src="/src/assets/contact.jpg" alt="contact"/>
                  <div>
                    <h4>Contact Us</h4>
                    <p>+94 77 5846665</p>
                    <p>example@gmail.com</p>
                    <p>Kalutara, Colombo</p>
                  </div>
                </div>
                <div style={{marginTop:12,background:'#2b9af6',color:'white',padding:10,borderRadius:8,textAlign:'center'}}>FleetCare - vehicle management system</div>
              </div>
            </div>
          </div>
        </div>
    )
    }