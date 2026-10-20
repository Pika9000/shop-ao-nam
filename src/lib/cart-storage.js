const CART_KEY = "shop-ao-nam-cart";
const SERVER_CART = "[]";

export function getCartSnapshot() {
  return window.localStorage.getItem(CART_KEY) || SERVER_CART;
}

export function getServerCartSnapshot() {
  return SERVER_CART;
}

export function subscribeToCart(callback) {
  window.addEventListener("shop-cart-updated", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("shop-cart-updated", callback);
    window.removeEventListener("storage", callback);
  };
}

export function getCart() {
  const value = getCartSnapshot();
  const items = JSON.parse(value);
  if (
    !Array.isArray(items) ||
    items.some(
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
  return items;
}

export function saveCart(items) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("shop-cart-updated"));
}
