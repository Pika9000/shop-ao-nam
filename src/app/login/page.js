"use client";

import Link from "next/link";

export default function LoginPage() {
  function handleSubmit(event) {
    event.preventDefault();

    // TODO: Tích hợp API đăng nhập tại đây
    alert("Chức năng đăng nhập đang được phát triển!");
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>ĐĂNG NHẬP</h2>

        <input
          type="text"
          id="username"
          name="username"
          placeholder="Email hoặc tên đăng nhập"
          autoComplete="username"
          required
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mật khẩu"
          autoComplete="current-password"
          required
        />

        <div className="form-links">
          <Link href="/forgot-password">
            Quên mật khẩu?
          </Link>

          <Link href="/register">
            Đăng ký
          </Link>
        </div>

        <button type="submit" className="login-button">
          ĐĂNG NHẬP
        </button>

        <div className="form-login-links">
          <button
            type="button"
            className="google-button"
            onClick={() => alert("Đăng nhập Google chưa được tích hợp")}
          >
            Đăng nhập với Google
          </button>

          <button
            type="button"
            className="facebook-button"
            onClick={() => alert("Đăng nhập Facebook chưa được tích hợp")}
          >
            Đăng nhập với Facebook
          </button>
        </div>

        <p className="register-prompt">
          Chưa có tài khoản?{" "}
          <Link href="/register">Đăng ký ngay</Link>
        </p>
      </form>
    </div>
  );
}
