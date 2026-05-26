import client from "./client";

const BASE = "/cms";

export const listBlogPostsApi = (params = {}) =>
  client.get(`${BASE}/blog`, { params }).then((r) => r.data);

export const getBlogPostApi = (slug) =>
  client.get(`${BASE}/blog/${slug}`).then((r) => r.data);

export const listFAQsApi = () =>
  client.get(`${BASE}/faqs`).then((r) => r.data);

export const listTestimonialsApi = () =>
  client.get(`${BASE}/testimonials`).then((r) => r.data);

export const listGalleryApi = (params = {}) =>
  client.get(`${BASE}/gallery`, { params }).then((r) => r.data);

export const getAboutContentApi = () =>
  client.get(`${BASE}/about`).then((r) => r.data);

export const getSiteSettingsApi = () =>
  client.get(`${BASE}/settings`).then((r) => r.data);
