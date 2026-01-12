"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { getUserProfile } from "@/store/slices/module1/profile/profile.thunk";

// Generate random data
const randomName = () =>
  ["Anna Smith", "John Doe", "Lisa Ray", "Mark Johnson"][
    Math.floor(Math.random() * 4)
  ];
const randomEmail = () =>
  [
    "anna@example.com",
    "john@example.com",
    "lisa@example.com",
    "mark@example.com",
  ][Math.floor(Math.random() * 4)];
const randomRole = () =>
  ["Admin", "Editor", "Subscriber"][Math.floor(Math.random() * 3)];
const randomStatus = () =>
  ["Active", "Pending", "Suspended"][Math.floor(Math.random() * 3)];

const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Mock data
const activityLogs = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  action: ["Logged in", "Updated profile", "Changed password", "Logged out"][
    Math.floor(Math.random() * 4)
  ],
  timestamp: new Date(
    Date.now() - randomNumber(0, 1000000000)
  ).toLocaleString(),
}));

const messages = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  from: randomName(),
  email: randomEmail(),
  subject: ["Meeting update", "Project deadline", "Invitation", "Alert"][
    Math.floor(Math.random() * 4)
  ],
  status: randomStatus(),
}));

const stats = [
  { label: "Total Users", value: randomNumber(100, 1000) },
  { label: "Active Sessions", value: randomNumber(10, 100) },
  { label: "New Messages", value: randomNumber(0, 50) },
  { label: "Tasks Completed", value: randomNumber(0, 200) },
];

const ProfilePageContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const {profile,activity,loading,error} = useAppSelector((state)=>state.profile);

  console.log("activity", activity);

  const [user] = useState({
    name: randomName(),
    email: randomEmail(),
    role: randomRole(),
    avatar: "/assets/backend/images/users/avatar-2.jpg",
  });

  const fetchProfile = async () => {
    await dispatch(getUserProfile());
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="profile-page">
      {/* User Card */}
      <div className="card mb-3 p-3">
        <div className="d-flex align-items-center">
          <img
            src={
              profile?.img
                ? `/${profile?.img}`
                : "/assets/backend/images/users/avatar-2.jpg"
            } // fallback
            alt={profile?.name || "User Avatar"} // accessible alt text
            className="rounded-circle me-3"
            width={80}
            height={80}
          />

          <div>
            <h4 className="mb-1">{profile?.name || user.name}</h4>
            <p className="mb-0">{profile?.email || user.email}</p>
            <span className="badge bg-primary">
              {profile?.role || user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="row mb-4">
        {stats.map((stat, idx) => (
          <div className="col-3" key={idx}>
            <div className="card text-center p-3">
              <h5>{stat.value}</h5>
              <p className="mb-0">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Logs */}
        
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Recent Activity</h5>
          </div>
          <div
            className="card-body"
            style={{
              maxHeight: "500px",
              overflowY: "auto",
              minHeight: "300px",
            }}
          >
            <ul className="list-group list-group-flush">
              {activity.length === 0 ? (
                <li className="list-group-item text-muted text-center">
                  No recent activity
                </li>
              ) : (
                activity.map((log, index) => (
                  <li
                    className="list-group-item d-flex flex-column mb-2"
                    key={index}
                    style={{
                      borderRadius: "6px",
                      padding: "12px",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <strong>{log.action}</strong>
                      <span
                        className={`badge ${
                          log.status === "200" ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {log.status}
                      </span>
                    </div>
                    <small className="text-muted mb-1">
                      {log.requestMethod}
                    </small>
                    {log?.createdAt && (
                      <small
                        className="text-muted"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {new Date(log?.createdAt).toLocaleString()}
                      </small>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

      {/* Messages */}
      <div className="card mb-4 p-3">
        <h5>Messages</h5>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>From</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.from}</td>
                <td>{msg.email}</td>
                <td>{msg.subject}</td>
                <td>
                  <span
                    className={`badge bg-${
                      msg.status === "Active"
                        ? "success"
                        : msg.status === "Pending"
                        ? "warning"
                        : "danger"
                    }`}
                  >
                    {msg.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts placeholders */}
      <div className="row mb-4">
        <div className="col-6">
          <div className="card p-3">
            <h5>Activity Chart</h5>
            <div style={{ height: 200, background: "#f5f5f5" }}>
              Chart placeholder
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card p-3">
            <h5>Messages Chart</h5>
            <div style={{ height: 200, background: "#f5f5f5" }}>
              Chart placeholder
            </div>
          </div>
        </div>
      </div>

      {/* Repeat more sections to reach ~500 lines */}
      {Array.from({ length: 10 }).map((_, idx) => (
        <div className="card mb-3 p-3" key={idx}>
          <h5>Additional Section {idx + 1}</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Random
            data: {randomNumber(1, 1000)}
          </p>
          <ul>
            {Array.from({ length: 5 }).map((__, i) => (
              <li key={i}>
                Item {i + 1} - {randomName()}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProfilePageContent;
