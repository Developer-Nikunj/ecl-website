"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createSeo,
  updateSeo,
  getAllSeo,
  getSeoById,
  deleteSeo,
} from "@/store/slices/module1/seo/seo.thunk";

import PermissionGate from "@/components/admin/PermissionGate";

const SeoTable = () => {
  const dispatch = useAppDispatch();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [createSeoEntry, setCreateSeoEntry] = useState({
    slug: "",
    pageUrl: "",
    title: "",
    description: "",
    category: "",
    status: true,

    // SEO Meta
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    robots: "index, follow",
    canonicalUrl: "",

    // Open Graph
    ogTitle: "",
    ogDescription: "",

    // Schema
    schema: "",
  });
  const [ogImage, setOgImage] = useState<File | null>(null);
  const [ogImagePreview, setOgImagePreview] = useState<File | null>(null);
  const [selectedSeoId, setSelectedSeoId] = useState<number | null>(null);
  const [editSeoEntry, setEditSeoEntry] = useState({
    slug: "",
    pageUrl: "",
    title: "",
    description: "",
    category: "",
    status: true,

    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    robots: "index, follow",
    canonicalUrl: "",

    ogTitle: "",
    ogDescription: "",

    schema: "",
  });

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    limit: 10,
    offset: 0,
  });

  const { list, selected, loading, error, total } = useAppSelector(
    (state) => state.seo
  );

  console.log("list", list);

  const fetchSeo = async () => {
    await dispatch(
      getAllSeo({
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        limit: filters.limit,
        offset: filters.offset,
      })
    );
  };

  const handleCreate = async () => {
    const formData = new FormData();

    /* ---------- CORE ---------- */
    formData.append("slug", createSeoEntry.slug);
    formData.append("pageUrl", createSeoEntry.pageUrl);
    formData.append("title", createSeoEntry.title);
    formData.append("description", createSeoEntry.description);
    formData.append("category", createSeoEntry.category);
    formData.append("status", createSeoEntry.status.toString());

    /* ---------- SEO META ---------- */
    formData.append("metaTitle", createSeoEntry.metaTitle);
    formData.append("metaDescription", createSeoEntry.metaDescription);
    formData.append("metaKeywords", createSeoEntry.metaKeywords);
    formData.append("robots", createSeoEntry.robots);
    formData.append("canonicalUrl", createSeoEntry.canonicalUrl);

    /* ---------- OPEN GRAPH ---------- */
    formData.append("ogTitle", createSeoEntry.ogTitle);
    formData.append("ogDescription", createSeoEntry.ogDescription);

    /* ---------- SCHEMA ---------- */
    if (createSeoEntry.schema) {
      formData.append("schema", JSON.stringify(editSeoEntry.schema));
    }

    /* ---------- IMAGE ---------- */
    if (ogImage) {
      formData.append("ogImage", ogImage);
    }

    const res = await dispatch(createSeo(formData));

    if (createSeo.fulfilled.match(res)) {
      setShowCreateModal(false);
      fetchSeo();

      /* ---------- RESET FORM ---------- */
      setCreateSeoEntry({
        slug: "",
        pageUrl: "",
        title: "",
        description: "",
        category: "",
        status: true,

        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        robots: "index, follow",
        canonicalUrl: "",

        ogTitle: "",
        ogDescription: "",

        schema: "",
      });

      setOgImage(null);
    }
  };

  const applyFilter = () => {
    fetchSeo();
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
    if (!selectedSeoId) return;

    const res = await dispatch(deleteSeo(selectedSeoId));

    if (deleteSeo.fulfilled.match(res)) {
      setShowDeleteModal(false);
      setSelectedSeoId(null);
    }

    await dispatch(
      getAllSeo({
        limit: filters.limit,
        offset: filters.offset,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
      })
    );
  };

  const handleUpdate = async () => {
    console.log("selectedSeoId", selectedSeoId);
    if (!selectedSeoId) return;

    const formData = new FormData();

    /* ---------- CORE ---------- */
    formData.append("slug", editSeoEntry.slug);
    formData.append("pageUrl", editSeoEntry.pageUrl);
    formData.append("title", editSeoEntry.title);
    formData.append("description", editSeoEntry.description);
    formData.append("category", editSeoEntry.category);
    formData.append("status", editSeoEntry.status.toString());

    /* ---------- SEO META ---------- */
    formData.append("metaTitle", editSeoEntry.metaTitle);
    formData.append("metaDescription", editSeoEntry.metaDescription);
    formData.append("metaKeywords", editSeoEntry.metaKeywords);
    formData.append("robots", editSeoEntry.robots);
    formData.append("canonicalUrl", editSeoEntry.canonicalUrl);

    /* ---------- OPEN GRAPH ---------- */
    formData.append("ogTitle", editSeoEntry.ogTitle);
    formData.append("ogDescription", editSeoEntry.ogDescription);

    /* ---------- SCHEMA ---------- */
    if (editSeoEntry.schema) {
      formData.append("schema", JSON.stringify(editSeoEntry.schema));
    }

    /* ---------- IMAGE (OPTIONAL) ---------- */
    if (ogImage) {
      formData.append("ogImage", ogImage);
    }

    const res = await dispatch(
      updateSeo({
        id: selectedSeoId,
        data: formData,
      })
    );

    if (updateSeo.fulfilled.match(res)) {
      setShowEditModal(false);
      fetchSeo();
      setOgImage(null);
    }

    await dispatch(
      getAllSeo({
        limit: filters.limit,
        offset: filters.offset,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
      })
    );
  };

  useEffect(() => {
    fetchSeo();
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
            {list.length > 0 &&
              list.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.slug}</td>
                  <td>{item.title}</td>
                  <td>{item.metaTitle}</td>
                  <td>{item.category}</td>
                  <td>{item.status == true ? "Active" : "InActive"}</td>

                  <td>
                    <div className="d-flex gap-2">
                      {/* <PermissionGate permission="putrole"> */}
                      <button
                        className="btn btn-sm btn-primary"
                        
                        onClick={() => {
                          setSelectedSeoId(item.id);
                          setShowEditModal(true);
                          setEditSeoEntry({
                            slug: item.slug,
                            pageUrl: item.pageUrl,
                            title: item.title,
                            description: item.description,
                            category: item.category,
                            status: item.status ? true : false,
                            metaTitle: item.metaTitle,
                            metaDescription: item.metaDescription,
                            metaKeywords: item.metaKeywords,
                            robots: item.robots,
                            canonicalUrl: item.canonicalUrl,
                            ogTitle: item.ogTitle,
                            ogDescription: item.ogDescription,
                            schema: item.schema,
                          });
                          // setOgImage(item.ogImage);
                        }}
                      >
                        Edit
                      </button>
                      {/* </PermissionGate> */}
                      {/* <PermissionGate permission="deleterole"> */}
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          console.log("selectedSeoId",item.id);
                          setSelectedSeoId(item.id);
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
                        value={createSeoEntry.slug}
                        onChange={(e) => {
                          setCreateSeoEntry({
                            ...createSeoEntry,
                            slug: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/* Page URL */}
                    <div className="mb-3">
                      <label className="form-label">Page URL</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="/services/ui-ux-design"
                        value={createSeoEntry.pageUrl}
                        onChange={(e) => {
                          setCreateSeoEntry({
                            ...createSeoEntry,
                            pageUrl: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/* Title */}
                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="UI UX Design Services"
                        value={createSeoEntry.title}
                        onChange={(e) => {
                          setCreateSeoEntry({
                            ...createSeoEntry,
                            title: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        placeholder="Seo description"
                        value={createSeoEntry.description}
                        onChange={(e) => {
                          setCreateSeoEntry({
                            ...createSeoEntry,
                            description: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/* Category */}
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Design"
                        value={createSeoEntry.category}
                        onChange={(e) => {
                          setCreateSeoEntry({
                            ...createSeoEntry,
                            category: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/* Status */}
                    <div className="mb-3">
                      <label className="form-label">Seo Status</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="footerStatus"
                          checked={createSeoEntry.status}
                          onChange={(e) => {
                            setCreateSeoEntry({
                              ...createSeoEntry,
                              status: e.target.checked,
                            });
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

                    <hr />

                    <h6>SEO Meta Details</h6>

                    {/* Meta Title */}
                    <div className="mb-3">
                      <label className="form-label">Meta Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Best UI UX Design Company"
                        value={createSeoEntry.metaTitle}
                        onChange={(e) => {
                          setCreateSeoEntry({
                            ...createSeoEntry,
                            metaTitle: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/* Meta Description */}
                    <div className="mb-3">
                      <label className="form-label">Meta Description</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        placeholder="SEO meta description"
                        value={createSeoEntry.metaDescription}
                        onChange={(e) => {
                          setCreateSeoEntry({
                            ...createSeoEntry,
                            metaDescription: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/* Meta Keywords */}
                    <div className="mb-3">
                      <label className="form-label">Meta Keywords</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="ui ux, design, web design"
                        value={createSeoEntry.metaKeywords}
                        onChange={(e) => {
                          setCreateSeoEntry({
                            ...createSeoEntry,
                            metaKeywords: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/* Canonical URL */}
                    <div className="mb-3">
                      <label className="form-label">Canonical URL</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="https://example.com/services/ui-ux-design"
                        value={createSeoEntry.canonicalUrl}
                        onChange={(e) => {
                          setCreateSeoEntry({
                            ...createSeoEntry,
                            canonicalUrl: e.target.value,
                          });
                        }}
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
                        value={createSeoEntry.ogTitle}
                        onChange={(e) => {
                          setCreateSeoEntry({
                            ...createSeoEntry,
                            ogTitle: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/* OG Description */}
                    <div className="mb-3">
                      <label className="form-label">OG Description</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        placeholder="OG description"
                        value={createSeoEntry.ogDescription}
                        onChange={(e) => {
                          setCreateSeoEntry({
                            ...createSeoEntry,
                            ogDescription: e.target.value,
                          });
                        }}
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
                            setOgImage(file);
                            // setOgImagePreview(URL.createObjectURL(file));
                          }
                        }}
                      />

                      {/* Preview */}
                      {/* {true && (
                        <div className="mt-2">
                          <img
                            src={ogImagePreview}
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
                      )} */}
                    </div>

                    <hr />

                    {/* Schema */}
                    <div className="mb-3">
                      <label className="form-label">Schema (JSON-LD)</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        placeholder='{"@context":"https://schema.org"}'
                        value={createSeoEntry.schema}
                        onChange={(e) => {
                          setCreateSeoEntry({
                            ...createSeoEntry,
                            schema: e.target.value,
                          });
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
                        value={editSeoEntry.slug}
                        onChange={(e) => {
                          setEditSeoEntry((prev) => ({
                            ...prev,
                            slug: e.target.value,
                          }));
                        }}
                      />
                    </div>

                    {/* Page URL */}
                    <div className="mb-3">
                      <label className="form-label">Page URL</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="/services/ui-ux-design"
                        value={editSeoEntry.pageUrl}
                        onChange={(e) => {
                          setEditSeoEntry((prev) => ({
                            ...prev,
                            pageUrl: e.target.value,
                          }));
                        }}
                      />
                    </div>

                    {/* Title */}
                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="UI UX Design Services"
                        value={editSeoEntry.title}
                        onChange={(e) => {
                          setEditSeoEntry((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }));
                        }}
                      />
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        placeholder="Seo description"
                        value={editSeoEntry.description}
                        onChange={(e) => {
                          setEditSeoEntry((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }));
                        }}
                      />
                    </div>

                    {/* Category */}
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Design"
                        value={editSeoEntry.category}
                        onChange={(e) => {
                          setEditSeoEntry((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }));
                        }}
                      />
                    </div>

                    {/* Status */}
                    <div className="mb-3">
                      <label className="form-label">Seo Status</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="footerStatus"
                          checked={editSeoEntry.status}
                          onChange={(e) => {
                            setEditSeoEntry((prev) => ({
                              ...prev,
                              status: e.target.checked,
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

                    <hr />

                    <h6>SEO Meta Details</h6>

                    {/* Meta Title */}
                    <div className="mb-3">
                      <label className="form-label">Meta Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Best UI UX Design Company"
                        value={editSeoEntry.metaTitle}
                        onChange={(e) => {
                          setEditSeoEntry((prev) => ({
                            ...prev,
                            metaTitle: e.target.value,
                          }));
                        }}
                      />
                    </div>

                    {/* Meta Description */}
                    <div className="mb-3">
                      <label className="form-label">Meta Description</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        placeholder="SEO meta description"
                        value={editSeoEntry.metaDescription}
                        onChange={(e) => {
                          setEditSeoEntry((prev) => ({
                            ...prev,
                            metaDescription: e.target.value,
                          }));
                        }}
                      />
                    </div>

                    {/* Meta Keywords */}
                    <div className="mb-3">
                      <label className="form-label">Meta Keywords</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="ui ux, design, web design"
                        value={editSeoEntry.metaKeywords}
                        onChange={(e) => {
                          setEditSeoEntry((prev) => ({
                            ...prev,
                            metaKeywords: e.target.value,
                          }));
                        }}
                      />
                    </div>

                    {/* Canonical URL */}
                    <div className="mb-3">
                      <label className="form-label">Canonical URL</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="https://example.com/services/ui-ux-design"
                        value={editSeoEntry.canonicalUrl}
                        onChange={(e) => {
                          setEditSeoEntry((prev) => ({
                            ...prev,
                            canonicalUrl: e.target.value,
                          }));
                        }}
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
                        value={editSeoEntry.ogTitle}
                        onChange={(e) => {
                          setEditSeoEntry((prev) => ({
                            ...prev,
                            ogTitle: e.target.value,
                          }));
                        }}
                      />
                    </div>

                    {/* OG Description */}
                    <div className="mb-3">
                      <label className="form-label">OG Description</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        placeholder="OG description"
                        value={editSeoEntry.ogDescription}
                        onChange={(e) => {
                          setEditSeoEntry((prev) => ({
                            ...prev,
                            ogDescription: e.target.value,
                          }));
                        }}
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
                            setOgImage(file);
                            // setOgImagePreview(URL.createObjectURL(file));
                          }
                        }}
                      />

                      {/* Preview */}
                      {/* {true && (
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
                      )} */}
                    </div>

                    <hr />

                    {/* Schema */}
                    <div className="mb-3">
                      <label className="form-label">Schema (JSON-LD)</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        placeholder='{"@context":"https://schema.org"}'
                        value={JSON.stringify(editSeoEntry.schema, null, 2)}
                        onChange={(e) =>
                          setEditSeoEntry({
                            ...editSeoEntry,
                            schema: JSON.parse(e.target.value),
                          })
                        }
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
