"use client"

import React, { useState } from 'react'
import { Options } from '../../../../public/assets/backend/libs/choices.js/public/types/src/scripts/interfaces/options';

const MenuTable = () => {
  const [showCreateModal,setShowCreateModal] = useState(false);
  const [showEditModal,setShowEditModal] = useState(false);
  const [showDeleteModal,setShowDeleteModal] = useState(false);
  const data = [
    { id: 1, name: "Dashboard", slug: "dashboard", status: "Active" },
    { id: 2, name: "Users", slug: "users", status: "Inactive" },
    { id: 3, name: "Roles", slug: "roles", status: "Active" },
    { id: 4, name: "Settings", slug: "settings", status: "Active" },
  ];
  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={() => setShowCreateModal((prev) => !prev)}
          className="btn btn-sm btn-success"
        >
          Create Menu
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>SNo.</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.slug}</td>
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
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => setShowDeleteModal((prev) => !prev)}
                    >
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

export default MenuTable
