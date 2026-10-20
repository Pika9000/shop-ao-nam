
import Link from "next/link";

export default function Home() {
  return (
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
  );
}
