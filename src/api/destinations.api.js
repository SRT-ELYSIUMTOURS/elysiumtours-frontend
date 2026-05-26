import client from "./client";

const BASE = "/tourist/destinations";

export const listDestinationsApi = (params = {}) =>
  client.get(`${BASE}`, { params }).then((r) => r.data);

export const getDestinationApi = (id) =>
  client.get(`${BASE}/${id}`).then((r) => r.data);

export const getDestinationBySlugApi = (slug) =>
  client.get(`${BASE}/slug/${slug}`).then((r) => r.data);

export const listDestinationsByRegionApi = (region) =>
  client.get(`${BASE}/region/${region}`).then((r) => r.data);
