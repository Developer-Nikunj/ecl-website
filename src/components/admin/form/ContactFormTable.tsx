"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "@/lib/axios";

interface ContactForm {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  noteByAdmin?: string;
  status?: string;
  createdAt: string;
}

const ContactFormTable: React.FC = () => {
  const [contacts, setContacts] = useState<ContactForm[]>([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedContact, setSelectedContact] = useState<ContactForm | null>(
    null
  );

  const [editForm, setEditForm] = useState<Partial<ContactForm>>({});

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [loading, setLoading] = useState(false);
  const openViewModal = (contact: ContactForm) => {
    setSelectedContact(contact);
    setShowViewModal(true);
  };

  const openEditModal = (contact: ContactForm) => {
    setSelectedContact(contact);
    setEditForm(contact);
    setShowEditModal(true);
  };

  const openDeleteModal = (contact: ContactForm) => {
    setSelectedContact(contact);
    setShowDeleteModal(true);
  };

  const closeAllModals = () => {
    setShowViewModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedContact(null);
  };

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/contactForm`,
        {
          params: {
            page,
            limit,
            startDate,
            endDate,
          },
        }
      );

      setContacts(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch contact forms", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [page, startDate, endDate]);

  return (
    <div className="container my-5">
      <h2 className="mb-4">Contact Form Submissions</h2>

      {/* Date Filter */}
      <div className="d-flex gap-2 mb-3">
        <input
          type="date"
          className="form-control"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="form-control"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => setPage(1)}>
          Apply
        </button>
      </div>

      {/* Table */}
      <div className="table-responsive shadow rounded">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>SNo.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Status</th>
              <th>Submitted At</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : contacts.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No records found
                </td>
              </tr>
            ) : (
              contacts.map((contact, index) => (
                <tr key={contact.id}>
                  <td>{(page - 1) * limit + index + 1}</td>

                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone || "-"}</td>
                  <td
                    className="text-truncate"
                    style={{ maxWidth: "200px" }}
                    title={contact.message}
                  >
                    {contact.message || "-"}
                  </td>
                  <td>{contact.status || "-"}</td>
                  <td>
                    <div className="d-flex flex-column">
                      <span className="fw-medium">
                        {new Date(contact.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                      <small className="text-muted">
                        {new Date(contact.createdAt).toLocaleTimeString(
                          "en-IN",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </small>
                    </div>
                  </td>

                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-primary me-1"
                      onClick={() => openViewModal(contact)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-success me-1"
                      onClick={() => openEditModal(contact)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-outline-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          className="btn btn-outline-secondary"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {showViewModal && selectedContact && (
        <>
          {/* Backdrop */}
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            onClick={closeAllModals} // outside click
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          >
            <div
              className="modal-dialog modal-lg modal-dialog-centered"
              onClick={(e) => e.stopPropagation()} // prevent inside close
            >
              <div className="modal-content border-0 shadow-lg rounded-4">
                {/* Header */}
                <div className="modal-header border-0 pb-0">
                  <h4 className="modal-title fw-semibold">Contact Details</h4>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeAllModals}
                  />
                </div>

                {/* Body */}
                <div className="modal-body pt-2">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="p-3 bg-light rounded-3">
                        <small className="text-muted text-uppercase">
                          Name
                        </small>
                        <div className="fw-medium">{selectedContact.name}</div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-3 bg-light rounded-3">
                        <small className="text-muted text-uppercase">
                          Email
                        </small>
                        <div className="fw-medium">{selectedContact.email}</div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-3 bg-light rounded-3">
                        <small className="text-muted text-uppercase">
                          Phone
                        </small>
                        <div className="fw-medium">{selectedContact.phone}</div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-3 bg-light rounded-3">
                        <small className="text-muted text-uppercase">
                          Status
                        </small>
                        <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                          {selectedContact.status}
                        </span>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="p-3 bg-light rounded-3">
                        <small className="text-muted text-uppercase">
                          Message
                        </small>
                        <div
                          className="mt-2"
                          style={{
                            maxHeight: "180px",
                            overflowY: "auto",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {selectedContact.message || "-"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="modal-footer border-0">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={closeAllModals}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {showEditModal && selectedContact && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          onClick={closeAllModals} // outside click
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()} // prevent inside close
          >
            <div className="modal-content border-0 shadow-lg rounded-4">
              {/* Header */}
              <div className="modal-header border-0 pb-0">
                <h4 className="modal-title fw-semibold">Edit Contact</h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeAllModals}
                />
              </div>

              {/* Body */}
              <div className="modal-body pt-2">
                <div className="mb-3">
                  <label className="form-label text-muted text-uppercase small">
                    Status
                  </label>
                  <select
                    className="form-select rounded-3"
                    value={editForm.status}
                    onChange={(e) =>
                      setEditForm({ ...editForm, status: e.target.value })
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Inprogress">Inprogress</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted text-uppercase small">
                    Admin Note
                  </label>
                  <textarea
                    className="form-control rounded-3"
                    rows={4}
                    placeholder="Write internal note..."
                    value={editForm.noteByAdmin || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, noteByAdmin: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer border-0">
                <button
                  className="btn btn-outline-secondary"
                  onClick={closeAllModals}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success px-4"
                  onClick={async () => {
                    await api.put(
                      `/contactForm/${selectedContact.id}`,
                      editForm
                    );
                    closeAllModals();
                    fetchDetails();
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactFormTable;
