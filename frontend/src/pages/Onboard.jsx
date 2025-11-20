import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-small.png"; // put your image at: src/assets/logo-small.png

export default function Onboard() {
  return (
    <div className="onboard">
      {/* Navbar */}
      <header className="nav">
        <div className="nav-left">
          <div className="logo">
            <img src={logo} alt="FleetCare logo" className="logo-img" />
            <span className="logo-text">FleetCare</span>
          </div>
        </div>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About us</a>
          <a href="#contact">Contact us</a>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">
            <span>One Platform</span>
            <br />
            <span>Total Fleet Control</span>
          </h1>
          <p className="hero-sub">
            Office of the Regional Health Service – Kalutara
          </p>

          {/* Router-aware button goes to /login */}
          <Link to="/login" className="btn-primary-link">
            <button className="btn-primary">Log in</button>
          </Link>
        </div>

        {/* Top soft wave */}
        <div className="wave wave-top" aria-hidden>
          <svg viewBox="0 0 1440 180" preserveAspectRatio="none">
            <path d="M0,120 C240,200 480,40 720,80 C960,120 1200,180 1440,120 L1440,0 L0,0 Z"></path>
          </svg>
        </div>

        {/* Background image section (blurred blocks mimic the design) */}
        <div className="hero-image">
          <div className="mask-block" />
          <div className="mask-block" />
          <div className="mask-block" />
        </div>

        {/* Bottom soft wave */}
        <div className="wave wave-bottom" aria-hidden>
          <svg viewBox="0 0 1440 180" preserveAspectRatio="none">
            <path d="M0,60 C240,0 480,160 720,120 C960,80 1200,20 1440,60 L1440,180 L0,180 Z"></path>
          </svg>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about">
        <div className="about-inner">
          <div className="about-left">
            <h2>About Us</h2>
            <div className="about-line">
              <div className="tick" />
              <div>
                <h3>Our Mission</h3>
                <p>
                  Streamline vehicle operations for public health services with
                  secure, modern, and efficient digital workflows.
                </p>
              </div>
            </div>
            <div className="about-line">
              <div className="tick" />
              <div>
                <h3>What We Do</h3>
                <p>
                  Centralized trip scheduling, maintenance tracking, driver
                  onboarding, and audit logs—everything in one place.
                </p>
              </div>
            </div>
            <div className="about-line">
              <div className="tick" />
              <div>
                <h3>Our Values</h3>
                <p>
                  Reliability, transparency, and safety—so every vehicle is
                  ready when communities need it most.
                </p>
              </div>
            </div>
          </div>

          <div className="about-visual" aria-hidden>
            <div className="car-shadow" />
            <div className="car" />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact">
        <div className="contact-inner">
          <h2>Contact Us</h2>

          <div className="contact-wrap">
            <div className="contact-photo" />

            <div className="contact-card">
              <div className="contact-icons" aria-hidden>
                <div className="bubble">✉️</div>
                <div className="bubble">📞</div>
                <div className="bubble">📍</div>
              </div>

              <div className="contact-info">
                <p className="contact-item">+94 77 5548655</p>
                <p className="contact-item">example@gmail.com</p>
                <p className="contact-item">Kalutara, Colombo</p>
                <p className="contact-item">Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="brand">FleetCare</div>
          <div className="copy">
            © {new Date().getFullYear()} Health Services – All rights reserved.
          </div>
          <div className="credit">Powered by FleetCare Team</div>
        </div>
      </footer>

      {/* Page Styles (scoped) */}
      <style>{`
        :root{
          --brand:#1e90ff;
          --brandDark:#136ad1;
          --ink:#0f172a;
          --muted:#64748b;
          --bg:#f8fafc;
          --panel:#ffffff;
          --cardShadow: 0 10px 30px rgba(15,23,42,.08);
          --radius:18px;
        }
        *{box-sizing:border-box}
        body{margin:0}
        .onboard{
          color:var(--ink);
          background: var(--bg);
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji","Segoe UI Emoji";
        }

        /* Navbar */
        .nav{
          position:sticky; top:0; z-index:50;
          display:flex; align-items:center; justify-content:space-between;
          padding:16px 28px; background:#fff; box-shadow: var(--cardShadow);
        }
        .logo{display:flex; align-items:center; gap:10px; font-weight:700}
        .logo-img{width:34px; height:34px; object-fit:contain}
        .logo-text{letter-spacing:.2px}
        .nav-links{display:flex; gap:28px}
        .nav-links a{
          color:var(--ink); text-decoration:none; font-weight:500;
        }
        .nav-links a:hover{color:var(--brand)}

        /* Hero */
        .hero{
          position:relative; overflow:hidden;
          background: linear-gradient(180deg,#eaf3ff, #ffffff 35%, #eaf3ff);
        }
        .hero-inner{
          text-align:center; padding:72px 20px 54px; max-width:1100px; margin:0 auto;
        }
        .hero-title{
          font-size: clamp(28px, 4.4vw, 54px);
          line-height:1.05; margin:0; letter-spacing:.2px;
        }
        .hero-sub{
          margin:14px 0 24px; color:var(--muted); font-weight:600;
        }
        .btn-primary-link{display:inline-block; text-decoration:none}
        .btn-primary{
          padding:12px 22px; border-radius:999px; border:none;
          background:var(--brand); color:#fff; font-weight:700; cursor:pointer;
          box-shadow: 0 8px 20px rgba(30,144,255,.25);
        }
        .btn-primary:hover{background:var(--brandDark)}

        .wave{
          position:absolute; left:0; right:0; height:120px; pointer-events:none;
        }
        .wave svg{width:100%; height:100%}
        .wave path{fill:#cfe4ff}
        .wave-top{top:0; opacity:.5}
        .wave-bottom{bottom:-2px; opacity:.7}

        .hero-image{
          position:relative;
          margin:24px auto 10px; max-width:1100px; height:220px;
          background-image: url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1470&auto=format&fit=crop');
          background-size: cover; background-position:center;
          border-radius: var(--radius);
          box-shadow: var(--cardShadow);
          overflow:hidden;
        }
        .mask-block{
          position:absolute; top:22px; bottom:22px; width:22%;
          background:#9ec2ff; opacity:.85; border-radius:12px;
          box-shadow: inset 0 0 0 2px rgba(255,255,255,.35);
        }
        .mask-block:nth-child(1){left:6%}
        .mask-block:nth-child(2){left:39%}
        .mask-block:nth-child(3){left:72%}

        /* About */
        .about{
          padding:72px 20px; background: linear-gradient(180deg,#ffffff,#eaf3ff);
        }
        .about-inner{
          margin:0 auto; max-width:1100px; display:grid; gap:32px;
          grid-template-columns: 1.2fr .8fr;
        }
        .about h2{margin:0 0 18px; font-size: clamp(22px,3vw,34px)}
        .about-line{display:grid; grid-template-columns: 28px 1fr; gap:14px; margin:18px 0}
        .tick{
          width:28px; height:28px; border-radius:999px; background:#d9ecff;
          box-shadow: inset 0 0 0 2px #9ec2ff;
          position:relative;
        }
        .tick:after{
          content:""; position:absolute; left:8px; top:6px; width:12px; height:6px;
          border:2px solid var(--brandDark); border-top:0; border-left:0; transform:rotate(45deg);
        }
        .about h3{margin:0 0 6px; font-size:18px}
        .about p{margin:0; color:var(--muted)}
        .about-visual{position:relative; min-height:320px}
        .car-shadow{
          position:absolute; inset:auto 0 32px; margin:auto; width:72%; height:38px;
          background: radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,.15), rgba(0,0,0,0));
          filter: blur(4px);
        }
        .car{
          position:absolute; inset:0; margin:auto; width:70%; height:70%;
          background: linear-gradient(180deg,#ffffff,#e8f1ff);
          border-radius: 120px/160px;
          box-shadow: var(--cardShadow), inset 0 -12px 40px rgba(0,0,0,.06);
        }

        /* Contact */
        .contact{padding:64px 20px}
        .contact-inner{max-width:1100px; margin:0 auto}
        .contact h2{margin:0 0 22px; font-size: clamp(22px,3vw,34px)}
        .contact-wrap{
          display:grid; grid-template-columns: 1fr 1fr; gap:22px; align-items:center;
        }
        .contact-photo{
          height:280px; border-radius: var(--radius);
          background-image:url('https://images.unsplash.com/photo-1501706362039-c06b2d715385?q=80&w=1470&auto=format&fit=crop');
          background-size:cover; background-position:center;
          box-shadow: var(--cardShadow);
          position:relative;
        }

        .contact-card{
          position:relative; padding:22px; background: var(--panel);
          border-radius: var(--radius); box-shadow: var(--cardShadow);
          min-height: 220px;
        }
        .contact-icons{
          position:absolute; right:18px; top:-18px; display:flex; gap:10px;
        }
        .bubble{
          width:42px; height:42px; border-radius:999px; background:#e6f1ff;
          display:grid; place-items:center; box-shadow: var(--cardShadow); font-size:18px;
        }
        .contact-info{margin-top:10px}
        .contact-item{margin:8px 0; font-weight:600}

        /* Footer */
        .footer{
          background:#0b1220; color:#cbd5e1; padding:22px 20px; margin-top:40px;
        }
        .footer-inner{
          max-width:1100px; margin:0 auto; display:grid; gap:12px;
          grid-template-columns: 1fr auto auto; align-items:center;
        }
        .brand{font-weight:800; color:#fff}
        .credit{opacity:.8; font-size:14px}
        .copy{opacity:.8; font-size:14px}

        /* Responsive */
        @media (max-width: 980px){
          .about-inner{grid-template-columns: 1fr}
          .contact-wrap{grid-template-columns: 1fr}
          .mask-block{display:none}
        }
      `}</style>
    </div>
  );
}
