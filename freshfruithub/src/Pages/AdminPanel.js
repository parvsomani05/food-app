import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";

const toSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const AdminPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "products");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: "",
    category: "",
    description: "",
    imageUrl: "",
    stock: "",
  });

  const load = async () => {
    const { data } = await api.get("/products");
    setProducts(data);
  };

  useEffect(() => {
    load();
  }, []);

  const loadOrders = async () => {
    const { data } = await api.get("/orders");
    setOrders(data);
  };

  const loadUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "orders") loadOrders();
    if (activeTab === "users") loadUsers();
  }, [activeTab]);

  // Update URL when tab changes
  useEffect(() => {
    const currentTab = searchParams.get("tab");
    if (currentTab !== activeTab) {
      setSearchParams({ tab: activeTab });
    }
  }, [activeTab, searchParams, setSearchParams]);

  const onChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "name") {
      setForm((prev) => ({
        ...prev,
        name: value,
        slug: prev.slug || toSlug(value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = form.imageUrl;
    if (form.file) {
      const fd = new FormData();
      fd.append("image", form.file);
      const { data } = await api.post("/uploads", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      imageUrl = data.url;
    }
    const payload = {
      name: form.name,
      slug: form.slug || toSlug(form.name),
      price: Number(form.price) || 0,
      category: form.category,
      description: form.description,
      stock: Number(form.stock) || 0,
      imageUrls: imageUrl ? [imageUrl] : [],
    };
    await api.post("/products", payload);
    setForm({
      name: "",
      slug: "",
      price: 0,
      category: "",
      description: "",
      imageUrl: "",
      stock: 0,
    });
    load();
  };

  const startEdit = (p) => {
    setEditingId(p._id);
    setEditForm({
      name: p.name,
      slug: p.slug,
      price: p.price,
      category: p.category,
      description: p.description || "",
      imageUrl: p.imageUrls?.[0] || "",
      stock: p.stock || 0,
    });
  };

  const saveEdit = async () => {
    const payload = {
      name: editForm.name,
      slug: editForm.slug || toSlug(editForm.name),
      price: Number(editForm.price) || 0,
      category: editForm.category,
      description: editForm.description,
      stock: Number(editForm.stock) || 0,
      imageUrls: editForm.imageUrl ? [editForm.imageUrl] : [],
    };
    await api.put(`/products/${editingId}`, payload);
    setEditingId(null);
    setEditForm(null);
    load();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    load();
  };

  const updateOrderStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, { orderStatus: status });
    loadOrders();
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      await api.put(`/users/${userId}/role`, { role: newRole });
      loadUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
      alert("Error updating user role");
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Delete this user? This action cannot be undone.")) return;
    try {
      await api.delete(`/users/${userId}`);
      loadUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Admin Panel</h2>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "products" ? "active" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              Manage Products
            </button>
          </li>
          <li className="nav-item ms-2">
            <button
              className={`nav-link ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              Manage Orders
            </button>
          </li>
          <li className="nav-item ms-2">
            <button
              className={`nav-link ${activeTab === "users" ? "active" : ""}`}
              onClick={() => setActiveTab("users")}
            >
              Manage Users
            </button>
          </li>
        </ul>
      </div>
      {activeTab === "products" && (
        <>
          <form onSubmit={onSubmit} className="mb-4">
            <div className="row g-2">
              <div className="col">
                <input
                  className="form-control"
                  placeholder="Product Name"
                  value={form.name}
                  onChange={onChange("name")}
                  required
                />
              </div>
              <div className="col">
                <input
                  className="form-control"
                  placeholder="Slug (auto from name, editable)"
                  value={form.slug}
                  onChange={onChange("slug")}
                />
              </div>
            </div>
            <div className="row g-2 mt-2">
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price (Rs) (e.g., 40)"
                  value={form.price}
                  onChange={onChange("price")}
                  min={0}
                />
              </div>
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Quantity (e.g., 10)"
                  value={form.stock}
                  onChange={onChange("stock")}
                  min={0}
                />
              </div>
              <div className="col">
                <input
                  className="form-control"
                  placeholder="Category"
                  value={form.category}
                  onChange={onChange("category")}
                  required
                />
              </div>
            </div>
            <div className="row g-2 mt-2">
              <div className="col">
                <input
                  className="form-control"
                  placeholder="Image URL"
                  value={form.imageUrl}
                  onChange={onChange("imageUrl")}
                />
              </div>
              <div className="col">
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, file: e.target.files?.[0] }))
                  }
                />
              </div>
            </div>
            {form.imageUrl ? (
              <div className="mt-2">
                <img
                  src={form.imageUrl}
                  alt="preview"
                  style={{ height: 120, objectFit: "cover" }}
                />
              </div>
            ) : null}
            <div className="mt-2">
              <textarea
                className="form-control"
                placeholder="Description"
                value={form.description}
                onChange={onChange("description")}
              />
            </div>
            <button className="btn btn-primary mt-3">Create Product</button>
          </form>
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>
                    {p.imageUrls?.[0] ? (
                      <img
                        src={p.imageUrls[0]}
                        alt={p.name}
                        style={{ height: 40 }}
                      />
                    ) : null}
                  </td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.stock ?? 0}</td>
                  <td>₹{p.price}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => startEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteProduct(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {editingId && (
            <div className="card p-3">
              <h5>Edit Product</h5>
              <div className="row g-2">
                <div className="col">
                  <input
                    className="form-control"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                  />
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    value={editForm.slug}
                    onChange={(e) =>
                      setEditForm({ ...editForm, slug: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row g-2 mt-2">
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm({ ...editForm, price: e.target.value })
                    }
                  />
                </div>
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    value={editForm.stock}
                    onChange={(e) =>
                      setEditForm({ ...editForm, stock: e.target.value })
                    }
                  />
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row g-2 mt-2">
                <div className="col">
                  <input
                    className="form-control"
                    value={editForm.imageUrl}
                    onChange={(e) =>
                      setEditForm({ ...editForm, imageUrl: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="mt-2">
                <textarea
                  className="form-control"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                />
              </div>
              <div className="mt-3">
                <button className="btn btn-success me-2" onClick={saveEdit}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === "orders" && (
        <div className="card p-4 w-100 shadow-sm" style={{ minHeight: "60vh" }}>
          <h5>All Orders</h5>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Status</th>
                  <th>Placed</th>
                </tr>
              </thead>
              <tbody>
                {orders.flatMap((o) =>
                  (o.items || []).map((it, idx) => (
                    <tr key={`${o._id}_${idx}`}>
                      <td>
                        {it.imageUrl ? (
                          <img
                            src={it.imageUrl}
                            alt={it.name}
                            style={{ height: 40 }}
                          />
                        ) : null}
                      </td>
                      <td>{it.name}</td>
                      <td>{it.quantity}</td>
                      <td>₹{it.price}</td>
                      <td>{o._id.slice(-6)}</td>
                      <td>
                        {o.user?.name}
                        <br />
                        <small>{o.user?.email}</small>
                      </td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={o.orderStatus}
                          onChange={(e) =>
                            updateOrderStatus(o._id, e.target.value)
                          }
                        >
                          <option value="pending">pending</option>
                          <option value="paid">paid</option>
                          <option value="shipped">shipped</option>
                          <option value="delivered">delivered</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                      </td>
                      <td>{new Date(o.createdAt).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <div className="card p-4 w-100 shadow-sm" style={{ minHeight: "60vh" }}>
          <h5>All Users</h5>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={user.role}
                        onChange={(e) => updateUserRole(user._id, e.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteUser(user._id)}
                      >
                        <i className="fa fa-trash me-1"></i>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
