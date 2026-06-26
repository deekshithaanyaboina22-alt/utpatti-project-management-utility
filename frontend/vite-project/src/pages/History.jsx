import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/Common.css";
import "../styles/History.css";

function History() {
  const { taskId } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
  if (!taskId) return;

  fetchHistory();
}, [taskId]);

  const fetchHistory = async () => {
    try {
      const response = await api.get(`/tasks/${taskId}/history`);

      setHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  if (!taskId) {
  return (
    <div>
      <h2 className="section-title">Task History</h2>

      <div className="info-card">
        <p>
          Please select a task from the <strong>Tasks</strong> page and click
          <strong> View History</strong> to see its complete status history.
        </p>
      </div>
    </div>
  );
}

  return (
  <div>
    <h2 className="section-title">Task History</h2>

    {history.length === 0 ? (
      <div className="info-card">
        <p>No task history available.</p>
      </div>
    ) : (
      history.map((item) => (
        <div
          key={item._id}
          className="info-card"
        >
          <h3 className="history-title">
            {item.taskId?.title}
          </h3>

          <p className="history-user">
            <strong>Assigned To:</strong>{" "}
            {item.taskId?.assignedUser?.name ||
              "Not Assigned"}
          </p>

          <hr className="history-divider" />

          <p className="history-status">
            <strong>Status:</strong>{" "}
            {item.oldStatus} → {item.newStatus}
          </p>

          <p className="history-date">
            <strong>Changed:</strong>{" "}
            {new Date(item.changedAt).toLocaleDateString()}{" "}at{" "}
{new Date(item.changedAt).toLocaleTimeString()}
          </p>
        </div>
      ))
    )}
  </div>
);
}

export default History;