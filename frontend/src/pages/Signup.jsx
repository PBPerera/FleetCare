import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Signup page component
 * - client-side validation: required fields, email format, password match
 * - shows errors
 * - submits using handleCreate (has commented example for API integration)
 */

export default function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    nic: "",
    department: "",
    employeeId: "",      // fixed typo (emplyee -> employeeId)
    designation: "",
    username: "",        // renamed user -> username
    password: "",
    confirmPassword: "",
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const change = (key) => (e) => {
    setForm((s) => ({ ...s, [key]: e.target.value }));
  };

  const isEmailValid = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const handleCreate = async (e) => {
    if (e) e.preventDefault();
    setErr("");

    // Basic validation
    if (!form.fullName.trim() || !form.email.trim()) {
      setErr("Please enter your full name and email.");
      return;
    }
    if (!isEmailValid(form.email.trim())) {
      setErr("Please enter a valid email address.");
      return;
    }
    if (!form.password || !form.confirmPassword) {
      setErr("Please enter and confirm your password.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setErr("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setErr("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      // --- If you have a backend API, uncomment & adapt the example below ---
      // const api = (await import('../api')).default;
      // const payload = {
      //   name: form.fullName,
      //   email: form.email,
      //   password: form.password,
      //   phone: form.phone,
      //   nic: form.nic,
      //   department: form.department,
      //   employeeId: form.employeeId,
      //   designation: form.designation,
      //   username: form.username,
      //   role: 'staff' // or admin based on your flow
      // };
      // const res = await api.post('/auth/signup', payload);
      // // Save token and redirect (if backend returns token)
      // if (res?.data?.token) {
      //   localStorage.setItem('token', res.data.token);
      // }
      // // route depending on role returned by server
      // nav(res?.data?.user?.role === 'admin' ? '/admin' : '/staff');

      // --- Demo fallback (no backend) ---
      setTimeout(() => {
        setLoading(false);
        // after signup go to login page
        nav("/login");
      }, 800);
    } catch (error) {
      setLoading(false);
      const message = error?.response?.data?.message || error.message || "Signup failed";
      setErr(message);
    }
  };

  return (
    <div className="signup-page centered" style={{ padding: 28 }}>
      <div className="signup-card" role="form" aria-labelledby="signup-title">
        <h2 id="signup-title" className="signup-title">
          Create Account
        </h2>

        <form className="signup-form" onSubmit={handleCreate} noValidate>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={change("fullName")}
            placeholder="Full Name"
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            value={form.email}
            onChange={change("email")}
            placeholder="Email Address"
            type="email"
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={change("phone")}
            placeholder="Phone Number"
            inputMode="tel"
          />

          <label htmlFor="nic">NIC</label>
          <input
            id="nic"
            name="nic"
            value={form.nic}
            onChange={change("nic")}
            placeholder="NIC"
          />

          <label htmlFor="department">Department / Unit</label>
          <input
            id="department"
            name="department"
            value={form.department}
            onChange={change("department")}
            placeholder="Department / Unit"
          />

          <label htmlFor="employeeId">Employee ID</label>
          <input
            id="employeeId"
            name="employeeId"
            value={form.employeeId}
            onChange={change("employeeId")}
            placeholder="Employee ID"
          />

          <label htmlFor="designation">Designation</label>
          <input
            id="designation"
            name="designation"
            value={form.designation}
            onChange={change("designation")}
            placeholder="Designation"
          />

          <label htmlFor="username">User Name</label>
          <input
            id="username"
            name="username"
            value={form.username}
            onChange={change("username")}
            placeholder="User Name"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            value={form.password}
            onChange={change("password")}
            placeholder="Password"
            type="password"
            required
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={change("confirmPassword")}
            placeholder="Confirm Password"
            type="password"                 // fixed: proper input type
            required
          />

          {err && <div className="form-error" role="alert">{err}</div>}
          <div style={{ marginTop: 20 }}></div>
        </form>

      </div>

      <div style={{ marginTop: 20 }}>
        <button className="btn gradient-btn" onClick={handleCreate} disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>
      </div>
    </div>
  );
}

