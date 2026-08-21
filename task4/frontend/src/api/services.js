import api, { unwrap } from './api';
const get = (url) => api.get(url).then(unwrap);
const post = (url, body) => api.post(url, body).then(unwrap);
const patch = (url, body) => api.patch(url, body).then(unwrap);
const del = (url) => api.delete(url).then(unwrap);

export const productsApi = { all: () => get('/product/getAll'), one: (id) => get(`/product/getProduct/${id}`), create: (data) => post('/product/add', data), update: (id, data) => patch(`/product/update/${id}`, data), remove: (id) => del(`/product/delete/${id}`) };
export const suppliersApi = { all: () => get('/supplier/getAll'), create: (data) => post('/supplier/create', data), update: (id, data) => patch(`/supplier/update/${id}`, data), remove: (id) => del(`/supplier/delete/${id}`) };
export const salesApi = { all: () => get('/sales/getSales'), byProduct: (id) => get(`/sales/getProductSale/${id}`), create: (data) => post('/sales/add', data) };
export const reportsApi = { totals: () => get('/report/getTotalQuantity'), highest: () => get('/report/getHighestStock'), suppliersF: () => get('/report/suppliersStartWithF'), neverSold: () => get('/report/getProductsNeverSold'), salesDetails: () => get('/report/getAllSales') };
