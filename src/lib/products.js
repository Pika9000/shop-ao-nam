import { randomUUID } from "node:crypto";

const STORE_KEY = Symbol.for("shop-ao-nam.products");

const starterProducts = [
  {
    id: "ao-thun-essential",
    name: "Áo thun Essential",
    description: "Chất cotton mềm thoáng, phom dáng vừa vặn cho mọi ngày.",
    category: "Áo thun",
    price: 229000,
    stock: 18,
    art: "art-sand",
  },
  {
    id: "ao-polo-modern",
    name: "Áo polo Modern",
    description: "Thiết kế tối giản, dễ mặc từ công sở đến cuối tuần.",
    category: "Áo polo",
    price: 329000,
    stock: 12,
    art: "art-sage",
  },
  {
    id: "so-mi-overshirt",
    name: "Sơ mi Overshirt",
    description: "Lớp khoác nhẹ với chất vải đứng phom và sắc màu trung tính.",
    category: "Áo sơ mi",
    price: 389000,
    stock: 8,
    art: "art-blue",
  },
];

function getStore() {
  if (!globalThis[STORE_KEY]) {
    globalThis[STORE_KEY] = starterProducts.map((product) => ({ ...product }));
  }
  return globalThis[STORE_KEY];
}

export function getProducts() {
  return getStore().map((product) => ({ ...product }));
}

export function createProduct(input) {
  const product = {
    ...input,
    id: randomUUID(),
    art: ["art-sand", "art-sage", "art-blue"][getStore().length % 3],
  };
  getStore().push(product);
  return { ...product };
}

export function updateProduct(id, input) {
  const index = getStore().findIndex((product) => product.id === id);
  if (index === -1) return null;

  const updated = { ...getStore()[index], ...input, id };
  getStore()[index] = updated;
  return { ...updated };
}

export function deleteProduct(id) {
  const index = getStore().findIndex((product) => product.id === id);
  if (index === -1) return false;
  getStore().splice(index, 1);
  return true;
}

export function validateProduct(input) {
  if (
    !input ||
    typeof input !== "object" ||
    Array.isArray(input) ||
    typeof input.name !== "string" ||
    !input.name.trim() ||
    typeof input.description !== "string" ||
    typeof input.category !== "string" ||
    !input.category.trim() ||
    !Number.isInteger(input.price) ||
    input.price <= 0 ||
    !Number.isInteger(input.stock) ||
    input.stock < 0
  ) {
    return null;
  }

  return {
    name: input.name.trim(),
    description: input.description.trim(),
    category: input.category.trim(),
    price: input.price,
    stock: input.stock,
  };
}

export function isAdminAuthorized(request) {
  const token = process.env.ADMIN_API_TOKEN;
  if (!token) return process.env.NODE_ENV !== "production";
  return request.headers.get("x-admin-token") === token;
}
