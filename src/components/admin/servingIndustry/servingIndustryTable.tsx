"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createServingIndustry,
  getAllServingIndustry,
  getServingIndustryById,
  updateServingIndustry,
  deleteServingIndustry,
  servingIndustryItem,
  servingIndustryMeta,
} from "@/store/slices/module1/servingIndustry/servingIndustry.thunk";
import PermissionGate from "@/components/admin/PermissionGate";
import { title } from "../../../../public/assets/backend/libs/chart.js/plugins/plugin.tooltip";

const ServingIndustryTable = () => {
  const dispatch = useAppDispatch();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [categoryEntry, setCategoryEntry] = useState({
    name: "",
    img: "",
    active: 1,
  });
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    limit: 10,
    offset: 0,
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const { loading, error, items, meta } = useAppSelector(
    (state) => state.servingIndustry,
  );

  console.log("items", items);
  const fetchCategory = () => {
    dispatch(
      getAllServingIndustry({
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        limit: filters.limit,
        offset: filters.offset,
      }),
    );
  };

  const handleCreate = async () => {
    const formdata = new FormData();

    formdata.append("name", categoryEntry.name);
    formdata.append("image", categoryEntry.img); // must match backend
    formdata.append("active", String(categoryEntry.active));

    const res = await dispatch(createServingIndustry(formdata));

    if (createServingIndustry.fulfilled.match(res)) {
      setShowCreateModal(false);
      fetchCategory();
    }

    setCategoryEntry({
      name: "",
      img: "",
      active: 1,
    });
  };

  // const applyFilter = () => {
  //   fetchCategory();
  // };

  // const handlePrevious = () => {
  //   setFilters((prev) => ({
  //     ...prev,
  //     offset: Math.max(prev.offset - prev.limit, 0),
  //   }));
  // };

  // const handleNext = () => {
  //   if (meta && filters.offset + filters.limit < meta.total) {
  //     setFilters((prev) => ({
  //       ...prev,
  //       offset: prev.offset + prev.limit,
  //     }));
  //   }
  // };

  // const handleDelete = async () => {
  //   if (!selectedCategoryId) return;

  //   const res = await dispatch(deleteServingIndustry(selectedCategoryId));

  //   if (deleteServingIndustry.fulfilled.match(res)) {
  //     setShowDeleteModal(false);
  //     setSelectedCategoryId(null);

  //     dispatch(
  //       getAllServingIndustry({
  //         limit: filters.limit,
  //         offset: filters.offset,
  //         startDate: filters.startDate || undefined,
  //         endDate: filters.endDate || undefined,
  //       }),
  //     );
  //   }
  // };

  // const handleUpdate = async () => {
  //   if (!selectedCategoryId) return;

  //   const res = await dispatch(
  //     updateServingIndustry({
  //       id: selectedCategoryId,
  //       data: {
  //         name: categoryEntry.name,
  //         img: categoryEntry.img,
  //       },
  //     }),
  //   );

  //   if (updateServingIndustry.fulfilled.match(res)) {
  //     setShowEditModal(false);
  //     dispatch(
  //       getAllServingIndustry({
  //         startDate: filters.startDate,
  //         endDate: filters.endDate,
  //         limit: filters.limit,
  //       }),
  //     );
  //     setCategoryEntry({
  //       name: "",
  //       img: "",
  //       active: 1,
  //     });
  //   }
  // };

  useEffect(() => {
    fetchCategory();
  }, [filters.limit, filters.startDate, filters.endDate, filters.offset]);
  // const items = [
  //    {
  //      id: 1,
  //      name: "Healthcare",
  //      description:
  //        "Solutions for hospitals, clinics, and medical services",
  //      img: "/uploads/servingIndustry/healthcare.jpg",
  //      active: true,
  //      createdAt: "2026-01-10T08:30:00Z",
  //    },
  //    {
  //      id: 2,
  //      name: "Education",
  //      description:
  //        "Digital platforms for schools, colleges, and e-learning",
  //      img: "/uploads/servingIndustry/education.jpg",
  //      active: true,
  //      createdAt: "2026-01-11T09:00:00Z",
  //    },
  //    {
  //      id: 3,
  //      name: "Finance & Banking",
  //      description: "Secure fintech and banking software solutions",
  //      img: "/uploads/servingIndustry/finance.jpg",
  //      active: true,
  //      createdAt: "2026-01-12T10:15:00Z",
  //    },
  //    {
  //      id: 4,
  //      name: "E-commerce",
  //      description: "Online store platforms and marketplace solutions",
  //      img: "/uploads/servingIndustry/ecommerce.jpg",
  //      active: true,
  //      createdAt: "2026-01-13T11:20:00Z",
  //    },
  //    {
  //      id: 5,
  //      name: "Real Estate",
  //      description: "Property management and real estate portals",
  //      img: "/uploads/servingIndustry/realestate.jpg",
  //      active: true,
  //      createdAt: "2026-01-14T12:00:00Z",
  //    },
  //    {
  //      id: 6,
  //      name: "Travel & Tourism",
  //      description: "Booking systems and travel management solutions",
  //      img: "/uploads/servingIndustry/travel.jpg",
  //      active: true,
  //      createdAt: "2026-01-15T13:40:00Z",
  //    },
  //    {
  //      id: 7,
  //      name: "Manufacturing",
  //      description: "Automation and supply chain software solutions",
  //      img: "/uploads/servingIndustry/manufacturing.jpg",
  //      active: false,
  //      createdAt: "2026-01-16T14:25:00Z",
  //    },
  //    {
  //      id: 8,
  //      name: "Logistics",
  //      description: "Fleet management and delivery tracking systems",
  //      img: "/uploads/servingIndustry/logistics.jpg",
  //      active: true,
  //      createdAt: "2026-01-17T15:10:00Z",
  //    },
  //    {
  //      id: 9,
  //      name: "Retail",
  //      description: "POS systems and inventory management solutions",
  //      img: "/uploads/servingIndustry/retail.jpg",
  //      active: true,
  //      createdAt: "2026-01-18T16:00:00Z",
  //    },
  //    {
  //      id: 10,
  //      name: "Government",
  //      description: "E-governance and public service platforms",
  //      img: "/uploads/servingIndustry/government.jpg",
  //      active: true,
  //      createdAt: "2026-01-19T17:30:00Z",
  //    },
  //  ];

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
            // value={filters.limit}
            // onChange={(e) => {
            //   setFilters({ ...filters, limit: Number(e.target.value) });
            // }}
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
            // value={filters.startDate}
            // onChange={(e) => {
            //   setFilters({ ...filters, startDate: e.target.value });
            // }}
          />
        </div>

        {/* End Date */}
        <div>
          <label className="form-label mb-1">End Date</label>
          <input
            type="date"
            className="form-control"
            // value={filters.endDate}
            // onChange={(e) => {
            //   setFilters({ ...filters, endDate: e.target.value });
            // }}
          />
        </div>

        {/* Apply Button */}
        <button
          className="btn btn-primary px-4"
          //  onClick={applyFilter}
        >
          Apply
        </button>
      </div>
      <PermissionGate permission="postblogcategory">
        <div className="d-flex justify-content-end mb-3">
          <button
            onClick={() => setShowCreateModal((prev) => !prev)}
            className="btn btn-sm btn-success"
          >
            Create Serving industry
          </button>
        </div>
      </PermissionGate>

      <PermissionGate permission="getblogcategory">
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>SNo.</th>
                <th>Name</th>
                {/* <th>img</th> */}
                <th>Image</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {items.length > 0 &&
                items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <img src={item.img} alt="image" width="60" />
                    </td>

                    {/* <td>{item.img || "NA"}</td> */}
                    <td>
                      {new Date(item.createdAt).toLocaleDateString("en-GB")}
                    </td>

                    <td>
                      <div className="d-flex gap-2">
                        <PermissionGate permission="putblogcategory">
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => {
                              // setSelectedCategoryId(item.id);
                              // setCategoryEntry({
                              //   name: item.name,
                              //   img: item.img,
                              //   active: 1,
                              // });
                              setShowEditModal(true);
                            }}
                          >
                            Edit
                          </button>
                        </PermissionGate>
                        <PermissionGate permission="deleteblogcategory">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              // setSelectedCategoryId(item.id);
                              setShowDeleteModal(true);
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
              // onClick={handlePrevious}
              // disabled={filters.offset === 0}
            >
              Previous
            </button>

            <button
              className="btn btn-sm text-white"
              style={{
                background: "linear-gradient(135deg, #43cea2, #185a9d)",
              }}
              // onClick={handleNext}
              // disabled={!meta || filters.offset + filters.limit >= meta.total}
            >
              Next
            </button>
          </div>
        </div>
      </PermissionGate>
      {showCreateModal && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            onClick={() => setShowCreateModal(false)}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create Blog Category</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowCreateModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Category Name</label>
                    <input
                      className="form-control"
                      value={categoryEntry.name}
                      onChange={(e) =>
                        setCategoryEntry({
                          ...categoryEntry,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) =>
                        setCategoryEntry({
                          ...categoryEntry,
                          img: e.target.files[0],
                        })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Active</label>
                    <select
                      className="form-select"
                      value={categoryEntry.active}
                      onChange={(e) =>
                        setCategoryEntry({
                          ...categoryEntry,
                          active: e.target.value,
                        })
                      }
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
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
                    onClick={() => {
                      handleCreate();
                    }}
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
              className="modal-dialog modal-dialog-centered modal-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Blog Category</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Category Name</label>
                    <input
                      className="form-control"
                      // value={categoryEntry.name}
                      // onChange={(e) =>
                      //   setCategoryEntry({
                      //     ...categoryEntry,
                      //     name: e.target.value,
                      //   })
                      // }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">img</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      // value={categoryEntry.img}
                      // onChange={(e) =>
                      //   setCategoryEntry({
                      //     ...categoryEntry,
                      //     img: e.target.value,
                      //   })
                      // }
                    />
                  </div>

                  {/* <div className="mb-3">
                    <label className="form-label">Active</label>
                    <select
                      className="form-select"
                      value={categoryEntry.active}
                      onChange={(e) =>
                        setCategoryEntry({
                          ...categoryEntry,
                          active: e.target.value,
                        })
                      }
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div> */}
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
                      // handleUpdate();
                    }}
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
                    Are you sure you want to delete this Category?
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
                    // onClick={handleDelete}
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

export default ServingIndustryTable;
