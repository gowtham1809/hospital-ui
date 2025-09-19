import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./App.scss";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <aside className="sidebar">
          <h2>Hospital Management</h2>
          <nav>
            <ul>
              <li>
                <Link to="/hospitals">🏥 Hospitals</Link>
              </li>
              <li>
                <Link to="/doctors">👨‍⚕️ Doctors</Link>
              </li>
              <li>
                <Link to="/patients">🧑‍🦽 Patients</Link>
              </li>
              <li>
                <Link to="/appointments">📅 Appointments</Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
};

export default App;
