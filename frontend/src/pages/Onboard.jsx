import React from 'react'
import { Link } from 'react-router-dom'

export default function Onboard(){
  return (
    <div style={{padding:18}}>
      <div className="hero card">
        <div className="topnav">
          <div className="brand">
            <div className="logoBox">FC</div>
            <div>
              <div style={{fontWeight:800}}>FleetCare</div>
              <div style={{fontSize:12,opacity:0.9}}>Total Fleet Control</div>
            </div>
          </div>
          <nav>
            <Link to="/" style={{color:'white', textDecoration:'none', marginRight:14}}>Home</Link>
            <Link to="/about" style={{color:'white', textDecoration:'none', marginRight:14}}>About Us</Link>
            <Link to="/contact" style={{color:'white', textDecoration:'none'}}>Contact</Link>
          </nav>
        </div>

        <div className="hero-inner">
          {/* logo - put your logo in /src/assets/logo-placeholder.png */}
          <img src="/src/assets/logo-placeholder.png" alt="logo" style={{width:84,height:84,objectFit:'contain',margin:'6px auto'}}/>
          <div className="hero-title">One Platform<br/><span style={{fontSize:22}}>Total Fleet Control</span></div>
          <div className="hero-sub">Office of the Regional Health Service - Kelatura</div>

          <div className="login-cta">
            <Link to="/login"><button className="btn">Log in</button></Link>
          </div>

          <div className="wave" aria-hidden="true"></div>
        </div>

        <div style={{
          backgroundImage:'url(/src/assets/hero-bg.jpg)',
          backgroundSize:'cover',
          backgroundPosition:'center',
          height:260,
          marginTop:40,
          position:'relative',
          borderRadius:12,
          overflow:'hidden'
        }}>
          <div style={{position:'absolute',left:20,top:20,color:'white',fontWeight:700}}>Fleet Images</div>
          <div className="hero-cards" style={{position:'absolute',left:'50%',transform:'translateX(-50%)',bottom:20}}>
            <div className="card"/>
            <div className="card"/>
            <div className="card"/>
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
            <div className="contact-box">
              <h4>Contact Us</h4>
              <p>+94 77 5846665</p>
              <p>example@gmail.com</p>
              <p>Kelatura, Colombo, Sri Lanka</p>
            </div>
            <div className="footer-mini">FleetCare - vehicle management system</div>
          </div>
        </div>
      </div>
    </div>
  )
}
