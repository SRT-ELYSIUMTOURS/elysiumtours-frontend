import client from "./client";

const BASE = "/tourist/countries";

export const listCountriesApi = (params = {}) =>
  client.get(`${BASE}`, { params }).then((r) => r.data);

export const getCountryApi = (id) =>
  client.get(`${BASE}/${id}`).then((r) => r.data);

export const getCountryBySlugApi = (slug) =>
  client.get(`${BASE}/slug/${slug}`).then((r) => r.data);
