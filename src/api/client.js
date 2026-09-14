import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api"

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authService = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (userData) => api.post("/auth/register", userData),
  getMe: () => api.get("/auth/me"),
}

export const workerService = {
  list: (params) => api.get("/workers", { params }),
  getById: (id) => api.get(`/workers/${id}`),
  categoryList: (categoryId) => api.get(`/categories/${categoryId}/workers`),
}

export const categoryService = {
  list: () => api.get("/categories"),
}

export const userService = {
  getById: (id) => api.get(`/users/${id}`),
  update: (id, userData) => api.put(`/users/${id}`, userData),
}

export const contractService = {
  create: (contractData) => api.post("/contracts", contractData),
}