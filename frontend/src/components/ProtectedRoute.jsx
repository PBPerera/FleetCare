import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // 1️⃣ Not logged in → back to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ If route requires a role → check it
  if (role) {
    const allowedRoles = Array.isArray(role) ? role : [role];

    if (!allowedRoles.includes(user.role)) {
      return <h1 style={{ padding: 30 }}>⛔ Access Denied</h1>;
    }
  }

  // 3️⃣ All good → allow page
  return children;
}
