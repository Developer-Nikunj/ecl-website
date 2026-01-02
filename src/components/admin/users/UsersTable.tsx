"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getallUsers,
  grantPermision,
  getUserMenus,
} from "@/store/slices/module1/user/user.thunk";
import { getAllMenus } from "@/store/slices/module1/menu/menu.thunk";
import { number } from "zod";

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

  console.log("userMenus", userMenus);

  const fetchUsers = () => {
    dispatch(
      getallUsers({
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

  const fetchMenus = () => {
    dispatch(getAllMenus());
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
    // console.log("all ids there selectedMenuIds", selectedMenuIds);
    // console.log("all ids there selectedIds", selectedIds);
    dispatch(grantPermision({ userId: selectedIds, menuId: selectedMenuIds }));
    setShowPermisionModal(false);
    setSelectedIds([]);
    setSelectedMenuIds([]);
  };



  useEffect(() => {
    fetchUsers();
    fetchMenus();
  }, [dispatch]);

  useEffect(() => {
    if (selectEditUserId) {
      console.log("Selected user updated:", selectEditUserId);
      dispatch(getUserMenus(selectEditUserId));
      setSelectEditUserId();
    }
  }, [selectEditUserId]);

  return (
    <div>
      <div className="d-flex align-items-end gap-3 mb-3 flex-wrap">
        {/* Total Rows */}
        <div>
          <label htmlFor="totalRows" className="form-label mb-1">
            Total Rows
          </label>

          <select id="totalRows" className="form-select">
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="form-label mb-1">Start Date</label>
          <input type="date" className="form-control" />
        </div>

        {/* End Date */}
        <div>
          <label className="form-label mb-1">End Date</label>
          <input type="date" className="form-control" />
        </div>

        {/* Apply Button */}
        <button className="btn btn-primary px-4">Apply</button>
      </div>
      <div className="d-flex justify-content-end mb-3">
        {selectedIds.length > 0 ? (
          <button
            onClick={() => setShowPermisionModal((prev) => !prev)}
            className="btn btn-sm btn-success"
          >
            Permission
          </button>
        ) : (
          <button
            onClick={() => setShowCreateModal((prev) => !prev)}
            className="btn btn-sm btn-success"
          >
            Create User
          </button>
        )}
      </div>
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
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          setShowEditModal((prev) => !prev);
                          setSelectEditUserId(item.id);
                        }}
                      >
                        <i className="ri-edit-line me-1" />
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          setShowDeleteModal((prev) => !prev);
                        }}
                      >
                        <i className="ri-delete-bin-line me-1" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn btn-sm text-white"
            style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
          >
            Previous
          </button>

          <button
            className="btn btn-sm text-white"
            style={{ background: "linear-gradient(135deg, #43cea2, #185a9d)" }}
          >
            Next
          </button>
        </div>
      </div>

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
                  <h5 className="modal-title">Create Menu</h5>
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
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter user email"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter user password"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Role</label>
                      <select
                        className="form-select"
                        aria-label="Disabled select example"
                        // disabled
                      >
                        <option selected>Select Role</option>
                        <option value="1">Admin</option>
                        <option value="2">User</option>
                        <option value="3">Operator</option>
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
                  <button className="btn btn-sm btn-success">Save</button>
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
            onClick={() => setShowEditModal(false)} // 👈 outside click
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
                    onClick={() => setShowEditModal(false)}
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
                              />
                              <span className="ms-2">All</span>
                            </td>

                            {item?.menus.map(
                              (menu: { id: number; menuName: string }) => (
                                <td key={menu.id} className="text-left">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
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
                    onClick={() => setShowEditModal(false)}
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
