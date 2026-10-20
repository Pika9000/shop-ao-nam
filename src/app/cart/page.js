"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  getCartSnapshot,
  getServerCartSnapshot,
  saveCart,
  subscribeToCart,
} from "../../lib/cart-storage";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);

export default function CartPage() {
  const cartSnapshot = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getServerCartSnapshot,
  );
  const [saveError, setSaveError] = useState("");
  const [checkoutNotice, setCheckoutNotice] = useState("");
  const { items, readError } = useMemo(() => {
    try {
      const parsed = JSON.parse(cartSnapshot);
      if (
        !Array.isArray(parsed) ||
        parsed.some(
          (item) =>
            !item ||
            typeof item.id !== "string" ||
            typeof item.name !== "string" ||
            !Number.isFinite(item.price) ||
            !Number.isInteger(item.quantity) ||
            item.quantity < 1,
        )
      ) {
        throw new Error("Dữ liệu giỏ hàng không hợp lệ.");
      }
      return { items: parsed, readError: "" };
    } catch {
      return {
        items: [],
        readError: "Không thể đọc giỏ hàng. Hãy kiểm tra cài đặt lưu trữ của trình duyệt.",
      };
    }
  }, [cartSnapshot]);
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  function updateCart(nextItems) {
    try {
      saveCart(nextItems);
      setSaveError("");
    } catch {
      setSaveError("Không thể lưu giỏ hàng trên trình duyệt.");
    }
  }

  function changeQuantity(id, amount) {
    updateCart(
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + amount) }
            : item,
        ),
    );
  }

  function removeItem(id) {
    updateCart(items.filter((item) => item.id !== id));
  }

  return (
    <main className="store-page">
      <section className="store-heading">
        <p className="store-eyebrow">
          <Link className="admin-brand-link" href="/">SHOP ÁO NAM</Link>
          {" / GIỎ HÀNG"}
        </p>
        <h1>Giỏ hàng của bạn</h1>
        <p>Kiểm tra sản phẩm và số lượng trước khi tiếp tục.</p>
      </section>

      <section className="cart-layout" aria-label="Giỏ hàng">
        <div className="cart-items">
          {(readError || saveError) && (
            <p className="store-message store-message-error" role="alert">{readError || saveError}</p>
          )}

          {items.length === 0 ? (
            <div className="cart-empty">
              <span className="empty-bag" aria-hidden="true">🛍</span>
              <h2>Giỏ hàng đang trống</h2>
              <p>Chọn một món đồ bạn yêu thích để bắt đầu.</p>
              <Link className="button button-dark" href="/products">Khám phá sản phẩm</Link>
            </div>
          ) : (
            <>
              <div className="cart-list-heading">
                <h2>Sản phẩm của bạn</h2>
                <span>{items.length} sản phẩm</span>
              </div>
              {items.map((item) => (
                <article className="cart-item" key={item.id}>
                  <div className={`product-art ${item.art || "art-sand"}`} aria-hidden="true">
                    <span className="product-art-mark">SA</span>
                  </div>
                  <div className="cart-item-info">
                    <span className="product-category">{item.category || "Thời trang nam"}</span>
                    <h3>{item.name}</h3>
                    <p>{formatPrice(item.price)}</p>
                    <div className="quantity-control" aria-label={`Số lượng ${item.name}`}>
                      <button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label="Giảm số lượng">−</button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label="Tăng số lượng">+</button>
                    </div>
                  </div>
                  <div className="cart-item-end">
                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                    <button className="text-button" type="button" onClick={() => removeItem(item.id)}>
                      Xóa
                    </button>
                  </div>
                </article>
              ))}
              <Link className="continue-link" href="/products">← Tiếp tục mua sắm</Link>
            </>
          )}
        </div>

        <aside className="cart-summary">
          <h2>Tóm tắt đơn hàng</h2>
          <div className="summary-line">
            <span>Tạm tính</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <div className="summary-line">
            <span>Phí vận chuyển</span>
            <span>Tính khi thanh toán</span>
          </div>
          <div className="summary-total">
            <span>Tổng cộng</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <button
            className="button button-dark checkout-button"
            type="button"
            disabled={!items.length}
            onClick={() => setCheckoutNotice("Chức năng thanh toán sẽ được tích hợp trong bước tiếp theo.")}
          >
            Tiến hành thanh toán
          </button>
          <p className="checkout-note" role={checkoutNotice ? "status" : undefined}>
            {checkoutNotice || "Thanh toán sẽ được tích hợp trong bước tiếp theo."}
          </p>
        </aside>
      </section>
    </main>
  );
}