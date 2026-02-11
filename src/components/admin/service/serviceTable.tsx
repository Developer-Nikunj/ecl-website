"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import PermissionGate from "@/components/admin/PermissionGate";
import {
  createService,
  deleteService,
  getAllService,
  updateService,
  serviceItem,
} from "@/store/slices/module1/service/service.thunk";
import axios from "axios";

const ServiceTable = () => {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState({
    limit: 10,
    offset: 0,
    startDate: "",
    endDate: "",
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [serviceEntry, setServiceEntry] = useState({
    name: "",
    description: "",
    details: "",
    active: true,
    category: "",
    image: "",
  });
  const [editBlogData, setEditBlogData] = useState({
    name: "",
    description: "",
    details: "",
    active: true,
    category: "",
    image: "",
  });

  const [cat, setCat] = useState([]);

    const { loading, error, list, meta } = useAppSelector(
      (state) => state.service,
    );

  console.log("list", list);

  const fetchServices = async () => {
    await dispatch(
      getAllService({
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        limit: filters.limit,
        offset: filters.offset,
      }),
    );
  };

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("name", serviceEntry.name);
    formData.append("description", serviceEntry.description);
    formData.append("details", serviceEntry.details);
    formData.append("active", serviceEntry.active ? "true" : "false");
    formData.append("category", serviceEntry.category);
    formData.append("image", serviceEntry.image);

    const res = await dispatch(createService(formData));
    formData.forEach((i) => {
      console.log(i);
    });
    if (createService.fulfilled.match(res)) {
      setShowCreateModal(false);
      fetchServices();
    }
    setServiceEntry({
      name: "",
      description: "",
      details: "",
      active: true,
      category: "",
      image: "",
    });
  };

  const handleDelete = async () => {
    if (!selectedServiceId) return;

    const res = await dispatch(deleteService(selectedServiceId));

    if (deleteService.fulfilled.match(res)) {
      setShowDeleteModal(false);
      setSelectedServiceId(null);
    }

    await dispatch(
      getAllService({
        limit: filters.limit,
        offset: filters.offset,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
      }),
    );
  };

  const applyFilter = () => {
    setFilters({ ...filters, offset: 0 });
    fetchServices();
  };

  const handleNext = () => {
    setFilters({
      ...filters,
      offset: filters.offset + filters.limit,
    });
  };

  const handlePrevious = () => {
    setFilters({
      ...filters,
      offset: Math.max(0, filters.offset - filters.limit),
    });
  };

  const handleUpdate = async () => {
    if (!selectedServiceId) return;
    const formData = new FormData();
    formData.append("name", serviceEntry.name);
    formData.append("description", serviceEntry.description);
    formData.append("details", serviceEntry.details);
    formData.append("active", serviceEntry.active ? "true" : "false");
    formData.append("category", serviceEntry.category);
    formData.append("image", serviceEntry.image);

    const res = await dispatch(
      updateService({
        id: selectedServiceId,
        data: formData,
      }),
    );

    if (updateService.fulfilled.match(res)) {
      setShowEditModal(false);
      setServiceEntry({
        name: "",
        description: "",
        details: "",
        active: true,
        category: "",
        image: "",
      });

      await dispatch(
        getAllService({
          limit: filters.limit,
          offset: filters.offset,
          startDate: filters.startDate || undefined,
          endDate: filters.endDate || undefined,
        }),
      );
    }
  };

  const fetchCategory = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/service`,
      );

      setCat(res.data.data);
      console.log("cat (api response)", res.data); // ✅ correct
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const truncateWords = (text, limit = 20) => {
    if (!text) return "-";
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + " ..."
      : text;
  };


  useEffect(() => {
    fetchServices();
    fetchCategory();
  }, [filters.limit, filters.startDate, filters.endDate, filters.offset]);


  return (
    <div>
      <div className="d-flex align-items-end gap-3 mb-3 flex-wrap">
        {/* Total Rows */}
        <div>
          <label className="form-label mb-1">Total Rows</label>
          <select
            className="form-select"
            value={filters.limit}
            onChange={(e) =>
              setFilters({ ...filters, limit: Number(e.target.value) })
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
              setFilters({ ...filters, startDate: e.target.value })
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
              setFilters({ ...filters, endDate: e.target.value })
            }
          />
        </div>

        <button className="btn btn-primary px-4" onClick={applyFilter}>
          Apply
        </button>
      </div>

      {/* Create Blog */}
      <PermissionGate permission="postservice">
      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-sm btn-success"
        >
          Create Service
        </button>
      </div>
      </PermissionGate>

      {/* Blog Table */}
      <PermissionGate permission="getservice">
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>SNo.</th>
              <th>Name</th>
              <th>Description</th>
              <th>details</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {list.length > 0 &&
              list.map((item, index) => (
                <tr key={item.id}>
                  <td>{filters.offset + index + 1}</td>
                  <td>{truncateWords(item.name)}</td>
                  <td>{truncateWords(item.description || "-")}</td>
                  <td>{truncateWords(item.details)}</td>
                  <td>
                    {item.active ? (
                      <span className="badge bg-success">Active</span>
                    ) : (
                      <span className="badge bg-danger">Inactive</span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <PermissionGate permission="putservice">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          setSelectedServiceId(item.id);
                          // setEditBlogData(item);
                          setShowEditModal(true);
                          setServiceEntry({
                            name: item.name,
                            description: item.description,
                            details: item.details,
                            active: item.active ? true : false,
                            image: item.image,
                            category: item?.category || "",
                          });
                        }}
                      >
                        Edit
                      </button>
                      </PermissionGate>

                      <PermissionGate permission="deleteservice">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          setSelectedServiceId(item.id);
                          setShowDeleteModal(true);
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

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn btn-sm text-white"
            style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}
            onClick={handlePrevious}
            disabled={filters.offset === 0}
          >
            Previous
          </button>

          <button
            className="btn btn-sm text-white"
            style={{ background: "linear-gradient(135deg,#43cea2,#185a9d)" }}
            onClick={handleNext}
            // disabled={!meta || filters.offset + filters.limit >= meta.total}
          >
            Next
          </button>
        </div>
      </div>
      </PermissionGate>

      {showCreateModal && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            onClick={() => setShowCreateModal(false)}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create Service</h5>
                  <button
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
                        placeholder="Enter Service Name"
                        value={serviceEntry.name}
                        onChange={(e) =>
                          setServiceEntry({
                            ...serviceEntry,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Short description"
                        value={serviceEntry.description}
                        onChange={(e) =>
                          setServiceEntry({
                            ...serviceEntry,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Details</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        value={serviceEntry.details}
                        onChange={(e) =>
                          setServiceEntry({
                            ...serviceEntry,
                            details: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="statusCheck"
                          checked={serviceEntry.active}
                          onChange={(e) =>
                            setServiceEntry({
                              ...serviceEntry,
                              active: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="statusCheck"
                        >
                          Active
                        </label>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <select
                        className="form-select"
                        style={{ maxHeight: "150px", overflowY: "auto" }}
                        value={serviceEntry.category}
                        onChange={(e) =>
                          setServiceEntry({
                            ...serviceEntry,
                            category: e.target.value,
                          })
                        }
                      >
                        <option value="">Select Category</option>
                        {cat.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Image</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) =>
                          setServiceEntry({
                            ...serviceEntry,
                            image: e.target.files[0],
                          })
                        }
                      />
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
              className="modal-dialog modal-dialog-centered modal-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Service</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <form>
                    {/* Title */}
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={serviceEntry.name}
                        onChange={(e) =>
                          setServiceEntry({
                            ...serviceEntry,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        value={serviceEntry.description}
                        onChange={(e) =>
                          setServiceEntry({
                            ...serviceEntry,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Details</label>
                      <textarea
                        className="form-control"
                        rows={5}
                        value={serviceEntry.details}
                        onChange={(e) =>
                          setServiceEntry({
                            ...serviceEntry,
                            details: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Category */}
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <select
                        className="form-select"
                        style={{ maxHeight: "150px", overflowY: "auto" }}
                        value={serviceEntry.category?.toString() || ""}
                        onChange={(e) =>
                          setServiceEntry({
                            ...serviceEntry,
                            category: e.target.value || "",
                          })
                        }
                      >
                        <option value="">Select Category</option>
                        {cat.map((c) => (
                          <option key={c.id} value={c.name.toString()}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Active */}
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="activeCheck"
                        checked={serviceEntry.active}
                        onChange={(e) =>
                          setServiceEntry({
                            ...serviceEntry,
                            active: e.target.checked,
                          })
                        }
                      />
                      <label className="form-check-label" htmlFor="activeCheck">
                        Active
                      </label>
                    </div>

                    {/* Featured Image */}
                    <div className="mb-3">
                      <label className="form-label">Featured Image</label>

                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          setServiceEntry({
                            ...serviceEntry,
                            image: file,
                            img: URL.createObjectURL(file), // ✅ preview
                          });
                        }}
                      />

                      {serviceEntry.image && (
                        <img
                          src={serviceEntry.image}
                          alt="preview"
                          className="img-fluid rounded mt-2"
                          style={{ maxHeight: "120px" }}
                        />
                      )}
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
                    onClick={handleUpdate}
                  >
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
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            onClick={() => setShowDeleteModal(false)}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Delete Blog</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowDeleteModal(false)}
                  />
                </div>

                <div className="modal-body text-center">
                  <p className="fw-semibold">
                    Are you sure you want to delete this Service?
                  </p>
                  <small className="text-muted">
                    This action cannot be undone.
                  </small>
                </div>

                <div className="modal-footer justify-content-end">
                  <button
                    className="btn btn-sm btn-light"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show" />
        </>
      )}
    </div>
  );
};

export default ServiceTable;
