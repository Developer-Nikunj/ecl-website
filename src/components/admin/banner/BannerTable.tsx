"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createBanner,
  updateBanner,
  deleteBanner,
  getAllBanner,
} from "@/store/slices/module1/banner/banner.thunk";

import PermissionGate from "@/components/admin/PermissionGate";

const BannerManagementComponent = () => {
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
  const [updateBannerEntry, setUpdateBannerEntry] = useState({
    name: "",
    description: "",
    img: "",
    active: true,
  });
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    limit: 10,
    offset: 0,
  });
  const [selectedUpBannerId, setSelectedUpBannerId] = useState<number | null>(
    null
  );
  const [selectedDlBannerId, setSelectedDlBannerId] = useState<number | null>(
    null
  );
  const { list, loading, error, total, limit, offset } = useAppSelector(
    (state) => state.banner
  );

  console.log("total", total);

  const fetchBanner = async () => {
    await dispatch(
      getAllBanner({
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        limit: filters.limit,
        offset: filters.offset,
      })
    );
  };

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("name", createBannerEntry.name);
    formData.append("description", createBannerEntry.description);
    formData.append("img", createBannerEntry.img); // File object
    formData.append("active", createBannerEntry.active ? "true" : "false");
    const res = await dispatch(createBanner(formData));

    if (createBanner.fulfilled.match(res)) {
      setShowCreateModal(false);
      fetchBanner();
    }

    setCreateBannerEntry({
      name: "",
      description: "",
      active: false,
      img: "",
    });
  };

  const applyFilter = () => {
    fetchBanner();
  };

  const handlePrevious = () => {
    setFilters((prev) => ({
      ...prev,
      offset: Math.max(prev.offset - prev.limit, 0),
    }));
  };

  const handleNext = () => {
    if (filters.offset + filters.limit < total) {
      setFilters((prev) => ({
        ...prev,
        offset: prev.offset + prev.limit,
      }));
    }
  };

  const handleDelete = async () => {
    if (!selectedDlBannerId) return;

    const res = await dispatch(deleteBanner(selectedDlBannerId));

    if (deleteBanner.fulfilled.match(res)) {
      setShowDeleteModal(false);
      setSelectedDlBannerId(null);
    }

    await dispatch(
      getAllBanner({
        limit: filters.limit,
        offset: filters.offset,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
      })
    );
  };

  const handleUpdate = async () => {
    if (!selectedUpBannerId) return;

    const formData = new FormData();
    formData.append("name", updateBannerEntry.name);
    formData.append("description", updateBannerEntry.description);
    formData.append("img", updateBannerEntry.img); // File object
    formData.append("active", updateBannerEntry.active ? "true" : "false");

    const res = await dispatch(
      updateBanner({
        id: selectedUpBannerId,
        data: formData,
      })
    );

    if (updateBanner.fulfilled.match(res)) {
      setShowEditModal(false);
      setUpdateBannerEntry({
        name: "",
        description: "",
        img: "",
        active: true,
      });

      await dispatch(
        getAllBanner({
          limit: filters.limit,
          offset: filters.offset,
          startDate: filters.startDate || undefined,
          endDate: filters.endDate || undefined,
        })
      );
    }
  };

  useEffect(() => {
    fetchBanner();
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
        <button className="btn btn-primary px-4" onClick={() => applyFilter()}>
          Apply
        </button>
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
                  <td>{filters.offset + index + 1}</td>

                  {/* name is HTML */}
                  <td>{item.name}</td>

                  <td>
                    {item.description.length > 50
                      ? item.description.slice(0, 40) + "..."
                      : item.description}
                  </td>

                  <td>
                    <img
                      src={`${item.img}`}
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
                          setShowEditModal(true);
                          setUpdateBannerEntry({
                            name: item.name,
                            description: item.description,
                            active: item.active ? true : false,
                            img: item.img,
                          });
                          setSelectedUpBannerId(item.id);
                          setShowEditModal(true);
                        }}
                      >
                        Edit
                      </button>
                      </PermissionGate>

                      <PermissionGate permission="deletebanner">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          setSelectedDlBannerId(item.id);
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
            disabled={filters.offset + filters.limit >= total}
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
                  <h5 className="modal-title">Create Banner</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowCreateModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Banner Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Banner name"
                        value={createBannerEntry.name}
                        onChange={(e) => {
                          setCreateBannerEntry({
                            ...createBannerEntry,
                            name: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Banner Description</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Banner description"
                        value={createBannerEntry.description}
                        onChange={(e) => {
                          setCreateBannerEntry({
                            ...createBannerEntry,
                            description: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Banner Image</label>
                      <input
                        type="file"
                        id="input"
                        accept="image/*"
                        onChange={(e) => {
                          setCreateBannerEntry({
                            ...createBannerEntry,
                            img: e.target.files?.[0],
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Banner Status</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="footerStatus"
                          checked={createBannerEntry.active}
                          onChange={(e) => {
                            setCreateBannerEntry((prev) => ({
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
                  <h5 className="modal-title">Edit Banner</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Banner Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter banner name"
                        value={updateBannerEntry?.name || ""}
                        onChange={(e) => {
                          setUpdateBannerEntry((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Banner Description</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter banner description"
                        value={updateBannerEntry?.description || ""}
                        onChange={(e) => {
                          setUpdateBannerEntry((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Banner Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setUpdateBannerEntry({
                            ...updateBannerEntry,
                            img: e.target.files?.[0],
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Banner Status</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="footerStatus"
                          checked={updateBannerEntry.active}
                          onChange={(e) => {
                            setUpdateBannerEntry((prev) => ({
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
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => {
                      handleUpdate();
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
                    Are you sure you want to delete this Banner?
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

export default BannerManagementComponent;
