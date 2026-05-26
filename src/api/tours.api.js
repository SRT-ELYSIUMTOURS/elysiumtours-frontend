import client from "./client";

const BASE = "/tourist/tours";

export const listToursApi = (params = {}) =>
  client.get(`${BASE}`, { params }).then((r) => r.data);

export const searchToursApi = (params = {}) =>
  client.get(`${BASE}/search`, { params }).then((r) => r.data);

export const getTourApi = (id) =>
  client.get(`${BASE}/${id}`).then((r) => r.data);

export const getTourBySlugApi = (slug) =>
  client.get(`${BASE}/slug/${slug}`).then((r) => r.data);

export const incrementTourViewApi = (packageId) =>
  client.post(`${BASE}/${packageId}/view`).then((r) => r.data).catch(() => null);

export const joinWaitlistApi = (packageId, data) =>
  client.post(`${BASE}/${packageId}/waitlist`, data).then((r) => r.data);
