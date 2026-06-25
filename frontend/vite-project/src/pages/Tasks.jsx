import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Common.css";
import "../styles/Tasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
 const [description, setDescription] = useState("");
const [assignedUser, setAssignedUser] = useState("");
const [editingTaskId, setEditingTaskId] = useState(null);
const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
  fetchTasks();
  fetchUsers();
}, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
  try {
    const response = await api.get("/users");
    setUsers(response.data);
  } catch (error) {
    console.error(error);
  }
};

const createTask = async () => {
  try {

    if (
  !title.trim() ||
  !description.trim() ||
  !assignedUser
) {
  alert("Please fill in all fields.");
  return;
}
    if (isEditing) {
      await api.put(`/tasks/${editingTaskId}`, {
        title,
        description,
        assignedUser,
      });

      setIsEditing(false);
      setEditingTaskId(null);
    } else {
      await api.post("/tasks", {
        title,
        description,
        assignedUser,
      });
    }

    setTitle("");
    setDescription("");
    setAssignedUser("");

    fetchTasks();
  } catch (error) {
    console.error(error);
  }
};

const updateTaskStatus = async (taskId, newStatus) => {
  try {
    await api.put(`/tasks/${taskId}`, {
      status: newStatus,
    });

    fetchTasks();
  } catch (error) {
    console.error(error);
  }
};

const deleteTask = async (taskId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/tasks/${taskId}`);

    fetchTasks();
  } catch (error) {
    console.error(error);
  }
};

const editTask = (task) => {
  setTitle(task.title);
  setDescription(task.description);
  setAssignedUser(task.assignedUser?._id || "");

  setEditingTaskId(task._id);
  setIsEditing(true);
};

  return (
  <div>
    <h2 className="section-title">Tasks</h2>

    <div className="form-container">
      <label>Task Title</label>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Description</label>

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>Assign User</label>

      <select
        value={assignedUser}
        onChange={(e) => setAssignedUser(e.target.value)}
      >
        <option value="">Select User</option>

        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <button
        className="primary-btn"
        onClick={createTask}
      >
        {isEditing ? "Update Task" : "Create Task"}
      </button>
    </div>

    <h2 className="section-title">
      Task List
    </h2>

    {tasks.map((task) => (
     <div key={task._id} className="info-card">

  <h3 className="task-title">
    {task.title}
  </h3>

  <p className="task-description">
    {task.description}
  </p>

  <hr className="task-divider" />

  <p>
    <strong>Assigned To:</strong>{" "}
    {task.assignedUser?.name || "Not Assigned"}
  </p>

  <div className="task-status">
    <span><strong>Status:</strong></span>

    <select
      value={task.status}
      onChange={(e) =>
        updateTaskStatus(task._id, e.target.value)
      }
    >
      <option value="To Do">To Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Testing">Testing</option>
      <option value="Done">Done</option>
    </select>
  </div>

  <div className="action-buttons">
    <button
      className="edit-btn"
      onClick={() => editTask(task)}
    >
      Edit
    </button>

    <button
      className="delete-btn"
      onClick={() => deleteTask(task._id)}
    >
      Delete
    </button>
  </div>

</div>
    ))}
  </div>
);
}

export default Tasks;