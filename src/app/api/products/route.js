import { getProducts } from "../../../lib/products";

export async function GET(request) {
  const query = new URL(request.url).searchParams.get("q")?.trim().toLocaleLowerCase("vi");
  const products = getProducts();
  return Response.json({
    products: query
      ? products.filter((product) =>
          `${product.name} ${product.category} ${product.description}`
            .toLocaleLowerCase("vi")
            .includes(query),
        )
      : products,
  });
}
