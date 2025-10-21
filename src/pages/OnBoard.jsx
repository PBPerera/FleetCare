import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * OnBoard screen - hero, cards, about, contact, footer
 * Requires: src/assets/logo-small.png (logo) and src/assets/hero.jpg (hero visual)
 * If you don't have hero.jpg provide one or adjust CSS to use other image.
 */

export default function OnBoard() {
  const nav = useNavigate();

  return (
    <div className="onboard-root">
      

      <main className="onboard-main">
        {/* HERO */}
        <section className="onboard-hero" id="home">
          <img className="onboard-hero-logo" src={require("../assets/logo-small.png")} alt="logo" />
          <h1>One Platform<br/>Total Fleet Control</h1>
          <p className="onboard-sub">Office of the Regional Health Service - Kalutara</p>

          <div className="onboard-login-btn">
            <button className="lc-btn" onClick={() => nav("/login")}>Log in</button>
          </div>

          {/* wave / decorative divider */}
          <div className="wave-sep" aria-hidden />
        </section>

        {/* Image band with 3 feature cards */}
        <section className="image-band">
          <div className="hero-image" role="img" aria-label="fleet">
            {/* background image from CSS */}
          </div>

          <div className="feature-cards">
            <div className="fcard"> </div>
            <div className="fcard"> </div>
            <div className="fcard"> </div>
          </div>
        </section>

        {/* About */}
        <section className="about" id="about">
          <div className="about-left">
            <h3>FleetCare</h3>
            <p className="about-small">Vehicle Management System</p>
            <h2>About US</h2>
            <div className="about-lines">
              <div className="what">
                <h4>Our Mission</h4>
                <p>Reduce cost & improve fleet management for public sector organizations.</p>
              </div>
              <div className="what">
                <h4>What We Do</h4>
                <p>Monitor vehicles, manage drivers, schedule trips and handle requests.</p>
              </div>
              <div className="what">
                <h4>Our Values</h4>
                <p>Reliability, transparency and user-centric design.</p>
              </div>
            </div>
          </div>

          <div className="about-right">
            <div className="car-visual" />
          </div>
        </section>

        {/* Contact */}
        <section className="contact" id="contact">
          <h3>Contact Us</h3>
          <div className="contact-grid">
            <div className="contact-left">
              <div className="contact-card">
                <p><strong>FleetCare</strong></p>
                <p>Vehicle Management System</p>
              </div>
            </div>
            <div className="contact-right">
              <div className="contact-box">
                <p>+94 77 5845685</p>
                <p>example@gmail.com</p>
                <p>Kalutara, Colombo, Sri Lanka</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div>FleetCare — Vehicle Management System</div>
          <div>© {new Date().getFullYear()}</div>
        </footer>
      </main>
    </div>
  );
}
