import { NavLink, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Tasks from "./pages/Tasks";
import History from "./pages/History";

import "./App.css";

function App() {
  return (
  <div className="app">
    <header className="header">
  <div className="header-content">
    <h1>Utpatti Project Management Utility</h1>
    <p>Manage users, assign tasks and track project progress.</p>
  </div>
</header>

    <nav className="navbar">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? "active-link" : "nav-link"
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/users"
        className={({ isActive }) =>
          isActive ? "active-link" : "nav-link"
        }
      >
        Users
      </NavLink>

      <NavLink
        to="/tasks"
        className={({ isActive }) =>
          isActive ? "active-link" : "nav-link"
        }
      >
        Tasks
      </NavLink>
      </nav>

      

    <main className="page-content">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/history" element={<History />} />
        <Route path="/history/:taskId" element={<History />} />
      </Routes>
    </main>
  </div>
);
}

export default App;