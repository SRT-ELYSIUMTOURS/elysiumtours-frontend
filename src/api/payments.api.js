import client from "./client";

const BASE = "/tourist/payments";

export const initiatePaymentApi = (data) =>
  client.post(`${BASE}/initiate`, data).then((r) => r.data);

export const verifyPaymentApi = (reference) =>
  client.post(`${BASE}/verify`, { reference }).then((r) => r.data);

export const listTransactionsApi = (params = {}) =>
  client.get(`${BASE}/transactions`, { params }).then((r) => r.data);

export const getTransactionApi = (id) =>
  client.get(`${BASE}/transactions/${id}`).then((r) => r.data);
