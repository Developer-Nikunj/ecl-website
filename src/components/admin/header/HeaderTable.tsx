"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createHeader,
  updateHeader,
  deleteHeader,
  getHeader,
  getAllHeader,
} from "@/store/slices/module1/header/header.thunk";

import PermissionGate from "@/components/admin/PermissionGate";
import { toast } from "react-toastify";
import ReactQuill from "@/components/RichEditor";
import DOMPurify from "dompurify";

const HeaderManagementComponent = () => {
  const dispatch = useAppDispatch();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [createHeaderEntry, setHeaderEntry] = useState({
    name: "",
    active: true,
  });
  const [updateHeaderEntry, setUpdateHeaderEntry] = useState({
    name: "",
    active: true,
  });
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    limit: 10,
    offset: 0,
  });
  const [selectDeleteId, setselectDeleteId] = useState<number | null>(null);
  const [selectUpdateId, setselectUpdateId] = useState<number | null>(null);

  const { items, total, limit, offset, single, loading, error } =
    useAppSelector((state) => state.header);

  console.log("items", items);

  const fetchHeader = async () => {
    await dispatch(
      getAllHeader({
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        limit: filters.limit,
        offset: filters.offset,
      })
    );
  };

  const handleCreate = async () => {
    if (!createHeaderEntry.name) {
      toast.warn("Header content required!!");
    }
    const res = await dispatch(
      createHeader({
        name: createHeaderEntry.name,
        active: createHeaderEntry.active,
      })
    );
    if (createHeader.fulfilled.match(res)) {
      setShowCreateModal(false);
      fetchHeader();
    }
    setHeaderEntry({
      name: "",
      active: true,
    });
  };

  const handleDelete = async () => {
    if (!selectDeleteId) return;

    const res = await dispatch(deleteHeader(selectDeleteId));

    if (deleteHeader.fulfilled.match(res)) {
      setShowDeleteModal(false);
      setselectDeleteId(null);

      await dispatch(
        getAllHeader({
          limit: filters.limit,
          offset: filters.offset,
          startDate: filters.startDate || undefined,
          endDate: filters.endDate || undefined,
        })
      );
    }
  };

  const handleUpdate = async () => {
    if (!selectUpdateId) return;

    const res = await dispatch(
      updateHeader({
        id: selectUpdateId,
        data: {
          name: updateHeaderEntry.name,
          active: updateHeaderEntry.active,
        },
      })
    );

    if (updateHeader.fulfilled.match(res)) {
      setShowEditModal(false);
      setUpdateHeaderEntry({
        name: "",
        active: true,
      });
      await dispatch(
        getAllHeader({
          limit: filters.limit,
          offset: filters.offset,
          startDate: filters.startDate || undefined,
          endDate: filters.endDate || undefined,
        })
      );
    }
  };

  const applyFilter = () => fetchHeader();

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

  useEffect(() => {
    fetchHeader();
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
      {/* <PermissionGate permission="postrole"> */}
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-sm btn-success"
          onClick={() => setShowCreateModal((prev) => !prev)}
        >
          Create Header
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
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {items.length > 0 &&
              items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>

                  {/* name is HTML */}
                  <td dangerouslySetInnerHTML={{ __html: item.name }} />

                  <td>
                    <span>{item.active ? "Active" : "Inactive"}</span>
                  </td>

                  <td>
                    <div className="d-flex gap-2">
                      {/* <PermissionGate permission="putheader"> */}
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          setselectUpdateId(item.id);
                          setUpdateHeaderEntry({
                            name: item.name,
                            active: item.active,
                          });
                          setShowEditModal(true);
                        }}
                      >
                        Edit
                      </button>
                      {/* </PermissionGate> */}

                      {/* <PermissionGate permission="deleteheader"> */}
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          setselectDeleteId(item.id);
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
                  <h5 className="modal-title">Create Header</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowCreateModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Header Content</label>
                      <ReactQuill
                        theme="snow"
                        value={createHeaderEntry.name}
                        onChange={(value) =>
                          setHeaderEntry({
                            ...createHeaderEntry,
                            name: value,
                          })
                        }
                        modules={{
                          toolbar: [
                            [{ header: [1, 2, 3, 4, 5, false] }],
                            [{ font: [] }],
                            [{ size: ["small", false, "large", "huge"] }],

                            ["bold", "italic", "underline", "strike"],
                            [{ color: [] }, { background: [] }],

                            [{ script: "sub" }, { script: "super" }],
                            [{ list: "ordered" }, { list: "bullet" }],
                            [{ indent: "-1" }, { indent: "+1" }],
                            [{ align: [] }],

                            ["blockquote", "code-block"],
                            ["link", "image"],

                            ["clean"],
                          ],
                        }}
                        className="bg-white"
                      />

                      <div className="card mt-3">
                        <div className="card-header fw-bold">Preview</div>
                        <div
                          className="card-body"
                          dangerouslySetInnerHTML={{
                            __html: createHeaderEntry.name,
                          }}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label d-block">
                        Header Status
                      </label>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="headerStatus"
                          checked={createHeaderEntry.active}
                          onChange={(e) =>
                            setHeaderEntry((prev) => ({
                              ...prev,
                              active: e.target.checked,
                            }))
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="headerStatus"
                        >
                          Active
                        </label>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="modal-header">
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
                      <label className="form-label">Header Content</label>
                      <div className="mb-3">
                        <label className="form-label">Header Content</label>
                        <ReactQuill
                          theme="snow"
                          value={updateHeaderEntry.name}
                          onChange={(value) => {
                            setUpdateHeaderEntry((prev) => ({
                              ...prev,
                              name: value,
                            }));
                          }}
                          modules={{
                            toolbar: [
                              [{ header: [1, 2, 3, 4, 5, false] }],
                              [{ font: [] }],
                              [{ size: ["small", false, "large", "huge"] }],

                              ["bold", "italic", "underline", "strike"],
                              [{ color: [] }, { background: [] }],

                              [{ script: "sub" }, { script: "super" }],
                              [{ list: "ordered" }, { list: "bullet" }],
                              [{ indent: "-1" }, { indent: "+1" }],
                              [{ align: [] }],

                              ["blockquote", "code-block"],
                              ["link", "image"],

                              ["clean"],
                            ],
                          }}
                          className="bg-white"
                        />

                        <div className="card mt-3">
                          <div className="card-header fw-bold">Preview</div>
                          <div
                            className="card-body"
                            dangerouslySetInnerHTML={{
                              __html: updateHeaderEntry.name,
                            }}
                          />
                        </div>
                      </div>
                      {/* <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Header content"
                        value={updateHeaderEntry.name}
                        onChange={(e) => {
                          setUpdateHeaderEntry((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }));
                        }}
                      /> */}
                    </div>
                    <div className="mb-3">
                      <label className="form-label d-block">
                        Header Status
                      </label>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="headerStatus"
                          checked={updateHeaderEntry.active}
                          onChange={(e) =>
                            setUpdateHeaderEntry((prev) => ({
                              ...prev,
                              active: e.target.checked,
                            }))
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="headerStatus"
                        >
                          Active
                        </label>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="modal-header">
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
                    Are you sure you want to delete this Header?
                  </p>
                  <small className="text-muted">
                    This action cannot be undone.
                  </small>
                </div>

                <div className="modal-header border-0 d-flex justify-content-end gap-2">
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

export default HeaderManagementComponent;
