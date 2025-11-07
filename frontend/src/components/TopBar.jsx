import React from "react";
import { Link } from "react-router-dom";

/**
 * Minimal FleetCare top bar (slim).
 * Props:
 *  - title?: string (defaults to "FleetCare")
 *  - to?: string (brand link, defaults "/")
 */

export default function TopBar({ title = "FleetCare", to = "/" }) {
  return (
    <header className="tbs-root" role="banner">
      <div className="tbs-inner">
        <Link to={to} className="tbs-brand" aria-label={`${title} home`}>
          <img className="tbs-logo" src="/logo2.png" alt="Logo" />
          <span className="tbs-title">{title}</span>
        </Link>
      </div>
    </header>
  );
}