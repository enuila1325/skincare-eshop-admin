const BASE_URL_PRODUCTS = "https://skincare-minimalistic-backend.onrender.com/api/products";
const BASE_URL_ORDERS = "https://skincare-minimalistic-backend.onrender.com/api/orders";

export const getOrders = async () => {
  const res = await fetch(BASE_URL_ORDERS);
  return res.json();
};

export const updateOrderStatus = async (id, status) => {
  const res = await fetch(`${BASE_URL_ORDERS}/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  return res.json();
};

export const getProducts = async () => {
  const res = await fetch(BASE_URL_PRODUCTS);
  return res.json();
};

export const createProduct = async (data) => {
  const res = await fetch(BASE_URL_PRODUCTS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateProduct = async (id, data) => {
  const res = await fetch(`${BASE_URL_PRODUCTS}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteProduct = async (id) => {
  await fetch(`${BASE_URL_PRODUCTS}/${id}`, {
    method: "DELETE",
  });
};