"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createFooter,
  updateFooter,
  deleteFooter,
  getFooter,
  getAllFooter,
} from "@/store/slices/module1/footer/footer.thunk";

import PermissionGate from "@/components/admin/PermissionGate";
import { toast } from "react-toastify";
import ReactQuill from "@/components/RichEditor";
import DOMPurify from "dompurify";

const FooterManagementComponent = () => {
  const dispatch = useAppDispatch();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [createFooterEntry, setCreateFooterEntry] = useState({
    name: "",
    active: true,
  });
  const [updateFooterEntry, setUpdateFooterEntry] = useState({
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
    useAppSelector((state) => state.footer);

  console.log("items", items);

  const fetchFooter = async () => {
    await dispatch(
      getAllFooter({
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        limit: filters.limit,
        offset: filters.offset,
      })
    );
  };

  const handleCreate = async () => {
    if (!createFooterEntry.name) {
      toast.warn("Footer content required!!");
    }
    const res = await dispatch(
      createFooter({
        name: createFooterEntry.name,
        active: createFooterEntry.active,
      })
    );
    if (createFooter.fulfilled.match(res)) {
      setShowCreateModal(false);
      fetchFooter();
    }
    setCreateFooterEntry({
      name: "",
      active: true,
    });
  };

  const handleDelete = async () => {
    if (!selectDeleteId) return;

    const res = await dispatch(deleteFooter(selectDeleteId));

    if (deleteFooter.fulfilled.match(res)) {
      setShowDeleteModal(false);
      setselectDeleteId(null);

      await dispatch(
        getAllFooter({
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
      updateFooter({
        id: selectUpdateId,
        data: {
          name: updateFooterEntry.name,
          active: updateFooterEntry.active,
        },
      })
    );

    if (updateFooter.fulfilled.match(res)) {
      setShowEditModal(false);
      setUpdateFooterEntry({
        name: "",
        active: true,
      });
      await dispatch(
        getAllFooter({
          limit: filters.limit,
          offset: filters.offset,
          startDate: filters.startDate || undefined,
          endDate: filters.endDate || undefined,
        })
      );
    }
  };

  const applyFilter = ()=>fetchFooter();

  const handlePrevious = ()=>{
    setFilters((prev)=>({
      ...prev,
      offset:Math.max(prev.offset - prev.limit,0)
    }))
  }

  const handleNext = ()=>{
    if(filters.offset + filters.limit < total){
      setFilters((prev)=>({
        ...prev,
        offset:prev.offset + prev.limit,
      }))
    }
  }

  useEffect(() => {
    fetchFooter();
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

      <PermissionGate permission="postfooter">
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-sm btn-success"
            onClick={() => setShowCreateModal((prev) => !prev)}
          >
            Create Footer
          </button>
        </div>
      </PermissionGate>
      <PermissionGate permission="getfooter">
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
                    <td>
                      <div
                        style={{
                          maxHeight: "150px", // Limit the height
                          overflowY: "auto", // Scroll when content exceeds
                          padding: "0.5rem", // Some inner spacing
                          background: "#f8f9fa", // Light box background
                          border: "1px solid #dee2e6", // Subtle border
                          borderRadius: "4px", // Rounded corners
                          whiteSpace: "normal", // Allow wrapping
                        }}
                        dangerouslySetInnerHTML={{ __html: item.name }}
                      />
                    </td>

                    <td>
                      <span>{item.active ? "Active" : "Inactive"}</span>
                    </td>

                    <td>
                      <div className="d-flex gap-2">
                        <PermissionGate permission="putfooter">
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => {
                              setselectUpdateId(item.id);
                              setUpdateFooterEntry({
                                name: item.name,
                                active: item.active,
                              });
                              setShowEditModal(true);
                            }}
                          >
                            Edit
                          </button>
                        </PermissionGate>

                        <PermissionGate permission="deletefooter">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              setselectDeleteId(item.id);
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
            style={{ background: "rgba(0,0,0,0.3)" }}
            onClick={() => setShowCreateModal(false)}
          >
            <div
              className="modal-dialog modal-fullscreen"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="modal-content shadow-lg"
                style={{ borderRadius: "0.5rem" }}
              >
                {/* Modal Header */}
                <div className="modal-header bg-white border-bottom">
                  <h5 className="modal-title fw-bold">Create Footer</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowCreateModal(false)}
                  />
                </div>

                {/* Modal Body */}
                <div
                  className="modal-body p-4"
                  style={{
                    maxHeight: "calc(100vh - 120px)",
                    overflowY: "auto",
                  }}
                >
                  <form className="mb-4">
                    {/* Footer HTML Input */}
                    <div className="mb-4">
                      <label className="form-label fw-bold mb-2">
                        Footer Content (HTML)
                      </label>
                      <textarea
                        className="form-control"
                        rows={10}
                        placeholder="Paste footer HTML here"
                        value={createFooterEntry.name}
                        onChange={(e) =>
                          setCreateFooterEntry({
                            ...createFooterEntry,
                            name: e.target.value,
                          })
                        }
                        style={{ fontFamily: "monospace", fontSize: "0.95rem" }}
                      />
                    </div>

                    {/* Footer Status */}
                    <div className="mb-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="footerStatus"
                          checked={createFooterEntry.active}
                          onChange={(e) =>
                            setCreateFooterEntry((prev) => ({
                              ...prev,
                              active: e.target.checked,
                            }))
                          }
                        />
                        <label
                          className="form-check-label fw-bold"
                          htmlFor="footerStatus"
                        >
                          Active
                        </label>
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="card">
                      <div className="card-header fw-bold bg-white border-bottom">
                        Preview
                      </div>
                      <div className="card-body p-0">
                        <div
                          style={{
                            maxHeight: "60vh",
                            overflowY: "auto",
                            padding: "1rem",
                            background: "#fff",
                            color: "#000",
                            borderRadius: "0 0 0.25rem 0.25rem",
                            border: "1px solid #dee2e6",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: createFooterEntry.name,
                          }}
                        />
                      </div>
                    </div>
                  </form>
                </div>

                {/* Modal Footer */}
                <div className="modal-footer border-top">
                  <button
                    className="btn btn-outline-secondary btn-lg"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary btn-lg fw-bold"
                    onClick={() => handleCreate()}
                  >
                    Save Footer
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
                  <h5 className="modal-title">Edit Footer</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Footer Content</label>
                      <div className="mb-3">
                        {/* <label className="form-label">Footer Content</label> */}
                        <ReactQuill
                          theme="snow"
                          value={updateFooterEntry.name}
                          onChange={(value) => {
                            setUpdateFooterEntry((prev) => ({
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
                              __html: updateFooterEntry.name,
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
                        Footer Status
                      </label>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="footerStatus"
                          checked={updateFooterEntry.active}
                          onChange={(e) =>
                            setUpdateFooterEntry((prev) => ({
                              ...prev,
                              active: e.target.checked,
                            }))
                          }
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
                    Are you sure you want to delete this Footer?
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

export default FooterManagementComponent;
