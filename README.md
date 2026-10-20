This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Giỏ hàng và quản trị sản phẩm

- `/products`: xem sản phẩm và thêm vào giỏ hàng.
- `/cart`: cập nhật số lượng hoặc xóa sản phẩm. Giỏ hàng được lưu trong `localStorage` của trình duyệt.
- `/admin/products`: giao diện demo thêm, sửa, xóa sản phẩm.
- `GET /api/products?q=...`: danh sách sản phẩm công khai, có thể lọc theo từ khóa.
- `GET /api/admin/products`, `POST /api/admin/products`: đọc và tạo sản phẩm.
- `PUT /api/admin/products/[id]`, `DELETE /api/admin/products/[id]`: cập nhật và xóa sản phẩm.

API quản trị cho phép ghi dữ liệu không cần token khi chạy môi trường development. Khi chạy production, cần cấu hình biến môi trường `ADMIN_API_TOKEN` trên server và nhập token đó trong trang quản trị. Danh mục sản phẩm hiện dùng bộ nhớ của tiến trình để demo nên sẽ trở về dữ liệu mẫu khi server khởi động lại; hãy thay bằng database trước khi triển khai cửa hàng thực tế.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
