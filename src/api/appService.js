const BASE_URL = "https://skincare-minimalistic-backend.onrender.com/api";

export const api = {
  // Categories
  getCategories: () => fetch(`${BASE_URL}/categories`).then(r => r.json()),
  createCategory: (data) =>
    fetch(`${BASE_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  updateCategory: (id, data) =>
    fetch(`${BASE_URL}/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  deleteCategory: (id) =>
    fetch(`${BASE_URL}/categories/${id}`, { method: "DELETE" }),

  // Subcategories
  getSubCategories: () => fetch(`${BASE_URL}/subcategories`).then(r => r.json()),

  createSubCategory: (data) =>
    fetch(`${BASE_URL}/subcategories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
    
  updateSubCategory: (id, data) =>
    fetch(`${BASE_URL}/subcategories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  deleteSubCategory: (id) =>
    fetch(`${BASE_URL}/subcategories/${id}`, { method: "DELETE" }),

  // Products
  getProducts: () => fetch(`${BASE_URL}/products`).then(r => r.json()),

  createProduct: (data) =>
    console.log("Creando producto con datos:", JSON.stringify(data)) ||
    fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  updateProduct: (id, data) =>
    fetch(`${BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  deleteProduct: (id) =>
    fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE"
    }),

  getOrders:
    () => fetch(`${BASE_URL}/orders`).then(r => r.json()),

  updateOrderStatus: (id, status) =>
    fetch(`${BASE_URL}/orders/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }),
};