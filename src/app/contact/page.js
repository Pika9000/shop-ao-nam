"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Hiện tại chỉ kiểm tra form ở phía trình duyệt.
    // Muốn gửi email thật cần tích hợp API hoặc backend.
    setStatus("Thông tin đã được kiểm tra. Chức năng gửi liên hệ đang được phát triển.");

    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  }

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <p className="contact-eyebrow">SHOP ÁO NAM</p>
        <h1>Liên hệ với chúng tôi</h1>
        <p>
          Bạn cần tư vấn về sản phẩm, kích cỡ hoặc đơn hàng?
          Hãy gửi lời nhắn cho chúng tôi nhé!
        </p>
      </section>

      <section className="contact-container">
        <div className="contact-info">
          <h2>Thông tin liên hệ</h2>
          <p className="contact-description">
            Shop luôn sẵn sàng hỗ trợ bạn lựa chọn phong cách
            phù hợp nhất.
          </p>

          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <div>
              <h3>Địa chỉ</h3>
              <p>Vui lòng cập nhật địa chỉ cửa hàng</p>
            </div>
          </div>

          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <div>
              <h3>Điện thoại</h3>
              <p>Vui lòng cập nhật số điện thoại</p>
            </div>
          </div>

          <div className="contact-item">
            <span className="contact-icon">✉️</span>
            <div>
              <h3>Email</h3>
              <p>Vui lòng cập nhật email cửa hàng</p>
            </div>
          </div>

          <div className="contact-item">
            <span className="contact-icon">🕒</span>
            <div>
              <h3>Giờ làm việc</h3>
              <p>Thứ 2 – Thứ 7: 8:00 – 21:00</p>
              <p>Chủ nhật: 9:00 – 18:00</p>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <h2>Gửi tin nhắn</h2>
          <p className="contact-description">
            Điền thông tin bên dưới, chúng tôi sẽ hỗ trợ bạn.
          </p>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Họ và tên *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nhập họ và tên"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Chủ đề *</label>
              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
              >
                <option value="">Chọn chủ đề</option>
                <option value="product">Tư vấn sản phẩm</option>
                <option value="order">Đơn hàng</option>
                <option value="shipping">Giao hàng</option>
                <option value="return">Đổi trả sản phẩm</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Nội dung *</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Bạn cần chúng tôi hỗ trợ điều gì?"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="contact-submit">
              Gửi liên hệ
            </button>

            {status && (
              <p className="contact-status" role="status">
                {status}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
