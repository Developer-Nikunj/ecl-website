"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createRole } from "@/store/slices/module1/roles/roles.thunk";

const RoleTable = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [createRoleEntry, setCreateRoleEntry] = useState({
    name: "",
    description: "",
    status: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  // const loading = useSelector((state: RootState) => state.roles.loading);

  const handleCreate = () => {
    dispatch(
      createRole({
        name: createRoleEntry.name,
        description: createRoleEntry.description,
        status: createRoleEntry.status,
      })
    );
  };


  const data = [
    {
      id: 1,
      name: "Admin",
      description: "AdminAdminAdminAdminAdmin",
      status: "Active",
    },
    {
      id: 2,
      name: "User",
      description: "UserUserUserUserUser",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Operator",
      description: "OperatorOperatorOperatorOperator",
      status: "Active",
    },
    { id: 4, name: "Seo", description: "SeoSeoSeoSeoSeo", status: "Active" },
  ];
  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={() => setShowCreateModal((prev) => !prev)}
          className="btn btn-sm btn-success"
        >
          Create Role
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>SNo.</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
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
                  <h5 className="modal-title">Create Role</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowCreateModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Role Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Role name"
                        value={createRoleEntry.name}
                        onChange={(e) =>
                          setCreateRoleEntry({
                            ...createRoleEntry,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Role Description</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter menu description"
                        value={createRoleEntry.description}
                        onChange={(e) =>
                          setCreateRoleEntry({
                            ...createRoleEntry,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Role Status</label>
                      <select
                        className="form-select mb-3"
                        aria-label="Default select example"
                        value={createRoleEntry.status}
                        onChange={(e) =>
                          setCreateRoleEntry({
                            ...createRoleEntry,
                            status: e.target.value,
                          })
                        }
                      >
                        <option selected>Status</option>
                        <option value="1">Active</option>
                        <option value="2">Inactive</option>
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
                    onClick={handleCreate}
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
            onClick={() => setShowEditModal(false)} // 👈 outside click
          >
            <div
              className="modal-dialog modal-dialog-centered modal-md"
              onClick={(e) => e.stopPropagation()} // 👈 prevent inner click
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Role</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Role Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter menu name"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Role Description</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter menu description"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Role Status</label>
                      <select
                        className="form-select mb-3"
                        aria-label="Default select example"
                      >
                        <option selected>Status</option>
                        <option value="1">Active</option>
                        <option value="2">Inactive</option>
                      </select>
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
                  <h5 className="modal-title">Delete Role</h5>
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
};

export default RoleTable;
