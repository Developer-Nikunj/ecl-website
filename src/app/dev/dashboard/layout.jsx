"use client";

import { useState } from "react";
import Link from "next/link";

export default function DashboardLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);

    const toggleSubMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    return (
        <div className="d-flex min-vh-100">

            {/* Sidebar */}
            <aside
                className="bg-dark text-white p-3 d-flex flex-column"
                style={{
                    width: collapsed ? "70px" : "240px",
                    transition: "width 0.3s ease",
                }}
            >
                {/* Toggle */}
                <button
                    className="btn btn-sm btn-outline-light mb-4 align-self-end"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    ☰
                </button>

                <ul className="nav flex-column gap-1">

                    <li className="nav-item">
                        <Link href="/dashboard" className="nav-link text-white">
                            🏠 {!collapsed && "Home"}
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link href="/dashboard/profile" className="nav-link text-white">
                            👤 {!collapsed && "Profile"}
                        </Link>
                    </li>

                    {/* Roles with Subitems */}
                    <li className="nav-item">
                        <button
                            className="nav-link text-white btn btn-link text-start w-100"
                            onClick={() => toggleSubMenu("roles")}
                        >
                            👥 {!collapsed && "Roles"}
                            {!collapsed && (
                                <span className="float-end">
                                    {openMenu === "roles" ? "▾" : "▸"}
                                </span>
                            )}
                        </button>

                        {/* Subitems */}
                        {!collapsed && openMenu === "roles" && (
                            <ul className="nav flex-column ms-3 mt-1">
                                <li className="nav-item">
                                    <Link href="/dashboard/roles/admin" className="nav-link text-secondary">
                                        Admin
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/dashboard/roles/user" className="nav-link text-secondary">
                                        User
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/dashboard/roles/manager" className="nav-link text-secondary">
                                        Manager
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li className="nav-item">
                        <Link href="/dashboard/settings" className="nav-link text-white">
                            ⚙️ {!collapsed && "Settings"}
                        </Link>
                    </li>

                    <li className="nav-item mt-auto">
                        <Link href="/login" className="nav-link text-danger">
                            🚪 {!collapsed && "Logout"}
                        </Link>
                    </li>

                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-fill p-4 bg-light">
                {children}
            </main>
        </div>
    );
}
