"use client"

import React, { useState } from 'react'
import { Options } from '../../../../public/assets/backend/libs/choices.js/public/types/src/scripts/interfaces/options';

const UsersTable = () => {
  const [showCreateModal,setShowCreateModal] = useState(false);
  const [showEditModal,setShowEditModal] = useState(false);
  const [showDeleteModal,setShowDeleteModal] = useState(false);
  const [selectedUsers,setSelectedUser] = useState([]);

  const data = [
    { id: 1, name: "nikunj", role: "admin", status: "Active" },
    { id: 2, name: "kamal", role: "user", status: "Inactive" },
    { id: 3, name: "raj", role: "user", status: "Active" },
    { id: 4, name: "aamar", role: "user", status: "Active" },
  ];
  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        {selectedUsers.length > 0 ? (
          <button
            onClick={() => setShowCreateModal((prev) => !prev)}
            className="btn btn-sm btn-success"
          >
            Permissions
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
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
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
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`check-${item.id}`}
                    ></label>
                  </div>
                </th>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.role}</td>
                <td>
                  <span
                    className={`badge ${
                      item.status === "Active" ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setShowEditModal((prev) => !prev)}
                    >
                      <i className="ri-edit-line me-1" />
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => setShowDeleteModal((prev) => !prev)}
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
              className="modal-dialog modal-dialog-centered modal-md"
              onClick={(e) => e.stopPropagation()} // 👈 prevent inner click
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Menu</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Menu Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter menu name"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Options</label>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="selectAll"
                        />
                        <label className="form-check-label" htmlFor="selectAll">
                          Select All
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="create"
                        />
                        <label className="form-check-label" htmlFor="create">
                          Create
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="get"
                        />
                        <label className="form-check-label" htmlFor="get">
                          Get
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="update"
                        />
                        <label className="form-check-label" htmlFor="update">
                          Update
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="delete"
                        />
                        <label className="form-check-label" htmlFor="delete">
                          Delete
                        </label>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => setShowEditModal(false)}
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
    </div>
  );
}

export default UsersTable;
