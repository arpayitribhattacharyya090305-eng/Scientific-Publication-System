import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const { setRole } = useAuth();

  const [selectedRole, setSelectedRole] = useState("researcher");

  const handleLogin = () => {
    setRole(selectedRole);      // ✅ set role globally
    navigate("/dashboard");     // ✅ go to dashboard
  };

  return (
    <>
      {/* 🔹 INSTITUTE NAME (NEW — DOES NOT AFFECT LAYOUT) */}
      <div className="institute-name">
        CENTRAL RESEARCH INSTITUTE
        <div className="institute-subtitle">
          Scientific Publication Management System
        </div>
      </div>

      {/* 🔹 EXISTING LAYOUT (UNCHANGED) */}
      <div className="login-container">
        <div className="login-box">
          <h2>Institute Login</h2>

          <input placeholder="Username" />
          <input type="password" placeholder="Password" />

          {/* 🔽 ROLE SELECTION */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="researcher">Researcher</option>
            <option value="admin">Admin</option>
          </select>

          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </>
  );
}
