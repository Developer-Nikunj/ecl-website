"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createRecentWork,
  getAllRecentWork,
  updateRecentWork,
  getRecentWorkById,
  deleteRecentWork,
} from "@/store/slices/module1/recentWorks/recentwork.thunk";

import PermissionGate from "@/components/admin/PermissionGate";
import { json } from "sequelize";

const RecentWorks = () => {
  const dispatch = useAppDispatch();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [createEntry, setCreateEntry] = useState({
    title: "",
    description: "",
    active: true,
    image: "",
    icon: "",
    categories: "",
  });

  const [selectedId, setSelectedId] = useState(null);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    limit: 10,
    offset: 0,
  });

  const { works, selectedWork, meta, loading, error } = useAppSelector(
    (state) => state.recentWork,
  );
  // console.log("works", works);
  const fetchRecentWork = async () => {
    await dispatch(
      getAllRecentWork({
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        limit: filters.limit,
        offset: filters.offset,
      }),
    );
  };

  const handleCreate = async () => {
    try {
      const categoryArr = createEntry.categories
        .split(",")
        .map((i) => i.trim());

      const formData = new FormData();
      formData.append("title", createEntry.title);
      formData.append("description", createEntry.description);
      formData.append("categories", JSON.stringify(categoryArr));
      formData.append("image", createEntry.image);
      formData.append("icon", createEntry.icon);
      formData.append("active", createEntry.active ? "true" : "false");

      const res = await dispatch(createRecentWork(formData));

      if (createRecentWork.fulfilled.match(res)) {
        setShowCreateModal(false);
        fetchRecentWork();
      }

      setCreateEntry({
        title: "",
        description: "",
        active: true,
        image: "",
        icon: "",
        categories: "",
      });
    } catch (error) {
      return error;
    }
  };

  const handleUpdate= async () => {
    if(!selectedId) return;
    const categoryArr = createEntry.categories
        .split(",")
        .map((i) => i.trim());

      const formData = new FormData();
      formData.append("title", createEntry.title);
      formData.append("description", createEntry.description);
      formData.append("categories", JSON.stringify(categoryArr));
      formData.append("image", createEntry.image);
      formData.append("icon", createEntry.icon);
      formData.append("active", createEntry.active ? "true" : "false");

      const res = await dispatch(updateRecentWork({slug:selectedId,formData}));

      if (updateRecentWork.fulfilled.match(res)) {
        setShowCreateModal(false);
        fetchRecentWork();
      }

      setCreateEntry({
        title: "",
        description: "",
        active: true,
        image: "",
        icon: "",
        categories: "",
      });

      setSelectedId(null);
      
      setShowEditModal(false);
  };

  const handleDelete = async ()=>{
    try {
      if(!selectedId) return;

      const res = await dispatch(deleteRecentWork(selectedId));

      if(deleteRecentWork.fulfilled.match(res)){
        setShowDeleteModal(false);
        fetchRecentWork();
        setSelectedId(null);
      }
    } catch (error) {
      return error;
    }
  }

  const applyFilter = () => {
    fetchRecentWork();
  }

  const handlePrevious = () => {
    setFilters((prev) => ({
      ...prev,
      offset: Math.max(prev.offset - prev.limit, 0),
    }));
  }
  const handleNext = () => {
    if (meta && filters.offset + filters.limit < meta.total) {
      setFilters((prev) => ({
        ...prev,
        offset: prev.offset + prev.limit,
      }));
    }
  };

  useEffect(() => {
    fetchRecentWork();
  }, [filters.limit, filters.startDate, filters.endDate, filters.offset]);

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
            onChange={(e) => {
              setFilters({ ...filters, limit: Number(e.target.value) });
            }}
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
            onChange={(e) => {
              setFilters({ ...filters, startDate: e.target.value });
            }}
          />
        </div>

        {/* End Date */}
        <div>
          <label className="form-label mb-1">End Date</label>
          <input
            type="date"
            className="form-control"
            value={filters.endDate}
            onChange={(e) => {
              setFilters({ ...filters, endDate: e.target.value });
            }}
          />
        </div>

        {/* Apply Button */}
        <button className="btn btn-primary px-4" onClick={applyFilter}>
          Apply
        </button>
      </div>
      <PermissionGate permission="postbanner">
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-sm btn-success"
            onClick={() => setShowCreateModal((prev) => !prev)}
          >
            Create Recent Work
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
              {works.length > 0 &&
                works.map((item, index) => (
                  <tr key={item.id}>
                    <td>{filters.offset + index + 1}</td>

                    {/* name is HTML */}
                    <td>{item.title}</td>

                    <td>
                      {item?.description
                        ? item.description.length > 50
                          ? item.description.slice(0, 40) + "..."
                          : item.description
                        : "NA"}
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
                            onClick={() => {
                              setSelectedId(item.slug);
                              setCreateEntry({
                                title: item.title,
                                description: item.description,
                                active: item.active,
                                image: item.image,
                                icon: item.icon,
                                categories: item.categories.toString(),
                              });
                              setShowEditModal((prev) => !prev);
                            }}
                          >
                            Edit
                          </button>
                        </PermissionGate>

                        <PermissionGate permission="deletebanner">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              setSelectedId(item.slug);
                              setShowDeleteModal((prev) => !prev);
                            }}
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
              onClick={handlePrevious}
              disabled={filters.offset === 0}
            >
              Previous
            </button>

            <button
              className="btn btn-sm text-white"
              style={{
                background: "linear-gradient(135deg, #43cea2, #185a9d)",
              }}
              onClick={handleNext}
              disabled={!meta || filters.offset + filters.limit >= meta.total}
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
                        value={createEntry.title}
                        onChange={(e) => {
                          setCreateEntry((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Recent Work  description"
                        value={createEntry.description}
                        onChange={(e) => {
                          setCreateEntry((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Categories</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="abc , abc , abc"
                        value={createEntry.categories}
                        onChange={(e) => {
                          setCreateEntry((prev) => ({
                            ...prev,
                            categories: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Image</label>
                      <input
                        type="file"
                        id="input"
                        accept="image/*"
                        onChange={(e) => {
                          setCreateEntry({
                            ...createEntry,
                            image: e.target.files?.[0],
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Icon</label>
                      <input
                        type="file"
                        id="input"
                        accept="image/*"
                        onChange={(e) => {
                          setCreateEntry({
                            ...createEntry,
                            icon: e.target.files?.[0],
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="footerStatus"
                          checked={createEntry.active}
                          onChange={(e) => {
                            setCreateEntry((prev) => ({
                              ...prev,
                              active: e.target.checked,
                            }));
                          }}
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
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleCreate()}
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
                        value={createEntry.title}
                        onChange={(e) => {
                          setCreateEntry((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Recent Work  description"
                        value={createEntry.description}
                        onChange={(e) => {
                          setCreateEntry((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Categories</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="abc , abc , abc"
                        value={createEntry.categories}
                        onChange={(e) => {
                          setCreateEntry((prev) => ({
                            ...prev,
                            categories: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Image</label>
                      <input
                        type="file"
                        id="input"
                        accept="image/*"
                        onChange={(e) => {
                          setCreateEntry({
                            ...createEntry,
                            image: e.target.files?.[0],
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Icon</label>
                      <input
                        type="file"
                        id="input"
                        accept="image/*"
                        onChange={(e) => {
                          setCreateEntry({
                            ...createEntry,
                            icon: e.target.files?.[0],
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="footerStatus"
                          checked={createEntry.active}
                          onChange={(e) => {
                            setCreateEntry((prev) => ({
                              ...prev,
                              active: e.target.checked,
                            }));
                          }}
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
                ``
                <div className="modal-footer">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleUpdate()}
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
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete()}
                  >
                    Delete
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

export default RecentWorks;
