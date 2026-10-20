"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCart, saveCart } from "../../lib/cart-storage";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Không thể tải sản phẩm.");
        setProducts(data.products);
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  function addToCart(product) {
    try {
      const cart = getCart();
      const existing = cart.find((item) => item.id === product.id);
      if (existing && existing.quantity >= product.stock) {
        setNotice("Bạn đã chọn hết số lượng sản phẩm hiện có.");
        return;
      }
      const nextCart = existing
        ? cart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...cart, { ...product, quantity: 1 }];
      saveCart(nextCart);
      setNotice(`Đã thêm “${product.name}” vào giỏ hàng.`);
    } catch {
      setError("Không thể lưu giỏ hàng trên trình duyệt.");
    }
  }

  return (
    <main className="store-page">
      <section className="store-heading">
        <p className="store-eyebrow">
          <Link className="admin-brand-link" href="/">SHOP ÁO NAM</Link>
          {" / BỘ SƯU TẬP MỚI"}
        </p>
        <h1>Phong cách của bạn, mỗi ngày</h1>
        <p>Những thiết kế thiết yếu, dễ phối và luôn thoải mái.</p>
        <div className="store-heading-links">
          <Link href="/cart">Xem giỏ hàng →</Link>
          <Link href="/admin/products">Quản lý sản phẩm →</Link>
        </div>
      </section>

      <section className="catalog-section">
        <div className="catalog-toolbar">
          <h2>Sản phẩm nổi bật</h2>
          <span>{products.length} sản phẩm</span>
        </div>
        {notice && <p className="store-message" role="status">{notice}</p>}
        {error && <p className="store-message store-message-error" role="alert">{error}</p>}
        {loading ? (
          <p className="store-loading">Đang tải sản phẩm…</p>
        ) : products.length === 0 ? (
          <div className="catalog-empty">
            <h3>Chưa có sản phẩm</h3>
            <p>Thêm sản phẩm từ trang quản trị để hiển thị tại đây.</p>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <div className={`product-art product-card-art ${product.art}`} aria-hidden="true">
                  <span className="product-art-mark">SA</span>
                  <span className="art-caption">DAILY ESSENTIALS</span>
                </div>
                <div className="product-card-info">
                  <div className="product-card-title">
                    <div>
                      <span className="product-category">{product.category}</span>
                      <h3>{product.name}</h3>
                    </div>
                    <strong>{formatPrice(product.price)}</strong>
                  </div>
                  <p className="product-description">{product.description}</p>
                  <div className="product-card-footer">
                    <span>{product.stock > 0 ? `Còn ${product.stock} sản phẩm` : "Tạm hết hàng"}</span>
                    <button
                      className="button button-dark"
                      type="button"
                      onClick={() => addToCart(product)}
                      disabled={product.stock < 1}
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
