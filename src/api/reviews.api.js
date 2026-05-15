import client from "./client";

const PUBLIC = "/tourist/reviews";
const AUTH   = "/tourist/me";

export const listReviewsByTourApi = (tourPackageId, params = {}) =>
  client.get(`${PUBLIC}/tour/${tourPackageId}`, { params }).then((r) => r.data);

export const getReviewStatsApi = (tourPackageId) =>
  client.get(`${PUBLIC}/stats/${tourPackageId}`).then((r) => r.data);

export const createReviewApi = (data) =>
  client.post(`${AUTH}/reviews`, data).then((r) => r.data);

export const updateReviewApi = (id, data) =>
  client.put(`${AUTH}/reviews/${id}`, data).then((r) => r.data);

export const deleteReviewApi = (id) =>
  client.delete(`${AUTH}/reviews/${id}`).then((r) => r.data);
