"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createEmployee,
  getAllEmployees,
  deleteEmployee,
  getEmployeeById,
  updateEmployee,

} from "@/store/slices/module1/Employee/employee.thunk";
import { create } from "domain";
type Employee = {
  id: number;
  EmployeeName: string;
  EmployeeEmail: string;
  Designation: string;
  status: number;
  experience: number;
  rating: string;
  employeeImg: string;
  employeeMobileNo: string;
  linkedinUrl: string;
  twitterUrl: string;
};

const EmployeeTable = () => {
  const dispatch = useAppDispatch();
  // const [employees, setEmployees] = useState<Employee[]>([
  //   {
  //     id: 1,
  //     EmployeeName: "Rahul",
  //     EmployeeEmail: "rahul@gmail.com",
  //     designation: "UI Designer",
  //     status: true,
  //     experience: "3",
  //     rating: "5.5",
  //     employeeImg: "",
  //     employeeMobileNo: "7896354798",
  //     linkedinUrl: "",
  //     twitterUrl: "",
    
  //   },
  //   {
  //     id: 2,
  //    EmployeeName: "Raj",
  //     EmployeeEmail: "rajsharma23@gmail.com",
  //     designation: "Frontend Developer",
  //     status: true,
  //     experience: "5",
  //     rating: "7.5",
  //     employeeImg: "",
  //     employeeMobileNo: "8050480504",
  //     linkedinUrl: "",
  //     twitterUrl: "",
  //   }

  // ]);

  
  // ✅ Filters
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    Designation:"",
    experience: "",
    rating: "",
    employeeImg: "",
    employeeMobileNo: "",
    linkedinUrl: "",
    twitterUrl: "",
    limit: 10,
    offset: 0,
  });
  // ✅ Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [createEmployeeEntry, setCreateEmployeeEntry] = useState({
     EmployeeName: "",
    EmployeeEmail: "",
    Designation: "",
    status: "",
    experience: "",
    rating: "",
    employeeImg: "",
    employeeMobileNo: "",
    linkedinUrl: "",
    twitterUrl: "",
  });
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  

   const { loading, success, error,employees , selectedEmployee, meta } =
      useAppSelector((state) => state.employee);

      console.log("employees",employees)

  // ✅ Fetch roles
  useEffect(() => {
    dispatch(getAllEmployees(filters));
  }, [filters, dispatch]);

  // ✅ Create
  const handleCreate = async () => {
  console.log(createEmployeeEntry);
  
  const formData = new FormData();
  
  // ✅ Append each field individually
  formData.forEach((i)=>{
    console.log(i)
  })
  formData.append('EmployeeName', createEmployeeEntry.EmployeeName);
  formData.append('EmployeeEmail', createEmployeeEntry.EmployeeEmail);
  formData.append('Designation', createEmployeeEntry.Designation);
  formData.append('status', createEmployeeEntry.status);
  formData.append('experience', createEmployeeEntry.experience);
  formData.append('rating', createEmployeeEntry.rating);
  formData.append('employeeMobileNo', createEmployeeEntry.employeeMobileNo);
  formData.append('linkedinUrl', createEmployeeEntry.linkedinUrl);
  formData.append('twitterUrl', createEmployeeEntry.twitterUrl);
  
  // ✅ Handle file upload if employeeImg is a File object
  if (createEmployeeEntry.employeeImg) {
    formData.append('employeeImg', createEmployeeEntry.employeeImg);
  }

  await dispatch(createEmployee(formData));
  
  setShowCreateModal(false);
  setCreateEmployeeEntry({
    EmployeeName: "",
    EmployeeEmail: "",
    Designation: "",
    status: "1",
    experience: "",
    rating: "",
    employeeImg: "",
    employeeMobileNo: "",
    linkedinUrl: "",
    twitterUrl: "",
  });
  
  dispatch(getAllEmployees(filters));
};    

  // ✅ Edit open
  const handleEditOpen = (item: any) => {
    setSelectedEmployeeId(item.id);
    setCreateEmployeeEntry({
      employeeName: item.employeeName,
      employeeEmail: item.employeeEmail,
      Designation: item.Designation,
      status: item.status,
      experience: item.experience,
      rating: item.rating,
      employeeMobileNo: item.employeeMobileNo,
      linkedinUrl: item.linkedinUrl,
      twitterURL: item.twitterUrl,
    });
    setShowEditModal(true);
  };

  // ✅ Update
  const handleUpdate = async () => {
    if (!selectedEmployeeId) return;

    await dispatch(
      updateEmployee({
    employeeName: "",
    employeeEmail: "",
    Designation: "",
    status: "",
    experience: "",
    rating: "",
    employeeImg: "",
    employeeMobileNo: "",
    linkedinUrl: "",
    twitterUrl: "",
      })
    );

    setShowEditModal(true);
    dispatch(getAllEmployees(filters));
  };
  // ✅ Delete open
  const handleDeleteOpen =
   (id: number) => {
    setSelectedEmployeeId(id);
    setShowDeleteModal(true);
  };

  // ✅ Delete  
  const handleDelete = async () => {
    if (!selectedEmployeeId) return;
    await dispatch(deleteEmployee(selectedEmployeeId));
    setShowDeleteModal(false);
    dispatch(getAllEmployees(filters));
  };

  // ✅ Pagination
  const handleNext = () => {
    setFilters({ ...filters, offset: filters.offset + filters.limit });
  };
  const handlePrevious = () => {
    setFilters({ ...filters, offset: Math.max(0, filters.offset - filters.limit) });
  };




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
        <button className="btn btn-primary px-4" > 
          Apply
        </button>
      </div>
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-sm btn-success"
           onClick={() => setShowCreateModal((prev) => !prev)}
            
        >
          Create Employees
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>SNo.</th>
              <th>Employee Name</th>
              <th>Employee Email</th>
              <th>Designation</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.length > 0 &&
              employees.map((item, index) => (
                <tr key={item.id}>
                  <td>{filters.offset + index + 1}</td>
                  <td>{item.employeeName}</td>
                  <td>{item.employeeEmail}</td>
                  <td>{item.Designation}</td>
                  <td>{item.Experience}</td>  
                  <td>{item.Status ? "Active" : "Inactive"}</td>
                
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-primary"
                         onClick={() => {
                              setSelectedEmployeeId(item.id);
                              setCreateEmployeeEntry({
                                employeeName: item.employeeName,
                                employeeEmail: item.employeeEmail,
                                 Designation:item.Designation,
                                  
                               Experience:item.Experience,
                                 rating: item.rating,
                                  employeeImg: item.employeeImg,
                                  employeeMobileNo: item.employeeMobileNo,
                                     linkedinUrl: item.linkedinUrl,
                                         twitterUrl: item.twitterUrl,
                                 status: item.status == true ? "1" : "0",
                              });
                              setShowEditModal(true);
                              console.log("Api is calling")

                              
                            }}
                      >
                        Edit
                      </button>
                      
                          <button
                           className="btn btn-sm btn-danger"
                            onClick={() => {
                           setShowDeleteModal((prev) => !prev);
                            setSelectedEmployeeId(item.id);
                             }}
                             >
                            Delete
                            </button>
                        
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

          >
            Next
          </button>
        </div>
      </div>

      {showCreateModal && (
        <>
          {/* Modal Wrapper */}
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            onClick={( ) => setShowCreateModal(false)} // 👈 outside click
          >
            <div
              className="modal-dialog modal-dialog-centered modal-md"
              onClick={(e) => e.stopPropagation()} // 👈 prevent inner click
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Employee</h5>
                  <button

                    type="button"
                    className="btn-close"
                    onClick={() => setShowCreateModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Employee name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Employee name"
                         value={createEmployeeEntry?.EmployeeName || ""}
                        onChange={(e) =>
                          setCreateEmployeeEntry((prev) => ({
                            ...prev,
                            EmployeeName: e.target.value,
                          }))
                        }

                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Employee email</label>
                      <input
                        type="text"         
                        className="form-control"
                        placeholder="Enter Employee email"
                        onChange={(e) =>
                          setCreateEmployeeEntry((prev) => ({
                            ...prev,
                            EmployeeEmail: e.target.value,
                          }))
                        }

                      />
                    </div>

                     <div className="mb-3"
                      >
                        <label className="from-label">Designation</label>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Designation"
                        onChange={(e) =>
                          setCreateEmployeeEntry((prev) => ({
                            ...prev,
                            Designation: e.target.value,
                          }))
                        }

                      />
                      </div>

                       <div className="mb-3"
                      >
                        <label className="from-label">Experience</label>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Experience"
                        onChange={(e) =>
                          setCreateEmployeeEntry((prev) => ({
                            ...prev,
                            experience: e.target.value,
                          }))
                        }

                      />
                      </div>
                    <div className="mb-3">
                      <label className="form-label">Employee</label>
                      <select
                        className="form-select mb-3"
                        aria-label="Default select example"
                      
                          value={createEmployeeEntry.status}
                        onChange={(e) =>
                          setCreateEmployeeEntry((prev) => ({
                            ...prev,
                            status: e.target.value, // convert string to number
                          }))
                        }
                          >

                        <option selected>Status</option>
                        <option value={"1"}>Active</option>
                        <option value={"0"}>Inactive</option>    
                      </select>
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
                  <h5 className="modal-title">Edit Detalis</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Employee name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Employee name"
                      value={createEmployeeEntry.EmployeeName}
                      onChange={(e) =>
                        setCreateEmployeeEntry ((prev) => ({
                          ...prev,
                          EmployeeName: e.target.value,
                        }))
                      }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Employee email</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Employee email"
                         value={createEmployeeEntry.EmployeeEmail}
                        onChange={(e) =>
                          setCreateEmployeeEntry({
                            ...createEmployeeEntry,
                            EmployeeEmail: e.target.value,
                          })
                        }

                      />
                    </div>

                     <div className="mb-3">
                      <label className="form-label">Designation</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Designation"
                      value={createEmployeeEntry.Designation}
                      onChange={(e) =>
                        setCreateEmployeeEntry ((prev) => ({
                          ...createEmployeeEntry,
                          Designation: e.target.value,
                        }))
                      }
                      />
                    </div>

                       <div className="mb-3">
                      <label className="form-label">Experience</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Experience"
                      value={createEmployeeEntry.experience}
                      onChange={(e) =>
                        setCreateEmployeeEntry ((prev) => ({
                          ...prev,
                          Experience: e.target.value,
                        }))
                      }
                      />
                    </div>

                     <div className="mb-3">
                      <label className="form-label"> Status</label>
                      <select
                      id="Status"
                        className="form-select mb-3"
                        aria-label="Default select example"
                        value={createEmployeeEntry.status}
                        onChange={(e) =>
                          setCreateEmployeeEntry ((prev) => ({
                            ...prev,
                            status: e.target.value,
                          }))
                        }
                      >


                      
                        <option value="">Select Status</option>
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                      </select>
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
            aria-labelledby="deleteEmployeeTitle"
            onClick={() => setShowDeleteModal(false)}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-sm"
              role="document"
               onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content rounded-3 shadow">
                <div className="modal-header border-0">
                  <h5 className="modal-title" id="deleteEmployeeTitle">
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
                    Are you sure you want to delete this Employee?
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
                    onClick={handleDelete}
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

export default EmployeeTable;
