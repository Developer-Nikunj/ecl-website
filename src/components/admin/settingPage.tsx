import React from "react";

const SettingPage = () => {
  return (
    <div className="container mt-4">
      {/* Page Header */}
      <div className="row mb-3">
        <div className="col">
          <h4 className="mb-0">Settings</h4>
          <small className="text-muted">Manage your account preferences</small>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          {/* Profile Settings */}
          <div className="card mb-3">
            <div className="card-header">
              <strong>Profile Settings</strong>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>

              <button className="btn btn-primary btn-sm">Save Changes</button>
            </div>
          </div>

          {/* Password Settings */}
          <div className="card">
            <div className="card-header">
              <strong>Password</strong>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="New password"
                />
              </div>

              <button className="btn btn-warning btn-sm">
                Update Password
              </button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <strong>Preferences</strong>
            </div>
            <div className="card-body">
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="emailNotif"
                />
                <label className="form-check-label" htmlFor="emailNotif">
                  Email notifications
                </label>
              </div>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="darkMode"
                />
                <label className="form-check-label" htmlFor="darkMode">
                  Dark mode
                </label>
              </div>

              <button className="btn btn-success btn-sm">
                Save Preferences
              </button>
            </div>
          </div>

          {/* Logout */}
          <div className="card mt-3">
            <div className="card-body text-center">
              <button className="btn btn-danger btn-sm">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
