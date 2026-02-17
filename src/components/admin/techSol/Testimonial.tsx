"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import PermissionGate from "@/components/admin/PermissionGate";

const Testimonial = () => {
  const dispatch = useAppDispatch();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [createBannerEntry, setCreateBannerEntry] = useState({
    name: "",
    description: "",
    img: "",
    active: true,
  });

  const list = [
    {
      id: 2,
      icon: "/uploads/recent-works/icons/1771349686015-Rectangle 10.png",
      title: "nikunj",
      slug: "nikunj",
      description:
        "descript iondescrip tiondescri ptiondesc riptiond escription",
      categories: ["nodejs", "mongodb"],
      image: "/uploads/recent-works/images/1771349686019-Rectangle 10.png",
      active: true,
      createdAt: "2026-02-17T17:34:46.029Z",
      updatedAt: "2026-02-17T17:34:46.029Z",
    },
    {
      id: 1,
      icon: "/uploads/recent-works/icons/1771348745190-Rectangle 10.png",
      title: "update erp",
      slug: "update-erp",
      description: "test test",
      categories: [],
      image: "/uploads/recent-works/images/1771348745191-Rectangle 10.png",
      active: false,
      createdAt: "2026-02-17T17:19:05.193Z",
      updatedAt: "2026-02-17T17:28:22.385Z",
    },
  ];

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
      <PermissionGate permission="postbanner">
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-sm btn-success"
            onClick={() => setShowCreateModal((prev) => !prev)}
          >
            Create Banner
          </button>
        </div>
      </PermissionGate>
      <PermissionGate permission="getbanner">
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>SNo.</th>
                <th>Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {list.length > 0 &&
                list.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>

                    {/* name is HTML */}
                    <td>{item.title}</td>

                    <td>
                      {item?.description.length > 50
                        ? item.description.slice(0, 40) + "..."
                        : item.description}
                    </td>

                    <td>
                      <img
                        src={`${item.image}`}
                        alt="preview"
                        style={{
                          width: "90px",
                          height: "90px",
                          objectFit: "cover",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      />
                    </td>

                    <td>
                      <span>{item.active ? "Active" : "Inactive"}</span>
                    </td>

                    <td>
                      <div className="d-flex gap-2">
                        <PermissionGate permission="putbanner">
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => setShowEditModal((prev) => !prev)}
                          >
                            Edit
                          </button>
                        </PermissionGate>

                        <PermissionGate permission="deletebanner">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => setShowDeleteModal((prev) => !prev)}
                          >
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
            >
              Previous
            </button>

            <button
              className="btn btn-sm text-white"
              style={{
                background: "linear-gradient(135deg, #43cea2, #185a9d)",
              }}
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
                  <h5 className="modal-title">Create Recent Works</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowCreateModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Title"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Recent Work  description"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Categories</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="abc , abc , abc"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Image</label>
                      <input type="file" id="input" accept="image/*" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Icon</label>
                      <input type="file" id="input" accept="image/*" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="footerStatus"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="footerStatus"
                        >
                          Active
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
                  <h5 className="modal-title">Edit Recent Work</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Title"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Recent Work  description"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Categories</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="abc , abc , abc"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Image</label>
                      <input type="file" id="input" accept="image/*" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Icon</label>
                      <input type="file" id="input" accept="image/*" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="footerStatus"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="footerStatus"
                        >
                          Active
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
          {/* Modal */}
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="deleteBannerTitle"
            onClick={() => setShowDeleteModal(false)}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-sm"
              role="document"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content rounded-3 shadow">
                <div className="modal-header border-0">
                  <h5 className="modal-title" id="deleteBannerTitle">
                    Confirm Deletion
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setShowDeleteModal(false)}
                  />
                </div>

                <div className="modal-body text-center">
                  <p className="mb-1 fw-semibold">
                    Are you sure you want to delete this Recent Work?
                  </p>
                  <small className="text-muted">
                    This action cannot be undone.
                  </small>
                </div>

                <div className="modal-footer border-0 d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-sm btn-light"
                    onClick={() => {
                      setShowDeleteModal(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-sm btn-danger">Delete</button>
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

export default Testimonial;
