"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getallUsers,
  grantPermision,
  grantPermision2,
  getUserMenus,
} from "@/store/slices/module1/user/user.thunk";
import { getAllMenus } from "@/store/slices/module1/menu/menu.thunk";
import { userCreateAdmin } from "@/store/slices/module1/profile/profile.thunk";
import { getallRoles } from "@/store/slices/module1/roles/roles.thunk";

import PermissionGate from "@/components/admin/PermissionGate";

type PermissionKey = "get" | "post" | "put" | "delete";

const UsersTable = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    limit: 10,
    offset: 0,
  });
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showPermisionModal, setShowPermisionModal] = useState(false);
  const [selectedMenuIds, setSelectedMenuIds] = useState<number[]>([]);

  const [selectEditUserId, setSelectEditUserId] = useState<number>();

  const [selectedEditMenuIds, setSelectedEditMenuIds] = useState<number[]>([]);

  const [createUser, setCreateUser] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const {
    users,
    selectedUser,
    userMenus,
    meta,
    loading: userLoading,
    error: userError,
  } = useAppSelector((state) => state.user);
  const {
    menus,
    creating,
    loading: menuLoading,
    error: menuError,
  } = useAppSelector((state) => state.menu);

  const { roles } = useAppSelector((state) => state.role);

  // console.log("userMenus", userMenus);

  const fetchUsers = async () => {
    await dispatch(
      getallUsers({
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        limit: filters.limit,
        offset: filters.offset,
      })
    );
  };
  const fetchRoles = async () => {
    await dispatch(
      getallRoles({
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        limit: filters.limit,
        offset: filters.offset,
      })
    );
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(users.map((u) => u.id));
    } else {
      setSelectedIds([]);
    }
  };

  const fetchMenus = async () => {
    await dispatch(getAllMenus());
  };

  const handleMenuCheckbox = (id: number) => {
    setSelectedMenuIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  const handleSelectAllRow = (rowMenus: { id: number }[], checked: boolean) => {
    const rowIds = rowMenus.map((m) => m.id);

    if (checked) {
      // Add all IDs of this row that are not already selected
      setSelectedMenuIds((prev) => [...new Set([...prev, ...rowIds])]);
    } else {
      // Remove all IDs of this row
      setSelectedMenuIds((prev) => prev.filter((id) => !rowIds.includes(id)));
    }
  };
  const isAllSelected = (rowMenus: { id: number }[]) =>
    rowMenus.every((m) => selectedMenuIds.includes(m.id));

  const grantPermisionSubmit = async () => {
    // console.log("all ids there");
    console.log("all ids there selectedEditMenuIds", selectedEditMenuIds);
    console.log("all ids there selectEditUserId", selectEditUserId);
    await dispatch(
      grantPermision({ userId: selectedIds, menuId: selectedMenuIds })
    );
    setShowPermisionModal(false);
    setSelectedIds([]);
    setSelectedMenuIds([]);
  };
  const grantPermisionSubmitForEdit = async () => {
    // console.log("all ids there");
    // console.log("all ids there selectedEditMenuIds", selectedEditMenuIds);
    // console.log("all ids there selectEditUserId", [selectEditUserId]);
    await dispatch(
      grantPermision2({
        userId: [selectEditUserId],
        menuId: selectedEditMenuIds,
      })
    );
    setShowPermisionModal(false);
    setSelectEditUserId(undefined);
    setSelectedEditMenuIds([]);
  };

  const hasUserPermission = (slug, menuName) => {
    // console.log("hasUserPermission",slug,menuName);
    if (!userMenus) return false;
    const userModule = userMenus?.data.find((m) => m.slug == slug);
    if (!userModule) return false;
    return userModule.menus.some((m) => m.menuName == menuName);
  };
  const isAllChecked = (slug, allMenus) => {
    // console.log("isAllChecked", slug, allMenus);
    // console.log("userMenus", userMenus);
    if (!userMenus) return false;
    const userModule = userMenus?.data?.find((m) => m.slug == slug);
    if (!userModule) return false;

    return allMenus.every((menu) =>
      userModule.menus.some((m) => m.menuName == menu.menuName)
    );
  };

  const createUserByAdmin = async () => {
    await dispatch(userCreateAdmin(createUser));
    setShowCreateModal(false);
    fetchUsers();
    setCreateUser({ email: "", name: "", role: "", password: "" });
  };

  useEffect(() => {
    fetchUsers();
    fetchMenus();
    fetchRoles();
  }, [dispatch, filters]);

  const newFunction1 = async (id: number) => {
    console.log("Selected user updated:", id);
    const res = await dispatch(getUserMenus(id));
    console.log(res?.payload?.data);
    if (res?.payload?.data.length > 0) {
      let ExistMenuIDS = Array.from(
        new Set(
          res?.payload?.data.flatMap((m) => m.menus.map((menu) => menu.id))
        )
      );
      console.log("Correct menu IDs:", ExistMenuIDS);
      await setSelectedEditMenuIds(ExistMenuIDS);
    }
  };

  // useEffect(() => {
  //   newFunction1();
  // }, [selectEditUserId]);

  // useEffect(() => {
  //   if (userMenus?.data?.length > 0) {
  //     const ExistMenuIDS = Array.from(
  //       new Set(userMenus.data.flatMap((m) => m.menus.map((menu) => menu.id)))
  //     );

  //     console.log("Correct menu IDs:", ExistMenuIDS);
  //     setSelectedEditMenuIds(ExistMenuIDS);
  //   }
  // }, [userMenus]);

  return (
    <div>
      <div className="d-flex align-items-end gap-3 mb-3 flex-wrap">
        {/* Total Rows */}
        <div>
          <label htmlFor="totalRows" className="form-label mb-1">
            Total Rows
          </label>

          <select
            id="totalRows"
            className="form-select"
            value={filters.limit}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                limit: Number(e.target.value),
                offset: 0,
              }))
            }
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="form-label mb-1">Start Date</label>
          <input
            type="date"
            className="form-control"
            value={filters.startDate}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                startDate: e.target.value,
                offset: 0,
              }))
            }
          />
        </div>

        {/* End Date */}
        <div>
          <label className="form-label mb-1">End Date</label>
          <input
            type="date"
            className="form-control"
            value={filters.endDate}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                endDate: e.target.value,
                offset: 0,
              }))
            }
          />
        </div>

        {/* Apply Button */}
        {/* <button className="btn btn-primary px-4">Apply</button> */}
      </div>
      <div className="d-flex justify-content-end mb-3">
        {selectedIds.length > 0 ? (
          <PermissionGate permission="postpermission">
            <button
              onClick={() => setShowPermisionModal((prev) => !prev)}
              className="btn btn-sm btn-success"
            >
              Permission
            </button>
          </PermissionGate>
        ) : (
          <PermissionGate permission="postuser">
            <button
              onClick={() => setShowCreateModal((prev) => !prev)}
              className="btn btn-sm btn-success"
            >
              Create User
            </button>
          </PermissionGate>
        )}
      </div>
      <PermissionGate permission="getuser">
        <div className="table-responsive">
          <table className="table table-nowrap mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="selectAll"
                      checked={
                        selectedIds.length === users.length && users.length > 0
                      }
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      // Optional: add onChange to select all
                    />
                    <label
                      className="form-check-label"
                      htmlFor="selectAll"
                    ></label>
                  </div>
                </th>
                <th scope="col">SNo.</th>
                <th scope="col">Name</th>
                <th scope="col">Role</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 &&
                users.map((item, index) => (
                  <tr
                    key={item.id}
                    className={item.status === "Active" ? "" : "table-active"}
                  >
                    <th scope="row">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`check-${item.id}`}
                          checked={selectedIds.includes(item.id)}
                          onChange={() => handleCheckboxChange(item.id)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`check-${item.id}`}
                        ></label>
                      </div>
                    </th>
                    <td>{index + 1}</td>
                    <td>{item.name || "Unknown"}</td>
                    <td>{item.role}</td>
                    <td>
                      <span>{item.email}</span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <PermissionGate permission="putpermission">
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={async () => {
                              setSelectEditUserId(item.id);
                              setShowEditModal((prev) => !prev);
                              setShowEditModal(true);
                              newFunction1(item.id);
                            }}
                          >
                            <i className="ri-edit-line me-1" />
                            Edit
                          </button>
                        </PermissionGate>
                        <PermissionGate permission="deleteuser">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              setShowDeleteModal((prev) => !prev);
                            }}
                          >
                            <i className="ri-delete-bin-line me-1" />
                            Delete
                          </button>
                        </PermissionGate>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button
              className="btn btn-sm text-white"
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
              }}
              disabled={filters.offset === 0}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  offset: Math.max(0, prev.offset - prev.limit),
                }))
              }
            >
              Previous
            </button>

            <button
              className="btn btn-sm text-white"
              style={{
                background: "linear-gradient(135deg, #43cea2, #185a9d)",
              }}
              disabled={filters.offset + filters.limit >= meta?.total}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  offset: prev.offset + prev.limit,
                }))
              }
            >
              Next
            </button>
          </div>
        </div>
      </PermissionGate>

      {showCreateModal && (
        <>
          {/* Modal Wrapper */}
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            onClick={() => setShowCreateModal(false)} // 👈 outside click
          >
            <div
              className="modal-dialog modal-dialog-centered modal-md"
              onClick={(e) => e.stopPropagation()} // 👈 prevent inner click
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create User</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowCreateModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter user name"
                        value={createUser.name}
                        onChange={(e) => {
                          setCreateUser({
                            ...createUser,
                            name: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter user email"
                        value={createUser.email}
                        onChange={(e) => {
                          setCreateUser({
                            ...createUser,
                            email: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter user password"
                        value={createUser.password}
                        onChange={(e) => {
                          setCreateUser({
                            ...createUser,
                            password: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Role</label>
                      <select
                        className="form-select"
                        aria-label="Select Role"
                        value={createUser.role}
                        onChange={(e) =>
                          setCreateUser((prev) => ({
                            ...prev,
                            role: e.target.value,
                          }))
                        }
                      >
                        <option value="">Select Role</option>
                        {roles.map((role) => (
                          <option key={role.id} value={role.name}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </form>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => createUserByAdmin()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Backdrop */}
          <div className="modal-backdrop fade show" />
        </>
      )}
      {showEditModal && (
        <>
          {/* Modal Wrapper */}
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            onClick={() => {
              setShowEditModal(false);
              setSelectEditUserId(undefined);
            }} // 👈 outside click
          >
            <div
              className="modal-dialog modal-fullscreen"
              onClick={(e) => e.stopPropagation()} // 👈 prevent inner click
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Manage Permissions</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectEditUserId(undefined);
                    }}
                  />
                </div>

                {/* Body */}
                <div className="modal-body">
                  <table className="table table-bordered align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Module (Slug)</th>
                        <th>Select</th>
                        <th>Select</th>
                        <th>Select</th>
                        <th>Select</th>
                      </tr>
                    </thead>

                    <tbody>
                      {menus.length > 0 &&
                        menus.map((item) => (
                          <tr key={item.slug}>
                            <td className="fw-semibold text-capitalize">
                              {item.slug}
                            </td>

                            {item?.menus.map(
                              (menu: { id: number; menuName: string }) => (
                                <td key={menu.id} className="text-left">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={selectedEditMenuIds.includes(
                                      menu.id
                                    )}
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      setSelectedEditMenuIds((prev) =>
                                        checked
                                          ? [...prev, menu.id]
                                          : prev.filter((id) => id !== menu.id)
                                      );
                                    }}
                                  />
                                  <span className="ms-2">{menu.menuName}</span>{" "}
                                  {/* <span className="ms-2">{menu.id}</span>{" "} */}
                                </td>
                              )
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => {
                      setShowEditModal(false);

                      setSelectEditUserId(undefined);
                      setSelectedEditMenuIds([]);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => {
                      grantPermisionSubmitForEdit();
                      setShowEditModal(false);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Backdrop */}
          <div className="modal-backdrop fade show" />
        </>
      )}
      {showDeleteModal && (
        <>
          {/* Modal Wrapper */}
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            onClick={() => setShowDeleteModal(false)} // 👈 outside click
          >
            <div
              className="modal-dialog modal-dialog-centered modal-md"
              onClick={(e) => e.stopPropagation()} // 👈 prevent inner click
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Delete Menu</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowDeleteModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <h4>Sure, Want to Delete</h4>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-sm btn-success">Delete</button>
                </div>
              </div>
            </div>
          </div>

          {/* Backdrop */}
          <div className="modal-backdrop fade show" />
        </>
      )}
      {showPermisionModal && (
        <>
          {/* Modal Wrapper */}
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            onClick={() => setShowPermisionModal(false)} // 👈 outside click
          >
            <div
              className="modal-dialog modal-fullscreen"
              onClick={(e) => e.stopPropagation()} // 👈 prevent inner click
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Manage Permissions</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowPermisionModal(false)}
                  />
                </div>

                {/* Body */}
                <div className="modal-body">
                  <table className="table table-bordered align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Module (Slug)</th>
                        <th>All</th>
                        <th>Select</th>
                        <th>Select</th>
                        <th>Select</th>
                        <th>Select</th>
                      </tr>
                    </thead>

                    <tbody>
                      {menus.length > 0 &&
                        menus.map((item) => (
                          <tr key={item.slug}>
                            <td className="fw-semibold text-capitalize">
                              {item.slug}
                            </td>
                            <td className=" text-capitalize">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={isAllSelected(item.menus)}
                                onChange={(e) =>
                                  handleSelectAllRow(
                                    item.menus,
                                    e.target.checked
                                  )
                                }
                              />
                              <span className="ms-2">All</span>
                            </td>

                            {item?.menus.map(
                              (menu: { id: number; menuName: string }) => (
                                <td key={menu.id} className="text-left">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={selectedMenuIds.includes(menu.id)}
                                    onChange={() => handleMenuCheckbox(menu.id)}
                                  />
                                  <span className="ms-2">{menu.menuName}</span>{" "}
                                </td>
                              )
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => setShowPermisionModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => grantPermisionSubmit()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Backdrop */}
          <div className="modal-backdrop fade show" />
        </>
      )}
    </div>
  );
};

export default UsersTable;
