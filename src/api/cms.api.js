import client from "./client";

const BASE = "/cms";
const BLOG_BASE = "/tourist/blog";

export const listBlogPostsApi = (params = {}) =>
  client.get(BLOG_BASE, { params }).then((r) => r.data);

export const getBlogPostApi = (slug) =>
  client.get(`${BLOG_BASE}/slug/${slug}`).then((r) => r.data);

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
