"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getAllMenus,
  createMenu,
  getMenuBySlug,
  updateMenu,
  deleteMenuBySlug,
} from "@/store/slices/module1/menu/menu.thunk";

const PERMISSIONS = ["post", "get", "put", "delete"] as const;

const MenuTable = () => {
  const dispatch = useAppDispatch();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [createMenuEntry, setCreateMenuEntry] = useState<{
    slug: string;
    submenus: string[];
  }>({
    slug: "",
    submenus: [],
  });
  const [editMenuEntry, setEditMenuEntry] = useState<{
    slug: string;
    menus: string[];
  }>({
    slug: "",
    menus: [],
  });
  const [deleteSlug,setDeleteSlug] = useState('')

  const { menus, selectedMenu, loading, creating, error } = useAppSelector(
    (state) => state.menu
  );

  console.log("selectedMenu", selectedMenu);

  const fetchMenus = async () => {
    await dispatch(getAllMenus());
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateMenuEntry((prev) => ({
      ...prev,
      slug: e.target.value,
    }));
  };

  const handlePermissionChange = (permission: string) => {
    setCreateMenuEntry((prev) => ({
      ...prev,
      submenus: prev.submenus.includes(permission)
        ? prev.submenus.filter((p) => p !== permission)
        : [...prev.submenus, permission],
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    setCreateMenuEntry((prev) => ({
      ...prev,
      submenus: checked ? [...PERMISSIONS] : [],
    }));
  };

  const createMenuSubmit = async () => {
    await dispatch(createMenu(createMenuEntry));
    setCreateMenuEntry({ slug: "", submenus: [] });
    setShowCreateModal(false);
    fetchMenus();
  };

  const handleEditClick = async (slug) => {
    try {
      const res = await dispatch(getMenuBySlug(slug)).unwrap();
      setEditMenuEntry({
        slug: res?.data?.slug,
        menus: res?.data?.menus, // or res.data.submenus
      });
      console.log("createMenuEntry", createMenuEntry);
    } catch (err) {
      console.error(err);
    }
  };

  const hasPermission = (type) => {
    return editMenuEntry.menus?.some((m) =>
      m.menuName.toLowerCase().startsWith(type)
    );
  };

  const togglePermission = (type) => {
    setEditMenuEntry((prev) => {
      const exists = prev.menus.some((m) => m.menuName.startsWith(type));

      return {
        ...prev,
        menus: exists
          ? prev.menus.filter((m) => !m.menuName.startsWith(type))
          : [...prev.menus, { menuName: `${type}${prev.slug}` }],
      };
    });
  };

  const handleUpdateMenu = async () => {
    try {
      console.log("updated menu", editMenuEntry);
      await dispatch(updateMenu(editMenuEntry)).unwrap();
      setShowEditModal(false);
      await fetchMenus();
    } catch (err) {
      console.error("Update failed:", err);
      // toast.error(err as string);
    }
  };

  const handleDelete = async()=>{
    console.log("delete slug",deleteSlug);
    await dispatch(deleteMenuBySlug(deleteSlug)).unwrap();
    await fetchMenus();
    setShowDeleteModal(false);
    
  }

  useEffect(() => {
    fetchMenus();
  }, [dispatch]);

  return (
    <div>
      <div className="d-flex align-items-end gap-3 mb-3 flex-wrap">
        {/* Total Rows */}
        <div>
          <label htmlFor="totalRows" className="form-label mb-1">
            Total Rows
          </label>

          <select id="totalRows" className="form-select">
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

        {/* Apply Button */}
        <button className="btn btn-primary px-4">Apply</button>
      </div>

      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={() => setShowCreateModal((prev) => !prev)}
          className="btn btn-sm btn-success"
        >
          Create Menu
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>SNo.</th>
              <th>Slug</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {menus.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.slug}</td>
                <td>
                  <span>{item?.menus.length}</span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => {
                        setShowEditModal((prev) => !prev);
                        handleEditClick(item.slug);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        setShowDeleteModal((prev) => !prev);
                        setDeleteSlug(item.slug);
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
            style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
          >
            Previous
          </button>

          <button
            className="btn btn-sm text-white"
            style={{ background: "linear-gradient(135deg, #43cea2, #185a9d)" }}
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
            onClick={() => setShowCreateModal(false)} // 👈 outside click
          >
            <div
              className="modal-dialog modal-dialog-centered modal-md"
              onClick={(e) => e.stopPropagation()} // 👈 prevent inner click
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create Menu</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowCreateModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Menu Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter menu name"
                        value={createMenuEntry.slug}
                        onChange={handleSlugChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Options</label>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="selectAll"
                          checked={
                            createMenuEntry.submenus.length ===
                            PERMISSIONS.length
                          }
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="selectAll">
                          Select All
                        </label>
                      </div>

                      {PERMISSIONS.map((perm) => (
                        <div className="form-check" key={perm}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={perm}
                            checked={createMenuEntry.submenus.includes(perm)}
                            onChange={() => handlePermissionChange(perm)}
                          />
                          <label className="form-check-label" htmlFor={perm}>
                            {perm.charAt(0).toUpperCase() + perm.slice(1)}
                          </label>
                        </div>
                      ))}
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
                    onClick={() => createMenuSubmit()}
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
                  <h5 className="modal-title">Edit Menu</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Menu Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter menu name"
                        value={editMenuEntry.slug}
                        onChange={(e) =>
                          setEditMenuEntry((prev) => ({
                            ...prev,
                            slug: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Options</label>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="create"
                          checked={hasPermission("post")}
                          onChange={() => togglePermission("post")}
                        />
                        <label className="form-check-label" htmlFor="create">
                          POST
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="get"
                          checked={hasPermission("get")}
                          onChange={() => togglePermission("get")}
                        />
                        <label className="form-check-label" htmlFor="get">
                          Get
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="update"
                          checked={hasPermission("put")}
                          onChange={() => togglePermission("put")}
                        />
                        <label className="form-check-label" htmlFor="update">
                          PUT
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="delete"
                          checked={hasPermission("delete")}
                          onChange={() => togglePermission("delete")}
                        />
                        <label className="form-check-label" htmlFor="delete">
                          DELETE
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
                    onClick={() => {
                      handleUpdateMenu();
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
          {/* Modal Wrapper */}
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            onClick={() => setShowDeleteModal(false)} // 👈 outside click
          >
            <div
              className="modal-dialog modal-dialog-centered modal-md"
              onClick={(e) => e.stopPropagation()} // 👈 prevent inner click
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Delete Menu</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowDeleteModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <h4>Sure, Want to Delete</h4>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-sm btn-success"
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

export default MenuTable;
