import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [todoCount, setTodoCount] = useState(0);
const [inProgressCount, setInProgressCount] = useState(0);
const [testingCount, setTestingCount] = useState(0);
const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const users = await api.get("/users");
      const tasks = await api.get("/tasks");

      setUserCount(users.data.length);
      setTaskCount(tasks.data.length);

      setTodoCount(
  tasks.data.filter(
    (task) => task.status === "To Do"
  ).length
);

setInProgressCount(
  tasks.data.filter(
    (task) => task.status === "In Progress"
  ).length
);

setTestingCount(
  tasks.data.filter(
    (task) => task.status === "Testing"
  ).length
);

setDoneCount(
  tasks.data.filter(
    (task) => task.status === "Done"
  ).length
);

    } catch (error) {
      console.error(error);
    }
  };


 return (
  <div>
    <div className="dashboard-header">
      <h2>Dashboard</h2>
      <p>
        Monitor project progress and view key statistics at a glance.
      </p>
    </div>

    <div className="dashboard-grid">
      <div
        className="dashboard-card"
        onClick={() => navigate("/users")}
      >
        <h3>Total Users</h3>
        <h1>{userCount}</h1>
      </div>

      <div
        className="dashboard-card"
        onClick={() => navigate("/tasks")}
      >
        <h3>Total Tasks</h3>
        <h1>{taskCount}</h1>
      </div>

      <div className="dashboard-card">
        <h3>To Do</h3>
        <h1>{todoCount}</h1>
      </div>

      <div className="dashboard-card">
        <h3>In Progress</h3>
        <h1>{inProgressCount}</h1>
      </div>

      <div className="dashboard-card">
        <h3>Testing</h3>
        <h1>{testingCount}</h1>
      </div>

      <div className="dashboard-card">
        <h3>Completed</h3>
        <h1>{doneCount}</h1>
      </div>
    </div>
  </div>
);
}

export default Dashboard;