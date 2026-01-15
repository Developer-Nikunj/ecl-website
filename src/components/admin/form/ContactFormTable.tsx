"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

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
              contacts.map((contact) => (
                <tr key={contact.id}>
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
                  <td>{new Date(contact.createdAt).toLocaleString()}</td>
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
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => openDeleteModal(contact)}
                    >
                      Delete
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
        <div className="modal fade show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Contact</h5>
                <button className="btn-close" onClick={closeAllModals} />
              </div>
              <div className="modal-body">
                <p>
                  <strong>Name:</strong> {selectedContact.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedContact.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedContact.phone}
                </p>
                <p>
                  <strong>Message:</strong>
                </p>
                <div
                  style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                  className="border rounded p-2 bg-light"
                >
                  {selectedContact.message || "-"}
                </div>

                <p>
                  <strong>Status:</strong> {selectedContact.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditModal && selectedContact && (
        <div className="modal fade show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Contact</h5>
                <button className="btn-close" onClick={closeAllModals} />
              </div>
              <div className="modal-body">
                <select
                  className="form-select mb-3"
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm({ ...editForm, status: e.target.value })
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>

                <textarea
                  className="form-control"
                  placeholder="Admin Note"
                  value={editForm.noteByAdmin || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, noteByAdmin: e.target.value })
                  }
                />
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeAllModals}>
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={async () => {
                    await axios.put(
                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/contactForm/${selectedContact.id}`,
                      editForm
                    );
                    closeAllModals();
                    fetchDetails();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && selectedContact && (
        <div className="modal fade show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Delete Contact</h5>
                <button className="btn-close" onClick={closeAllModals} />
              </div>
              <div className="modal-body">
                Are you sure you want to delete{" "}
                <strong>{selectedContact.name}</strong>?
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeAllModals}>
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={async () => {
                    await axios.delete(
                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/contactForm/${selectedContact.id}`
                    );
                    closeAllModals();
                    fetchDetails();
                  }}
                >
                  Delete
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
