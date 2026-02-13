"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import PermissionGate from "@/components/admin/PermissionGate";
import {
//   createBlog,
//   getAllBlog,
//   updateBlog,
//   deleteBlog,
//   getOneBlog,
} from "@/store/slices/module1/blog/blog.thunk";
import axios from "axios";

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
//   const [selectedBlogId, setSelectedBlogId] = useState(null);
//   const [blogEntry, setBlogEntry] = useState({
//     title: "",
//     excerpt: "",
//     content: "",
//     status: "draft",
//     active: true,
//     categoryId: "",
//     image: "",
//   });
//   const [editBlogData, setEditBlogData] = useState({
//     title: "",
//     content: "",
//     excerpt: "",
//     status: "",
//     active: "",
//     categoryId: "",
//     image: "",
//   });

//   const [cat, setCat] = useState([]);

//   const { loading, error, blogs, selectedBlog, meta } = useAppSelector(
//     (state) => state.blog,
//   );

  // console.log("blogs", blogs);

//   const fetchBlogs = async () => {
//     await dispatch(
//       getAllBlog({
//         startDate: filters.startDate || undefined,
//         endDate: filters.endDate || undefined,
//         limit: filters.limit,
//         offset: filters.offset,
//       }),
//     );
//   };

//   const handleCreate = async () => {
//     const formData = new FormData();
//     formData.append("title", blogEntry.title);
//     formData.append("excerpt", blogEntry.excerpt);
//     formData.append("content", blogEntry.content);
//     formData.append("status", blogEntry.status);
//     formData.append("active", blogEntry.active ? "true" : "false");
//     formData.append("categoryId", blogEntry.categoryId);
//     formData.append("image", blogEntry.image);

//     const res = await dispatch(createBlog(formData));

//     if (createBlog.fulfilled.match(res)) {
//       setShowCreateModal(false);
//       fetchBlogs();
//     }
//     setBlogEntry({
//       title: "",
//       excerpt: "",
//       content: "",
//       status: "draft",
//       active: true,
//       categoryId: "",
//       image: "",
//     });
//   };

//   const handleDelete = async () => {
//     if (!selectedBlogId) return;

//     const res = await dispatch(deleteBlog(selectedBlogId));

//     if (deleteBlog.fulfilled.match(res)) {
//       setShowDeleteModal(false);
//       setSelectedBlogId(null);
//     }

//     await dispatch(
//       getAllBlog({
//         limit: filters.limit,
//         offset: filters.offset,
//         startDate: filters.startDate || undefined,
//         endDate: filters.endDate || undefined,
//       }),
//     );
//   };

//   const applyFilter = () => {
//     setFilters({ ...filters, offset: 0 });
//     fetchBlogs();
//   };

//   const handleNext = () => {
//     setFilters({
//       ...filters,
//       offset: filters.offset + filters.limit,
//     });
//   };

//   const handlePrevious = () => {
//     setFilters({
//       ...filters,
//       offset: Math.max(0, filters.offset - filters.limit),
//     });
//   };

//   const handleUpdate = async () => {
//     if (!selectedBlogId) return;
//     const formData = new FormData();
//     formData.append("title", blogEntry.title);
//     formData.append("excerpt", blogEntry.excerpt);
//     formData.append("content", blogEntry.content);
//     formData.append("status", blogEntry.status);
//     formData.append("active", blogEntry.active ? "true" : "false");
//     formData.append("categoryId", blogEntry.categoryId);
//     formData.append("image", blogEntry.image);

//     const res = await dispatch(
//       updateBlog({
//         id: selectedBlogId,
//         data: formData,
//       }),
//     );

//     if (updateBlog.fulfilled.match(res)) {
//       setShowEditModal(false);
//       setBlogEntry({
//         title: "",
//         excerpt: "",
//         content: "",
//         status: "draft",
//         active: true,
//         categoryId: "",
//         image: "",
//       });

//       await dispatch(
//         getAllBlog({
//           limit: filters.limit,
//           offset: filters.offset,
//           startDate: filters.startDate || undefined,
//           endDate: filters.endDate || undefined,
//         }),
//       );
//     }
//   };

