import { Link, useLocation } from "react-router-dom";
import "./layout.css";

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2 className="logo">📚 Publication DB</h2>

        <nav className="sidebar-menu">
          <Link
            to="/dashboard"
            className={`menu-card ${location.pathname === "/dashboard" ? "active" : ""}`}
          >
            Dashboard
          </Link>

          <Link
            to="/researchers"
            className={`menu-card ${location.pathname === "/researchers" ? "active" : ""}`}
          >
            Researchers
          </Link>

          <Link
            to="/journals"
            className={`menu-card ${location.pathname === "/journals" ? "active" : ""}`}
          >
            Journals
          </Link>

          <Link
            to="/papers"
            className={`menu-card ${location.pathname === "/papers" ? "active" : ""}`}
          >
            Papers
          </Link>

          <Link
            to="/equipment"
            className={`menu-card ${location.pathname === "/equipment" ? "active" : ""}`}
          >
            Equipment
          </Link>

          <Link 
            to="/office"
            className={`menu-card ${location.pathname === "/equipment" ? "active" : ""}`}
          >
            Office
          </Link>

        </nav>
      </aside>

      <main className="content">
        {children}
      </main>
    </div>
  );
}
