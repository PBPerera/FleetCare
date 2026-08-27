// src/components/UserProfileMenu.jsx
// Shows the logged-in user's signup details (top-right of dashboard headers).
// Password and Username are intentionally excluded from the displayed fields.
import React, { useEffect, useRef, useState } from "react";
import { UserCircle2 } from "lucide-react";

export default function UserProfileMenu() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("fleetcare_user");
      if (stored) setUser(JSON.parse(stored));
    } catch (e) {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = user?.fullName
    ? user.fullName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((p) => p[0])
        .join("")
        .toUpperCase()
    : "";

  // Signup details only — Password and Username are never shown here.
  const fields = user
    ? [
        { label: "Full Name", value: user.fullName },
        { label: "Email", value: user.emailAddress },
        { label: "Phone Number", value: user.phoneNumber },
        { label: "NIC", value: user.nic },
        { label: "Department / Unit", value: user.department },
        { label: "Role", value: user.role },
        { label: "Employee ID", value: user.employeeId },
        { label: "Designation", value: user.designation },
      ].filter((f) => f.value)
    : [];

  return (
    <div className="upm-wrap" ref={wrapRef}>
      <button
        type="button"
        className="upm-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="upm-avatar" aria-hidden>
          {initials || <UserCircle2 size={22} />}
        </span>
        {user?.fullName && (
          <span className="upm-name">
            {user.fullName}
            {user.role && <span className="upm-role">{user.role}</span>}
          </span>
        )}
      </button>

      {open && (
        <div className="upm-panel" role="menu">
          <div className="upm-panel-head">Profile Details</div>
          {fields.length ? (
            <dl className="upm-fields">
              {fields.map((f) => (
                <div className="upm-field" key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <div className="upm-empty">No profile details available.</div>
          )}
        </div>
      )}

      <style>{`
        .upm-wrap{position:relative; display:inline-flex;}
        .upm-trigger{
          display:flex; align-items:center; gap:8px;
          background:transparent; border:0; cursor:pointer;
          padding:6px 8px; border-radius:10px; color:inherit;
          font-family:inherit;
        }
        .upm-trigger:hover{background:rgba(0,0,0,.06)}
        .upm-avatar{
          width:32px; height:32px; border-radius:50%;
          display:grid; place-items:center;
          background:linear-gradient(135deg,#5f2bff,#2f7bff);
          color:#fff; font-weight:700; font-size:13px;
          flex-shrink:0;
        }
        .upm-name{
          display:flex; flex-direction:column; align-items:flex-start;
          line-height:1.25; font-size:13.5px; font-weight:700; color:#111827;
          text-align:left;
        }
        .upm-role{font-size:11px; font-weight:600; color:#6b7280;}
        .upm-panel{
          position:absolute; top:calc(100% + 8px); right:0;
          width:260px; background:#fff; border-radius:12px;
          box-shadow:0 12px 28px rgba(15,23,42,.18); border:1px solid #eef2f7;
          padding:12px 14px; z-index:1000; text-align:left;
        }
        .upm-panel-head{font-weight:800; font-size:13px; margin-bottom:8px; color:#111827;}
        .upm-fields{margin:0; display:flex; flex-direction:column; gap:8px;}
        .upm-field dt{font-size:11px; color:#6b7280; margin:0;}
        .upm-field dd{font-size:13px; color:#111827; margin:0 0 0 0; font-weight:600; word-break:break-word;}
        .upm-empty{font-size:13px; color:#6b7280;}
      `}</style>
    </div>
  );
}
