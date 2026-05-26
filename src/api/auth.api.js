import client from "./client";

export const loginApi = ({ email, password }) =>
  client.post("/auth/login", { email, password }).then((r) => r.data);

export const registerApi = ({ firstName, lastName, email, password, travelAs }) =>
  client.post("/auth/register", { firstName, lastName, email, password, travelAs }).then((r) => r.data);

export const verifyOtpApi = ({ email, otp }) =>
  client.post("/auth/verify-otp", { email, otp }).then((r) => r.data);

export const resendOtpApi = ({ email }) =>
  client.post("/auth/resend-otp", { email }).then((r) => r.data);

export const forgotPasswordApi = ({ email }) =>
  client.post("/auth/forgot-password", { email }).then((r) => r.data);

export const resetPasswordApi = ({ token, password }) =>
  client.post("/auth/reset-password", { token, password }).then((r) => r.data);

export const logoutApi = () =>
  client.post("/auth/logout").then((r) => r.data).catch(() => null);
