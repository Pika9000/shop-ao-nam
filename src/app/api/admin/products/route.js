import {
  createProduct,
  getProducts,
  isAdminAuthorized,
  validateProduct,
} from "../../../../lib/products";

function authorizationError() {
  const status = process.env.ADMIN_API_TOKEN ? 401 : 503;
  const error = status === 401
    ? "Không có quyền quản trị sản phẩm."
    : "API quản trị chỉ hoạt động ở môi trường phát triển hoặc khi đã cấu hình ADMIN_API_TOKEN.";
  return Response.json({ error }, { status });
}

export async function GET() {
  return Response.json({ products: getProducts() });
}

export async function POST(request) {
  if (!isAdminAuthorized(request)) return authorizationError();

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Dữ liệu JSON không hợp lệ." }, { status: 400 });
  }

  const input = validateProduct(body);
  if (!input) {
    return Response.json(
      { error: "Tên, danh mục, giá hợp lệ và tồn kho không âm là bắt buộc." },
      { status: 400 },
    );
  }

  return Response.json({ product: createProduct(input) }, { status: 201 });
}
