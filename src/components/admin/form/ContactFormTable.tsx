"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
  // Random dummy data
  const [contacts, setContacts] = useState<ContactForm[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 9876543210",
      message: "I need help with my project.",
      status: "Pending",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+91 9123456780",
      message: "Can you provide more info about your services?",
      status: "Completed",
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+91 9988776655",
      message: "Interested in collaboration.",
      status: "Pending",
      createdAt: new Date().toISOString(),
    },
  ]);

  return (
    <div className="container my-5">
      <h2 className="mb-4">Contact Form Submissions</h2>

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
            {contacts.map((contact) => (
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
                <td>{contact.status}</td>
                <td>{new Date(contact.createdAt).toLocaleString()}</td>
                <td className="text-end">
                  <button className="btn btn-sm btn-primary me-1">View</button>
                  <button className="btn btn-sm btn-success me-1">Edit</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactFormTable;
