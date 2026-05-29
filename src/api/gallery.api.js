import client from "./client";

const TOURS_BASE = "/tourist/tours";
const PARTNERS_BASE = "/tourist/partners";

export const listGalleryImagesApi = (params = {}) =>
  client.get(`${TOURS_BASE}/gallery-images`, { params }).then((r) => r.data);

export const getPartnerGallerySummaryApi = () =>
  client.get(`${PARTNERS_BASE}/gallery-summary`).then((r) => r.data);