//   const fetchCategory = async () => {
//     try {
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/blog`,
//       );

//       setCat(res.data.data);
//       console.log("cat (api response)", res.data.data); // ✅ correct
//     } catch (error) {
//       console.error(error);
//     } finally {
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//     fetchCategory();
//   }, [filters.limit, filters.startDate, filters.endDate, filters.offset]);

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    type: "Full-Time",
    category: "Development",
    active: true,
    salary: "₹6,00,000 / year",
    location:"Delhi",
    description:""
  },
  {
    id: 2,
    title: "Backend Developer",
    type: "Full-Time",
    category: "Development",
    active: true,
    salary: "₹7,50,000 / year",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    type: "Contract",
    category: "Design",
    active: false,
    salary: "₹4,00,000 / year",
  },
  {
    id: 4,
    title: "Digital Marketing Executive",
    type: "Part-Time",
    category: "Marketing",
    active: true,
    salary: "₹3,50,000 / year",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    type: "Full-Time",
    category: "Infrastructure",
    active: true,
    salary: "₹8,00,000 / year",
  },
];


  return (
    <div>
      <div className="d-flex align-items-end gap-3 mb-3 flex-wrap">
        {/* Total Rows */}
        <div>
          <label className="form-label mb-1">Total Rows</label>
          <select className="form-select">
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="form-label mb-1">Start Date</label>
          <input type="date" className="form-control" />
        </div>

        {/* End Date */}
        <div>
          <label className="form-label mb-1">End Date</label>
          <input type="date" className="form-control" />
        </div>

        <button className="btn btn-primary px-4">Apply</button>
      </div>

      {/* Create Blog */}
      {/* <PermissionGate permission="postblog"> */}
      <div className="d-flex justify-content-end mb-3">
        <button
          // onClick={() => setShowCreateModal(true)}
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
                        //   onClick={() => {
                            // setSelectedBlogId(item.id);
                            // setEditBlogData(item);
                            // setShowEditModal(true);
                            // setBlogEntry({
                            //   title: item.title,
                            //   excerpt: item.excerpt,
                            //   content: item.content,
                            //   status: item.status,
                            //   active: item.active ? true : false,
                            //   image: item.img,
                            //   categoryId: item.categoryId,
                            // });
                        //   }}
                        >
                          Edit
                        </button>
                      {/* </PermissionGate> */}

                      {/* <PermissionGate permission="deleteblog"> */}
                        <button
                          className="btn btn-sm btn-danger"
                        //   onClick={() => {
                        //     setSelectedBlogId(item.id);
                        //     setShowDeleteModal(true);
                        //   }}
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
            // onClick={handlePrevious}
            disabled={filters.offset === 0}
          >
            Previous
          </button>

          <button
            className="btn btn-sm text-white"
            style={{ background: "linear-gradient(135deg,#43cea2,#185a9d)" }}
            // onClick={handleNext}
            // disabled={!meta || filters.offset + filters.limit >= meta.total}
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
                  <h5 className="modal-title">Create Blog</h5>
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
                        placeholder="Enter blog title"
                        
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Excerpt</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Short description"
                        
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Content</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        // value={blogEntry.status}
                        // onChange={(e) =>
                        //   setBlogEntry({ ...blogEntry, status: e.target.value })
                        // }
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Image</label>
                      <input
                        type="file"
                        className="form-control"
                        // onChange={(e) =>
                        //   setBlogEntry({
                        //     ...blogEntry,
                        //     image: e.target.files[0],
                        //   })
                        // }
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
                    // onClick={handleCreate}
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
                  <h5 className="modal-title">Edit Blog</h5>
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
                        // value={blogEntry.title}
                        // onChange={(e) =>
                        //   setBlogEntry({ ...blogEntry, title: e.target.value })
                        // }
                      />
                    </div>

                    {/* Slug (Readonly) */}
                    {/* <div className="mb-3">
                      <label className="form-label">Slug</label>
                      <input
                        type="text"
                        className="form-control"
                        value={blogEntry.slug}
                        disabled
                      />
                    </div> */}

                    {/* Excerpt */}
                    <div className="mb-3">
                      <label className="form-label">Excerpt</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        // value={blogEntry.excerpt}
                        // onChange={(e) =>
                        //   setBlogEntry({
                        //     ...blogEntry,
                        //     excerpt: e.target.value,
                        //   })
                        // }
                      />
                    </div>

                    {/* Content */}
                    <div className="mb-3">
                      <label className="form-label">Content</label>
                      <textarea
                        className="form-control"
                        rows={5}
                        // value={blogEntry.content}
                        // onChange={(e) =>
                        //   setBlogEntry({
                        //     ...blogEntry,
                        //     content: e.target.value,
                        //   })
                        // }
                      />
                    </div>

                    {/* Category */}
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      {/* <select
                        className="form-select"
                        style={{ maxHeight: "150px", overflowY: "auto" }}
                        value={blogEntry.categoryId?.toString() || ""}
                        onChange={(e) =>
                          setBlogEntry({
                            ...blogEntry,
                            categoryId: parseInt(e.target.value) || "",
                          })
                        }
                      >
                        <option value="">Select Category</option>
                        {cat.map((c) => (
                          <option key={c.id} value={c.id.toString()}>
                            {c.name}
                          </option>
                        ))}
                      </select> */}
                    </div>

                    {/* Status */}
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      {/* <select
                        className="form-select"
                        value={blogEntry.status}
                        onChange={(e) =>
                          setBlogEntry({ ...blogEntry, status: e.target.value })
                        }
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select> */}
                    </div>

                    {/* Active */}
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="activeCheck"
                        // checked={blogEntry.active}
                        // onChange={(e) =>
                        //   setBlogEntry({
                        //     ...blogEntry,
                        //     active: e.target.checked,
                        //   })
                        // }
                      />
                      <label className="form-check-label" htmlFor="activeCheck">
                        Active
                      </label>
                    </div>

                    {/* Views (Readonly) */}
                    {/* <div className="mb-3">
                      <label className="form-label">Views</label>
                      <input
                        type="number"
                        className="form-control"
                        value={blogEntry.views}
                        disabled
                      />
                    </div> */}

                    {/* Featured Image */}
                    <div className="mb-3">
                      <label className="form-label">Featured Image</label>

                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                        //   setBlogEntry({
                        //     ...blogEntry,
                        //     image: file,
                        //     img: URL.createObjectURL(file), // ✅ preview
                        //   });
                        }}
                      />

                      {/* {blogEntry.image && (
                        <img
                          src={blogEntry.image}
                          alt="preview"
                          className="img-fluid rounded mt-2"
                          style={{ maxHeight: "120px" }}
                        />
                      )} */}
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
                    // onClick={handleUpdate}
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
                  <h5 className="modal-title">Delete Blog</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowDeleteModal(false)}
                  />
                </div>

                <div className="modal-body text-center">
                  <p className="fw-semibold">
                    Are you sure you want to delete this blog?
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
                    // onClick={handleDelete}
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
