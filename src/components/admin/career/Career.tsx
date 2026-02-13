"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import PermissionGate from "@/components/admin/PermissionGate";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "@/store/slices/module1/career/career.thunk";
import axios from "axios";
import { title } from "process";
import { set } from "zod";

const Career = () => {
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
  const [selectedCareerId, setSelectedCareerId] = useState(null);
  const [selectedUpCareerId, setSelectedUpCareerId] = useState(null);
  const [careerEntry, setCareerEntry] = useState({
    title: "",
    type: "",
    category: "",
    salary: "",
    location: "",
    description: "",
    active: true,
  });

  const { jobs, error, selectedJob, loading, total } = useAppSelector(
    (state) => state.career,
  );

  console.log("selectedJobOP", selectedJob);

  const fetchCareer = async () => {
    await dispatch(
      getJobs({
        limit: filters.limit,
        offset: filters.offset,
      }),
    );
  };

  const fetchCareerById = async (id: number) => {
    const res = await dispatch(getJobById(id));

    if (getJobById.fulfilled.match(res)) {
      const job = res.payload;

      setCareerEntry({
        title: job.data.title,
        type: job.data.type,
        category: job.data.category,
        salary: job.data.salary,
        location: job.data.location,
        description: job.data.description,
        active: job.data.active,
      });
    }
  };

  const handleCreate = async () => {
    console.log("data", careerEntry);

    const res = await dispatch(
      createJob({
        title: careerEntry.title,
        type: careerEntry.type,
        category: careerEntry.category,
        salary: careerEntry.salary,
        location: careerEntry.location,
        description: careerEntry.description,
        active: careerEntry.active,
      }),
    );

    if (createJob.fulfilled.match(res)) {
      setShowCreateModal(false);
      fetchCareer();
    }
    setCareerEntry({
      title: "",
      type: "",
      category: "",
      salary: "",
      location: "",
      description: "",
      active: true,
    });
  };

  const handleDelete = async () => {
    if (!selectedCareerId) return;

    const res = await dispatch(deleteJob(selectedCareerId));

    if (deleteJob.fulfilled.match(res)) {
      setShowDeleteModal(false);
      setSelectedCareerId(null);
    }

    fetchCareer();
  };

  const applyFilter = () => {
    setFilters({ ...filters, offset: 0 });
    fetchCareer();
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
    if (!selectedUpCareerId) return;
    const res = await dispatch(
      updateJob({
        id: selectedUpCareerId,
        data: careerEntry,
      }),
    );

    if (updateJob.fulfilled.match(res)) {
      setShowEditModal(false);
      setCareerEntry({
        title: "",
        type: "",
        category: "",
        salary: "",
        location: "",
        description: "",
        active: true,
      });
      setSelectedUpCareerId(null);
      fetchCareer();
    }
  };

  useEffect(() => {
    fetchCareer();
    if (selectedUpCareerId) {
      fetchCareerById(selectedUpCareerId);
    }
  }, [
    filters.limit,
    filters.startDate,
    filters.endDate,
    filters.offset,
    selectedUpCareerId,
  ]);

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
      {/* <PermissionGate permission="postblog"> */}
      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-sm btn-success"
        >
          Create Job Post
        </button>
      </div>
      {/* </PermissionGate> */}

      {/* Blog Table */}
      {/* <PermissionGate permission="getblog"> */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>SNo.</th>
              <th>Title</th>
              <th>type</th>
              <th>Category</th>
              <th>Active</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {jobs.length > 0 &&
              jobs.map((item, index) => (
                <tr key={item.id}>
                  <td>{filters.offset + index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.type || "-"}</td>
                  <td>{item.category}</td>
                  <td>
                    {item.active ? (
                      <span className="badge bg-success">Active</span>
                    ) : (
                      <span className="badge bg-danger">Inactive</span>
                    )}
                  </td>
                  <td>{item.salary || "-"}</td>
                  <td>
                    <div className="d-flex gap-2">
                      {/* <PermissionGate permission="putblog"> */}
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          setSelectedUpCareerId(item.id);

                          setShowEditModal(true);
                        }}
                      >
                        Edit
                      </button>
                      {/* </PermissionGate> */}

                      {/* <PermissionGate permission="deleteblog"> */}
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          setSelectedCareerId(item.id);
                          setShowDeleteModal(true);
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
            disabled={filters.offset + filters.limit >= total}
          >
            Next
          </button>
        </div>
      </div>
      {/* </PermissionGate> */}

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
                  <h5 className="modal-title">Create Job Post</h5>
                  <button
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
                        placeholder="Enter Job title"
                        value={careerEntry.title}
                        onChange={(e) => {
                          setCareerEntry((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Type</label>
                      <select
                        className="form-select"
                        style={{ maxHeight: "150px", overflowY: "auto" }}
                        value={careerEntry.type}
                        onChange={(e) => {
                          setCareerEntry((prev) => ({
                            ...prev,
                            type: e.target.value,
                          }));
                        }}
                      >
                        <option value="">Select Category</option>
                        <option value="Part-Time">Part Time</option>
                        <option value="Full-Time">Full Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <select
                        className="form-select"
                        style={{ maxHeight: "150px", overflowY: "auto" }}
                        value={careerEntry.category}
                        onChange={(e) => {
                          setCareerEntry((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }));
                        }}
                      >
                        <option value="">Select Category</option>
                        <option value="Development">Development</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="DevOps">DevOps</option>
                        <option value="QA / Testing">QA / Testing</option>
                        <option value="Data Science">Data Science</option>
                        <option value="AI / Machine Learning">
                          AI / Machine Learning
                        </option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Product Management">
                          Product Management
                        </option>
                        <option value="Project Management">
                          Project Management
                        </option>
                        <option value="Business Development">
                          Business Development
                        </option>
                        <option value="Sales">Sales</option>
                        <option value="Customer Support">
                          Customer Support
                        </option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Finance & Accounting">
                          Finance & Accounting
                        </option>
                        <option value="Operations">Operations</option>
                        <option value="Content Writing">Content Writing</option>
                        <option value="Legal">Legal</option>
                        <option value="Administration">Administration</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Active</label>
                      <select
                        className="form-select"
                        value={careerEntry.active ? "1" : "0"}
                        onChange={(e) => {
                          setCareerEntry((prev) => ({
                            ...prev,
                            active: e.target.value === "1",
                          }));
                        }}
                      >
                        <option value="">Select Status</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Salary</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Job Salary"
                        value={careerEntry.salary}
                        onChange={(e) => {
                          setCareerEntry((prev) => ({
                            ...prev,
                            salary: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Job Location"
                        value={careerEntry.location}
                        onChange={(e) => {
                          setCareerEntry((prev) => ({
                            ...prev,
                            location: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Job Description"
                        value={careerEntry.description}
                        onChange={(e) => {
                          setCareerEntry((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }));
                        }}
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
                  <h5 className="modal-title">Edit Job Post</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <form>
                    {/* Title */}
                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={careerEntry.title}
                        onChange={(e) => {
                          setCareerEntry((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Type</label>
                      <select
                        className="form-select"
                        style={{ maxHeight: "150px", overflowY: "auto" }}
                        value={careerEntry.type}
                        onChange={(e) => {
                          setCareerEntry((prev) => ({
                            ...prev,
                            type: e.target.value,
                          }));
                        }}
                      >
                        <option value="">Select Category</option>
                        <option value="Part-Time">Part Time</option>
                        <option value="Full-Time">Full Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <select
                        className="form-select"
                        style={{ maxHeight: "150px", overflowY: "auto" }}
                        value={careerEntry.category}
                        onChange={(e) => {
                          setCareerEntry((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }));
                        }}
                      >
                        <option value="">Select Category</option>
                        <option value="Development">Development</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="DevOps">DevOps</option>
                        <option value="QA / Testing">QA / Testing</option>
                        <option value="Data Science">Data Science</option>
                        <option value="AI / Machine Learning">
                          AI / Machine Learning
                        </option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Product Management">
                          Product Management
                        </option>
                        <option value="Project Management">
                          Project Management
                        </option>
                        <option value="Business Development">
                          Business Development
                        </option>
                        <option value="Sales">Sales</option>
                        <option value="Customer Support">
                          Customer Support
                        </option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Finance & Accounting">
                          Finance & Accounting
                        </option>
                        <option value="Operations">Operations</option>
                        <option value="Content Writing">Content Writing</option>
                        <option value="Legal">Legal</option>
                        <option value="Administration">Administration</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Active</label>

                      <select
                        className="form-select"
                        value={careerEntry.active ? "1" : "0"}
                        onChange={(e) => {
                          setCareerEntry((prev) => ({
                            ...prev,
                            active: e.target.value === "1",
                          }));
                        }}
                      >
                        <option value="">Select Status</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Salary</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Job Salary"
                        value={careerEntry.salary}
                        onChange={(e) => {
                          setCareerEntry((prev) => ({
                            ...prev,
                            salary: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Job Location"
                        value={careerEntry.location}
                        onChange={(e) => {
                          setCareerEntry((prev) => ({
                            ...prev,
                            location: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Job Description"
                        value={careerEntry.description}
                        onChange={(e) => {
                          setCareerEntry((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }));
                        }}
                      />
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
                  <h5 className="modal-title">Delete Job Post</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowDeleteModal(false)}
                  />
                </div>

                <div className="modal-body text-center">
                  <p className="fw-semibold">
                    Are you sure you want to delete this Job Post?
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

export default Career;
