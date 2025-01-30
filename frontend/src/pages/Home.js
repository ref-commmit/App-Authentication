import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import { Pencil, Trash2 } from "lucide-react";

const users = [
  {
    id: 1,
    avatar:
      "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109.jpg",
    name: "Ram",
    dateCreated: "12/11/2018",
    role: "Admin",
    status: "inactive",
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk",
    name: "Shyam",
    dateCreated: "12/11/2019",
    role: "Admin",
    status: "active",
  },
  {
    id: 3,
    avatar: "https://eu.ui-avatars.com/api/?name=John+Doe&size=250",
    name: "Geeta",
    dateCreated: "29/01/2018",
    role: "Admin",
    status: "suspended",
  },
  {
    id: 4,
    avatar:
      "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109.jpg",
    name: "Nikhil",
    dateCreated: "15/05/2014",
    role: "Admin",
    status: "active",
  },
  {
    id: 5,
    avatar:
      "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    name: "Ayush",
    dateCreated: "19/10/2025",
    role: "Moderator",
    status: "active",
  },
];

function StatusIndicator({ status }) {
  const style = {
    container: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      
    },
    dot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor:
        status === "active"
          ? "#22c55e"
          : status === "suspended"
          ? "#ef4444"
          : "#f97316",
    },
    text: {
      textTransform: "capitalize",
    },
  };

  return (
    <div style={style.container}>
      <div style={style.dot} />
      <span style={style.text}>{status}</span>
    </div>
  );
}

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const styles = {
    container: {
      padding: "20px",
      widht: "100vw",
      margin: "0 auto",
      backgroundColor:"white"
    },
    table: {
      width: "100vw",
      borderCollapse: "separate",
      borderSpacing: "0",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    th: {
      padding: "12px",
      textAlign: "left",
      borderBottom: "1px solid #eee",
      color: "#666",
      fontWeight: "500",
      fontSize: "14px",
    },
    td: {
      padding: "12px",
      textAlign: "left",
      borderBottom: "1px solid #eee",
      color: "#333",
      fontSize: "14px",
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    avatar: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      objectFit: "cover",
    },
    actionButtons: {
      display: "flex",
      gap: "8px",
    },
    actionButton: {
      padding: "6px",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#666",
      borderRadius: "4px",
    },
    editButton: {
      color: "#3b82f6",
    },
    deleteButton: {
      color: "#ef4444",
    },
  };
  return (
    <div>
      <div style={styles.container}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Date Created</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={styles.td}>{user.id}</td>
                <td style={styles.td}>
                  <div style={styles.userInfo}>
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt=""
                      style={styles.avatar}
                    />
                    <span>{user.name}</span>
                  </div>
                </td>
                <td style={styles.td}>{user.dateCreated}</td>
                <td style={styles.td}>{user.role}</td>
                <td style={styles.td}>
                  <StatusIndicator status={user.status} />
                </td>
                <td style={styles.td}>
                  <div style={styles.actionButtons}>
                    <button
                      style={{ ...styles.actionButton, ...styles.editButton }}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      style={{ ...styles.actionButton, ...styles.deleteButton }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleLogout} style={{ marginLeft: "25px" }}>
        Logout
      </button>
      <ToastContainer />
    </div>
  );
}

export default Home;
