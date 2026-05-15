import client from "./client";

const BASE = "/tourist/me";

export const getProfileApi = () =>
  client.get(`${BASE}/profile`).then((r) => r.data);

export const updateProfileApi = (data) =>
  client.put(`${BASE}/profile`, data).then((r) => r.data);

export const changePasswordApi = (data) =>
  client.put(`${BASE}/change-password`, data).then((r) => r.data);
