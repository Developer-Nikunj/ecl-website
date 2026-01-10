"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";


import PermissionGate from "@/components/admin/PermissionGate"

const SeoTable = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [createRoleEntry, setCreateRoleEntry] = useState({
    name: "",
    description: "",
    status: "",
  });
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    limit: 10,
    offset: 0,
  });
 

const seoData = [
  {
    id: 1,
    slug: "web-design-and-development",
    title: "Web Design & Development",
    metaTitle: "Web Design & Development Services | Expert Code Lab",
    category: "Web Development",
    status: 1,
    createdAt: "2025-01-10",
  },
  {
    id: 2,
    slug: "digital-marketing",
    title: "Digital Marketing Services",
    metaTitle: "Digital Marketing Company | Expert Code Lab",
    category: "Digital Marketing",
    status: 1,
    createdAt: "2025-01-12",
  },
  {
    id: 3,
    slug: "ui-ux-design",
    title: "UI / UX Design Services",
    metaTitle: "UI UX Design Services | Expert Code Lab",
    category: "Design",
    status: 0,
    createdAt: "2025-01-15",
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
        <button className="btn btn-primary px-4">Apply</button>
      </div>
      {/* <PermissionGate permission="postrole"> */}
      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={() => setShowCreateModal((prev) => !prev)}
          className="btn btn-sm btn-success"
        >
          Create Seo
        </button>
      </div>
      {/* </PermissionGate> */}
      {/* <PermissionGate permission="getrole"> */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>SNo.</th>
              <th>Slug</th>
              <th>Title</th>
              <th>Meta Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {seoData.length > 0 &&
              seoData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.slug}</td>
                  <td>{item.title}</td>
                  <td>{item.metaTitle}</td>
                  <td>{item.category}</td>
                  <td>{item.status == 1 ? "Active" : "InActive"}</td>

                  <td>
                    <div className="d-flex gap-2">
                      {/* <PermissionGate permission="putrole"> */}
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          setShowEditModal(true);
                        }}
                      >
                        Edit
                      </button>
                      {/* </PermissionGate> */}
                      {/* <PermissionGate permission="deleterole"> */}
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
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
              className="modal-dialog modal-dialog-centered  modal-dialog-scrollable modal-lg"
              onClick={(e) => e.stopPropagation()} // 👈 prevent inner click
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create Seo</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowCreateModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <form>
                    {/* Slug */}
                    <div className="mb-3">
                      <label className="form-label">Slug</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="ui-ux-design"
                      />
                    </div>

                    {/* Page URL */}
                    <div className="mb-3">
                      <label className="form-label">Page URL</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="/services/ui-ux-design"
                      />
                    </div>

                    {/* Title */}
                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="UI UX Design Services"
                      />
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        placeholder="Seo description"
                      />
                    </div>

                    {/* Category */}
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Design"
                      />
                    </div>

                    {/* Status */}
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select className="form-select">
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                    </div>

                    <hr />

                    <h6>SEO Meta Details</h6>

                    {/* Meta Title */}
                    <div className="mb-3">
                      <label className="form-label">Meta Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Best UI UX Design Company"
                      />
                    </div>

                    {/* Meta Description */}
                    <div className="mb-3">
                      <label className="form-label">Meta Description</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        placeholder="SEO meta description"
                      />
                    </div>

                    {/* Meta Keywords */}
                    <div className="mb-3">
                      <label className="form-label">Meta Keywords</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="ui ux, design, web design"
                      />
                    </div>

                    {/* Canonical URL */}
                    <div className="mb-3">
                      <label className="form-label">Canonical URL</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="https://example.com/services/ui-ux-design"
                      />
                    </div>

                    <hr />

                    <h6>Open Graph (OG)</h6>

                    {/* OG Title */}
                    <div className="mb-3">
                      <label className="form-label">OG Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="UI UX Design Services"
                      />
                    </div>

                    {/* OG Description */}
                    <div className="mb-3">
                      <label className="form-label">OG Description</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        placeholder="OG description"
                      />
                    </div>

                    {/* OG Image Upload */}
                    <div className="mb-3">
                      <label className="form-label">OG Image</label>

                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // setOgImage(file);
                            // setOgImagePreview(URL.createObjectURL(file));
                          }
                        }}
                      />

                      {/* Preview */}
                      {true && (
                        <div className="mt-2">
                          <img
                            // src={ogImagePreview}
                            alt="OG Preview"
                            style={{
                              maxWidth: "100%",
                              height: "120px",
                              objectFit: "cover",
                              borderRadius: "6px",
                              border: "1px solid #ddd",
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <hr />

                    {/* Schema */}
                    <div className="mb-3">
                      <label className="form-label">Schema (JSON-LD)</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        placeholder='{"@context":"https://schema.org"}'
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
              className="modal-dialog modal-dialog-centered  modal-dialog-scrollable modal-lg"
              onClick={(e) => e.stopPropagation()} // 👈 prevent inner click
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Seo</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <form>
                    {/* Slug */}
                    <div className="mb-3">
                      <label className="form-label">Slug</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="ui-ux-design"
                      />
                    </div>

                    {/* Page URL */}
                    <div className="mb-3">
                      <label className="form-label">Page URL</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="/services/ui-ux-design"
                      />
                    </div>

                    {/* Title */}
                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="UI UX Design Services"
                      />
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        placeholder="Seo description"
                      />
                    </div>

                    {/* Category */}
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Design"
                      />
                    </div>

                    {/* Status */}
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select className="form-select">
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                    </div>

                    <hr />

                    <h6>SEO Meta Details</h6>

                    {/* Meta Title */}
                    <div className="mb-3">
                      <label className="form-label">Meta Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Best UI UX Design Company"
                      />
                    </div>

                    {/* Meta Description */}
                    <div className="mb-3">
                      <label className="form-label">Meta Description</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        placeholder="SEO meta description"
                      />
                    </div>

                    {/* Meta Keywords */}
                    <div className="mb-3">
                      <label className="form-label">Meta Keywords</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="ui ux, design, web design"
                      />
                    </div>

                    {/* Canonical URL */}
                    <div className="mb-3">
                      <label className="form-label">Canonical URL</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="https://example.com/services/ui-ux-design"
                      />
                    </div>

                    <hr />

                    <h6>Open Graph (OG)</h6>

                    {/* OG Title */}
                    <div className="mb-3">
                      <label className="form-label">OG Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="UI UX Design Services"
                      />
                    </div>

                    {/* OG Description */}
                    <div className="mb-3">
                      <label className="form-label">OG Description</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        placeholder="OG description"
                      />
                    </div>

                    {/* OG Image Upload */}
                    <div className="mb-3">
                      <label className="form-label">OG Image</label>

                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // setOgImage(file);
                            // setOgImagePreview(URL.createObjectURL(file));
                          }
                        }}
                      />

                      {/* Preview */}
                      {true && (
                        <div className="mt-2">
                          <img
                            // src={ogImagePreview}
                            alt="OG Preview"
                            style={{
                              maxWidth: "100%",
                              height: "120px",
                              objectFit: "cover",
                              borderRadius: "6px",
                              border: "1px solid #ddd",
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <hr />

                    {/* Schema */}
                    <div className="mb-3">
                      <label className="form-label">Schema (JSON-LD)</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        placeholder='{"@context":"https://schema.org"}'
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
                    Are you sure you want to delete this Seo?
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

export default SeoTable;
