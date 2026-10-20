import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* 1. Thanh tiêu đề (Header) */}
      <header>
        <div className="logo">
          <Link href="/">
            <h1>Shop Áo</h1>
          </Link>
        </div>

        <nav>
          <ul>
            <li><Link href="/">Trang chủ</Link></li>
            <li><Link href="/products">Sản phẩm</Link></li>
            <li><Link href="/about-us">Giới thiệu</Link></li>
            <li><Link href="/contact">Liên hệ</Link></li>
          </ul>

          <ul>
            <li><Link href="/login">Đăng nhập</Link></li>
            <li><Link href="/register">Đăng ký</Link></li>
          </ul>
        </nav>

        <div className="cart-icon">
          <Link href="/cart">
            Giỏ hàng: <strong>0</strong> sản phẩm
          </Link>
        </div>
      </header>

      {/* 2. Nội dung chính của trang (Main Content) */}
      <main style={{ padding: '40px 20px', minHeight: '50vh' }}>
        <h2>Sản Phẩm Mới Nhất</h2>
        <p>Nội dung danh sách sản phẩm sẽ hiển thị ở đây...</p>
      </main>

      {/* 3. Thông tin đáy trang (Footer) */}
      <footer className="site-footer">
        <div className="footer-container">
          {/* Cột 1: Thông tin liên hệ Shop */}
          <div className="footer-info">
            <h3>SHOP ÁO THỜI TRANG</h3>
            <p>Chuyên cung cấp các sản phẩm thời trang chất lượng, uy tín và hợp mốt.</p>
            <p><strong>Địa chỉ:</strong> 123 Đường Tăng Nhơn Phú, Quận 9, TP. Hồ Chí Minh</p>
            <p><strong>Hotline:</strong> 0123 456 789</p>
            <p><strong>Email:</strong> hotro@shopao.com</p>
          </div>

          {/* Cột 2: Điều hướng nhanh */}
          <div className="footer-links">
            <h4>Liên Kết Nhanh</h4>
            <ul>
              <li><Link href="/">Trang chủ</Link></li>
              <li><Link href="/products">Sản phẩm</Link></li>
              <li><Link href="/about-us">Giới thiệu</Link></li>
              <li><Link href="/contact">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Cột 3: Chính sách */}
          <div className="footer-policy">
            <h4>Chính Sách Khách Hàng</h4>
            <ul>
              <li><Link href="#">Chính sách đổi trả</Link></li>
              <li><Link href="#">Chính sách bảo mật</Link></li>
              <li><Link href="#">Điều khoản dịch vụ</Link></li>
              <li><Link href="#">Hướng dẫn mua hàng</Link></li>
            </ul>
          </div>
        </div>

        {/* Dòng bản quyền ở dưới cùng */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Shop Áo. Tất cả quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
}
