import React from "react";
import Link from "next/link";

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
              src="/assets/backend/images/users/avatar-2.jpg"
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
          <Link href="/dev/userprofile" className="dropdown-item">
            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1" />
            <span className="align-middle">Profile</span>
          </Link>
          <a className="dropdown-item" href="pages-profile-settings.html">
            <span className="badge bg-success-subtle text-success mt-1 float-end">
              New
            </span>
            <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle">Settings</span>
          </a>
          <Link href="/signout" className="dropdown-item">
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1" />
            <span className="align-middle" data-key="t-logout">
              SignOut
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
