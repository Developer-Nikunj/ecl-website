"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createtestimonial,
  getAlltestimonial,
  deletetestimonial,
  updatetestimonial,
} from "@/store/slices/module1/testimonial/testimonial.thunk";

import PermissionGate from "@/components/admin/PermissionGate";

const TestimonialPage = () => {
  const dispatch = useAppDispatch();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [createTestimonialEntry, setCreateTestimonialEntry] = useState({
    name: "",
    description: "",
    img: "",
    active: true,
  });
  const [updateTestimonialEntry, setUpdateTestimonialEntry] = useState({
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
  const [selectedUpTestimonialId, setSelectedUpTestimonialId] = useState<
    number | null
  >(null);
  const [selectedDlTestimonialId, setSelectedDlTestimonialId] = useState<
    number | null
  >(null);
  const { list, loading, error, total, limit, offset } = useAppSelector(
    (state) => state.testimonial
  );
  console.log("total", list,total);

  const fetchTestimonial = async () => {
    await dispatch(
      getAlltestimonial({
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        limit: filters.limit,
        offset: filters.offset,
      })
    );
  };
  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("name", createTestimonialEntry.name);
    formData.append("description", createTestimonialEntry.description);
    formData.append("img", createTestimonialEntry.img); // File object
    formData.append("active", createTestimonialEntry.active ? "true" : "false");
    const res = await dispatch(createtestimonial(formData));

    if (createtestimonial.fulfilled.match(res)) {
      setShowCreateModal(false);
      fetchTestimonial();
    }

    setCreateTestimonialEntry({
      name: "",
      description: "",
      active: false,
      img: "",
    });
  };
  const applyFilter = () => {
    fetchTestimonial();
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
    if (!selectedDlTestimonialId) return;

    const res = await dispatch(deletetestimonial(selectedDlTestimonialId));

    if (deletetestimonial.fulfilled.match(res)) {
      setShowDeleteModal(false);
      setSelectedDlTestimonialId(null);
    }

    await dispatch(
      getAlltestimonial({
        limit: filters.limit,
        offset: filters.offset,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
      })
    );
  };
  const handleUpdate = async () => {
    if (!selectedUpTestimonialId) return;

    const formData = new FormData();
    formData.append("name", updateTestimonialEntry.name);
    formData.append("description", updateTestimonialEntry.description);
    formData.append("img", updateTestimonialEntry.img); // File object
    formData.append("active", updateTestimonialEntry.active ? "true" : "false");

    const res = await dispatch(
      updatetestimonial({
        id: selectedUpTestimonialId,
        data: formData,
      })
    );

    if (updatetestimonial.fulfilled.match(res)) {
      setShowEditModal(false);
      setUpdateTestimonialEntry({
        name: "",
        description: "",
        img: "",
        active: true,
      });

      await dispatch(
        getAlltestimonial({
          limit: filters.limit,
          offset: filters.offset,
          startDate: filters.startDate || undefined,
          endDate: filters.endDate || undefined,
        })
      );
    }
  };

  useEffect(() => {
    fetchTestimonial();
  }, [filters.limit, filters.startDate, filters.endDate, filters.offset]);

  const roles = [
    {
      id: 1,
      name: "<footer>About Us</footer>",
      description: "Company introduction section",
      active: true,
    },
    {
      id: 2,
      name: "<footer>Quick Links</footer>",
      description: "Important navigation links",
      active: true,
    },
    {
      id: 3,
      name: "<footer>Contact Info</footer>",
      description: "Phone, email, address",
      active: false,
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
      {/* <PermissionGate permission="postrole"> */}
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-sm btn-success"
          onClick={() => setShowCreateModal((prev) => !prev)}
        >
          Create Testimonial
        </button>
      </div>
      {/* </PermissionGate> */}
      {/* <PermissionGate permission="getrole"> */}
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
                      {/* <PermissionGate permission="putfooter"> */}
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          setShowEditModal(true);
                          setUpdateTestimonialEntry({
                            name: item.name,
                            description: item.description,
                            active: item.active ? true : false,
                            img: item.img,
                          });
                          setSelectedUpTestimonialId(item.id);
                          setShowEditModal(true);
                        }}
                      >
                        Edit
                      </button>
                      {/* </PermissionGate> */}

                      {/* <PermissionGate permission="deletefooter"> */}
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          setSelectedDlTestimonialId(item.id);
                          setShowDeleteModal((prev) => !prev);
                        }}
                      >
                        Delete
                      </button>
                      {/* </PermissionGate> */}
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
      {/* </PermissionGate> */}

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
                  <h5 className="modal-title">Create Testimonial</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowCreateModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Testimonial Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Testimonial name"
                        value={createTestimonialEntry.name}
                        onChange={(e) => {
                          setCreateTestimonialEntry({
                            ...createTestimonialEntry,
                            name: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Testimonial Description
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Testimonial description"
                        value={createTestimonialEntry.description}
                        onChange={(e) => {
                          setCreateTestimonialEntry({
                            ...createTestimonialEntry,
                            description: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Testimonial Image</label>
                      <input
                        type="file"
                        id="input"
                        accept="image/*"
                        onChange={(e) => {
                          setCreateTestimonialEntry({
                            ...createTestimonialEntry,
                            img: e.target.files?.[0],
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Testimonial Status</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="TestimonialStatus"
                          checked={createTestimonialEntry.active}
                          onChange={(e) => {
                            setCreateTestimonialEntry((prev) => ({
                              ...prev,
                              active: e.target.checked,
                            }));
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="TestimonialStatus"
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
                  <h5 className="modal-title">Edit Testimonial</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Testimonial Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Testimonial name"
                        value={updateTestimonialEntry?.name || ""}
                        onChange={(e) => {
                          setUpdateTestimonialEntry((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Testimonial Description
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Testimonial description"
                        value={updateTestimonialEntry?.description || ""}
                        onChange={(e) => {
                          setUpdateTestimonialEntry((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Testimonial Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setUpdateTestimonialEntry({
                            ...updateTestimonialEntry,
                            img: e.target.files?.[0],
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Testimonial Status</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="TestimonialStatus"
                          checked={updateTestimonialEntry.active}
                          onChange={(e) => {
                            setUpdateTestimonialEntry((prev) => ({
                              ...prev,
                              active: e.target.checked,
                            }));
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="TestimonialStatus"
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
            aria-labelledby="deleteTestimonialTitle"
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
                    Are you sure you want to delete this Testimonial ?
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

export default TestimonialPage;
