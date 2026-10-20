"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

const emptyForm = { name: "", description: "", category: "", price: "", stock: "" };
const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [adminToken, setAdminToken] = useState("");

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/products");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Không thể tải danh sách sản phẩm.");
      setProducts(data.products);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/products")
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Không thể tải danh sách sản phẩm.");
        if (active) setProducts(data.products);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function startEditing(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
    });
    setNotice("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId("");
    setForm(emptyForm);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    const product = {
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
    };

    try {
      const response = await fetch(
        editingId ? `/api/admin/products/${encodeURIComponent(editingId)}` : "/api/admin/products",
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            ...(adminToken ? { "x-admin-token": adminToken } : {}),
          },
          body: JSON.stringify(product),
        },
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Không thể lưu sản phẩm.");

      setNotice(editingId ? "Đã cập nhật sản phẩm." : "Đã thêm sản phẩm mới.");
      resetForm();
      await loadProducts();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  async function removeProduct(product) {
    if (!window.confirm(`Bạn có chắc muốn xóa “${product.name}”?`)) return;

    setError("");
    setNotice("");
    try {
      const response = await fetch(`/api/admin/products/${encodeURIComponent(product.id)}`, {
        method: "DELETE",
        headers: adminToken ? { "x-admin-token": adminToken } : {},
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Không thể xóa sản phẩm.");
      if (editingId === product.id) resetForm();
      setNotice("Đã xóa sản phẩm.");
      await loadProducts();
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <main className="admin-page">
      <section className="admin-heading">
        <div>
          <p className="store-eyebrow">
            <Link className="admin-brand-link" href="/">SHOP ÁO NAM</Link>
            {" / QUẢN TRỊ"}
          </p>
          <h1>Quản lý sản phẩm</h1>
          <p>Thêm mới, cập nhật giá và tồn kho cho cửa hàng.</p>
        </div>
        <Link className="button button-light" href="/products">Xem cửa hàng</Link>
      </section>

      <div className="admin-content">
        <section className="admin-form-card">
          <div className="admin-section-heading">
            <div>
              <span className="admin-step">{editingId ? "CHỈNH SỬA" : "QUẢN LÝ KHO"}</span>
              <h2>{editingId ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}</h2>
            </div>
            {editingId && <button className="text-button" type="button" onClick={resetForm}>Hủy chỉnh sửa</button>}
          </div>

          <form className="admin-product-form" onSubmit={handleSubmit}>
            <label>
              Tên sản phẩm
              <input name="name" value={form.name} onChange={handleChange} required maxLength={100} />
            </label>
            <label>
              Danh mục
              <input name="category" value={form.category} onChange={handleChange} required maxLength={60} placeholder="Ví dụ: Áo thun" />
            </label>
            <label>
              Mô tả
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} maxLength={300} />
            </label>
            <div className="admin-form-row">
              <label>
                Giá bán (₫)
                <input name="price" type="number" min="1" step="1" value={form.price} onChange={handleChange} required />
              </label>
              <label>
                Tồn kho
                <input name="stock" type="number" min="0" step="1" value={form.stock} onChange={handleChange} required />
              </label>
            </div>
            <label>
              Mã quản trị (chỉ cần khi đã cấu hình trên server)
              <input
                type="password"
                value={adminToken}
                onChange={(event) => setAdminToken(event.target.value)}
                autoComplete="off"
              />
            </label>
            {error && <p className="store-message store-message-error" role="alert">{error}</p>}
            {notice && <p className="store-message" role="status">{notice}</p>}
            <button className="button button-dark admin-submit" type="submit" disabled={saving}>
              {saving ? "Đang lưu…" : editingId ? "Lưu thay đổi" : "Thêm sản phẩm"}
            </button>
          </form>
          <p className="admin-demo-note">
            Bản demo: API quản trị dùng dữ liệu trong bộ nhớ server. Khi triển khai production, cần cấu hình <code>ADMIN_API_TOKEN</code>.
          </p>
        </section>

        <section className="admin-list-section">
          <div className="admin-section-heading">
            <div>
              <span className="admin-step">DANH MỤC CỬA HÀNG</span>
              <h2>Sản phẩm hiện có</h2>
            </div>
            <span className="admin-count">{products.length}</span>
          </div>
          {loading ? (
            <p className="store-loading">Đang tải danh sách…</p>
          ) : products.length === 0 ? (
            <div className="catalog-empty"><p>Chưa có sản phẩm nào.</p></div>
          ) : (
            <div className="admin-product-list">
              {products.map((product) => (
                <article className="admin-product-row" key={product.id}>
                  <div className={`product-art admin-product-art ${product.art}`} aria-hidden="true">
                    <span className="product-art-mark">SA</span>
                  </div>
                  <div className="admin-product-details">
                    <span className="product-category">{product.category}</span>
                    <h3>{product.name}</h3>
                    <p>{formatPrice(product.price)} <span>·</span> Tồn kho: {product.stock}</p>
                  </div>
                  <div className="admin-row-actions">
                    <button className="text-button" type="button" onClick={() => startEditing(product)}>Sửa</button>
                    <button className="text-button text-button-danger" type="button" onClick={() => removeProduct(product)}>Xóa</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
