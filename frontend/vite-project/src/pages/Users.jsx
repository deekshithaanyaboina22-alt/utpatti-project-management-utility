import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Common.css";
import "../styles/Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async () => {
  try {

    if (!name.trim() || !email.trim() || !role.trim()) {
  alert("Please fill in all fields.");
  return;
}
    if (isEditing) {
      await api.put(`/users/${editingUserId}`, {
        name,
        email,
        role,
      });

      setIsEditing(false);
      setEditingUserId(null);
    } else {
      await api.post("/users", {
        name,
        email,
        role,
      });
    }

    setName("");
    setEmail("");
    setRole("");

    fetchUsers();
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

  const deleteUser = async (userId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/users/${userId}`);

    fetchUsers();
  } catch (error) {
    console.error(error);
  }
};

const editUser = (user) => {
  setName(user.name);
  setEmail(user.email);
  setRole(user.role);

  setEditingUserId(user._id);
  setIsEditing(true);
};

 return (
  <div>
    <h2 className="section-title">Users</h2>

    <div className="form-container">
      <label>Name</label>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Email</label>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Role</label>

      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <button
        className="primary-btn"
        onClick={createUser}
      >
        {isEditing ? "Update User" : "Add User"}
      </button>
    </div>

    <h2 className="section-title">
      Registered Users
    </h2>

    {users.map((user) => (
      <div
        key={user._id}
        className="info-card"
      >
        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Role:</strong> {user.role}
        </p>

        <div className="action-buttons">
          <button
            className="edit-btn"
            onClick={() => editUser(user)}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => deleteUser(user._id)}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);
}

export default Users;