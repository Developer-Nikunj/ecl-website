import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="dropdown ms-sm-3 header-item topbar-user" ref={dropdownRef}>
      <button
        type="button"
        className="btn material-shadow-none d-flex align-items-center"
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <img
          className="rounded-circle header-profile-user"
          src="/assets/backend/images/users/avatar-2.jpg"
          alt="Header Avatar"
          width={40}
          height={40}
        />
        <span className="text-start ms-2 d-none d-xl-block">
          <span className="fw-medium user-name-text">Anna Adame</span>
          <br />
          <span className="fs-12 user-name-sub-text">Founder</span>
        </span>
      </button>

      <div
        className={`dropdown-menu dropdown-menu-end shadow ${
          open ? "show" : ""
        }`}
        style={{ minWidth: "200px" }}
      >
        <h6 className="dropdown-header">Welcome Anna!</h6>

        <Link href="/dev/userprofile" className="dropdown-item">
          <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1" />
          <span className="align-middle">Profile</span>
        </Link>

        <div className="dropdown-divider" />

        <Link href="/dev/setting" className="dropdown-item">
          <i className="ri-user-settings-line align-middle fs-18 text-muted me-2" />
          <span className="align-middle">Setting</span>
        </Link>

        <Link href="/signout" className="dropdown-item">
          <i className="mdi mdi-logout text-muted fs-16 align-middle me-1" />
          <span className="align-middle">SignOut</span>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
