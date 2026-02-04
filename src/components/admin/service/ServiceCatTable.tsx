"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createCategory,
  getAllBlogCat,
  deleteCategory,
  updateCategory,
} from "@/store/slices/module1/blogCategory/blogCategory.thunk";
import PermissionGate from "@/components/admin/PermissionGate";

const ServiceCatPage = () => {
  const dispatch = useAppDispatch();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [categoryEntry, setCategoryEntry] = useState({
    name: "",
    description: "",
    active: 1,
  });
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    limit: 10,
    offset: 0,
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  //   const { loading, error, categories, meta } = useAppSelector(
  //     (state) => state.blogCat
  //   );
  const fetchCategory = () => {
    dispatch(
      getAllBlogCat({
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        limit: filters.limit,
        offset: filters.offset,
      }),
    );
  };

  const handleCreate = async () => {
    const res = await dispatch(
      createCategory({
        name: categoryEntry.name,
        description: categoryEntry.description,
      }),
    );
    if (createCategory.fulfilled.match(res)) {
      setShowCreateModal(false);
      fetchCategory();
    }
    setCategoryEntry({
      name: "",
      description: "",
      active: 1,
    });
  };

  const applyFilter = () => {
    fetchCategory();
  };

  const handlePrevious = () => {
    setFilters((prev) => ({
      ...prev,
      offset: Math.max(prev.offset - prev.limit, 0),
    }));
  };

  const handleNext = () => {
    if (meta && filters.offset + filters.limit < meta.total) {
      setFilters((prev) => ({
        ...prev,
        offset: prev.offset + prev.limit,
      }));
    }
  };

  const handleDelete = async () => {
    if (!selectedCategoryId) return;

    const res = await dispatch(deleteCategory(selectedCategoryId));

    if (deleteCategory.fulfilled.match(res)) {
      setShowDeleteModal(false);
      setSelectedCategoryId(null);

      dispatch(
        getAllBlogCat({
          limit: filters.limit,
          offset: filters.offset,
          startDate: filters.startDate || undefined,
          endDate: filters.endDate || undefined,
        }),
      );
    }
  };

  const handleUpdate = async () => {
    if (!selectedCategoryId) return;

    const res = await dispatch(
      updateCategory({
        id: selectedCategoryId,
        data: {
          name: categoryEntry.name,
          description: categoryEntry.description,
        },
      }),
    );

    if (updateCategory.fulfilled.match(res)) {
      setShowEditModal(false);
      dispatch(
        getAllBlogCat({
          startDate: filters.startDate,
          endDate: filters.endDate,
          limit: filters.limit,
        }),
      );
      setCategoryEntry({
        name: "",
        description: "",
        active: 1,
      });
    }
  };

  const categories = [
    {
      id: 1,
      name: "meeting",
      status: "true",
      description: "Project discussion with team",
      time: "10:30 AM",
    },
    {
      id: 2,
      name: "workout",
      status: "false",
      description: "Morning gym session",
      time: "6:00 AM",
    },
    {
      id: 3,
      name: "study",
      status: "true",
      description: "PostgreSQL indexing concepts",
      time: "8:00 PM",
    },
  ];

  useEffect(() => {
    // fetchCategory();
  }, [filters.limit, filters.startDate, filters.endDate, filters.offset]);

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
      {/* <PermissionGate permission="postrole"> */}
      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={() => setShowCreateModal((prev) => !prev)}
          className="btn btn-sm btn-success"
        >
          Create Category
        </button>
      </div>
      {/* </PermissionGate> */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>SNo.</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.length > 0 &&
              categories.map((item, index) => (
                <tr key={item.id}>
                  <td>{filters.offset + index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.status == "true" ? "Active" : "InActive"}</td>
                  <td>{new Date(item.time).toLocaleDateString("en-GB")}</td>

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
      {showCreateModal && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            onClick={() => setShowCreateModal(false)}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create Blog Category</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowCreateModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Category Name</label>
                    <input className="form-control" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows={3} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Active</label>
                    <select
                      className="form-select"
                      value={categoryEntry.active}
                    >
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-sm btn-success" onClick={() => {}}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}
      {showEditModal && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            onClick={() => setShowEditModal(false)}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Blog Category</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Category Name</label>
                    <input className="form-control" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows={3} />
                  </div>

                  {/* <div className="mb-3">
                    <label className="form-label">Active</label>
                    <select
                      className="form-select"
                      value={categoryEntry.active}
                      onChange={(e) =>
                        setCategoryEntry({
                          ...categoryEntry,
                          active: e.target.value,
                        })
                      }
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div> */}
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-sm btn-success" onClick={() => {}}>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
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
            aria-labelledby="deleteRoleTitle"
            onClick={() => setShowDeleteModal(false)}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-sm"
              role="document"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content rounded-3 shadow">
                <div className="modal-header border-0">
                  <h5 className="modal-title" id="deleteRoleTitle">
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
                    Are you sure you want to delete this Category?
                  </p>
                  <small className="text-muted">
                    This action cannot be undone.
                  </small>
                </div>

                <div className="modal-footer border-0 d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-sm btn-light"
                    onClick={() => setShowDeleteModal(false)}
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

export default ServiceCatPage;
