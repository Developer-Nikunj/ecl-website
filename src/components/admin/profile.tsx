import React from 'react'

const Profile = () => {
  return (
    <div>
      <div className="dropdown sidebar-user m-1 rounded">
        <button
          type="button"
          className="btn material-shadow-none"
          id="page-header-user-dropdown"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="d-flex align-items-center gap-2">
            <img
              className="rounded header-profile-user"
              src="assets/backend/images/users/avatar-1.jpg"
              alt="Header Avatar"
            />
            <span className="text-start">
              <span className="d-block fw-medium sidebar-user-name-text">
                Anna Adame
              </span>
              <span className="d-block fs-14 sidebar-user-name-sub-text">
                <i className="ri ri-circle-fill fs-10 text-success align-baseline" />{" "}
                <span className="align-middle">Online</span>
              </span>
            </span>
          </span>
        </button>
        <div className="dropdown-menu dropdown-menu-end">
          {/* item*/}
          <h6 className="dropdown-header">Welcome Anna!</h6>
          <a className="dropdown-item" href="pages-profile.html">
            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle">Profile</span>
          </a>
          <a className="dropdown-item" href="apps-chat.html">
            <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle">Messages</span>
          </a>
          <a className="dropdown-item" href="apps-tasks-kanban.html">
            <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle">Taskboard</span>
          </a>
          <a className="dropdown-item" href="pages-faqs.html">
            <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle">Help</span>
          </a>
          <div className="dropdown-divider" />
          <a className="dropdown-item" href="pages-profile.html">
            <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle">
              Balance : <b>$5971.67</b>
            </span>
          </a>
          <a className="dropdown-item" href="pages-profile-settings.html">
            <span className="badge bg-success-subtle text-success mt-1 float-end">
              New
            </span>
            <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle">Settings</span>
          </a>
          <a className="dropdown-item" href="auth-lockscreen-basic.html">
            <i className="mdi mdi-lock text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle">Lock screen</span>
          </a>
          <a className="dropdown-item" href="auth-logout-basic.html">
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle" data-key="t-logout">
              Logout
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Profile
