import client from "./client";

export const submitContactApi = (data) =>
  client.post("/contact", data).then((r) => r.data);

export const subscribeNewsletterApi = (email) =>
  client.post("/contact/newsletter", { email }).then((r) => r.data);
