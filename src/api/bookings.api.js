import client from "./client";

const BASE = "/tourist/me";

export const createBookingApi = (data) =>
  client.post(`${BASE}/bookings`, data).then((r) => r.data);

export const listMyBookingsApi = (params = {}) =>
  client.get(`${BASE}/bookings`, { params }).then((r) => r.data);

export const getMyBookingApi = (id) =>
  client.get(`${BASE}/bookings/${id}`).then((r) => r.data);

export const cancelMyBookingApi = (id, reason) =>
  client.put(`${BASE}/bookings/${id}/cancel`, { reason }).then((r) => r.data);
