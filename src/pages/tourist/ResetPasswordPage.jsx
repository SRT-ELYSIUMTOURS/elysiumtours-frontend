import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { resetPasswordThunk } from "../../store/slices/authSlice";

function LockIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="5" y="14" width="22" height="14" rx="2" stroke="#7b2cbf" strokeWidth="1.8" />
      <path d="M10 14v-4a6 6 0 0112 0v4" stroke="#7b2cbf" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16" cy="21" r="2" fill="#7b2cbf" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" stroke="#7b2cbf" strokeWidth="1.8" />
      <path d="M10.5 16.5l4 4 7-7" stroke="#7b2cbf" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="min-h-screen bg-[#f9f5ff] flex items-center justify-center px-4">
        <div className="bg-white rounded-[24px] p-10 max-w-md w-full text-center shadow-sm">
          <p className="font-raleway text-[18px] font-semibold text-[#cc0000]">
            Invalid or missing reset token.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 font-raleway text-[16px] font-semibold text-[#7b2cbf] hover:underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#f9f5ff] flex items-center justify-center px-4">
        <div className="bg-white rounded-[24px] p-10 max-w-md w-full text-center shadow-sm flex flex-col items-center gap-6">
          <div className="flex w-[80px] h-[75px] justify-center items-center bg-[#ebdff5] rounded-[8px]">
            <CheckIcon />
          </div>
          <h1 className="font-raleway text-[25px] font-bold text-[#7b2cbf]">Password Reset!</h1>
          <p className="font-raleway text-[16px] font-medium text-[#6b7280]">
            Your password has been updated. You can now log in with your new password.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full h-[56px] bg-[#7b2cbf] rounded-[40px] font-raleway text-[18px] font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleSave = async (e) => {
    e.preventDefault();
    const e2 = {};
    if (password.length < 8) e2.password = "Password must be at least 8 characters.";
    if (password !== confirm) e2.confirm = "Passwords do not match.";
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setErrors({});
    setServerError(null);
    setLoading(true);
    try {
      await dispatch(resetPasswordThunk({ token, password })).unwrap();
      setSuccess(true);
    } catch (err) {
      setServerError(typeof err === "string" ? err : "Password reset failed. The link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f5ff] flex items-center justify-center px-4">
      <div className="bg-white rounded-[24px] p-10 max-w-md w-full shadow-sm flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex w-[80px] h-[75px] justify-center items-center bg-[#ebdff5] rounded-[8px]">
            <LockIcon />
          </div>
          <h1 className="font-raleway text-[25px] font-bold text-[#7b2cbf] text-center">Create New Password</h1>
          <p className="font-raleway text-[16px] font-medium text-[#6b7280] text-center">
            Your new password must be different from previous passwords.
          </p>
        </div>

        {serverError && (
          <div className="bg-[#fff0f0] border border-[#ffcccc] rounded-[10px] px-4 py-3">
            <span className="font-raleway text-[13px] font-medium text-[#cc0000]">{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-raleway text-[14px] font-semibold text-[#4a1a73]">New Password</label>
            <div className="relative h-[56px] bg-[#fefefe] rounded-[12px] border border-[#e2d4f0] overflow-hidden">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="absolute inset-0 px-4 font-raleway text-[13px] font-medium text-[#565656] outline-none bg-transparent pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9b8aab] text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <span className="font-raleway text-[12px] text-[#ff383c]">{errors.password}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-raleway text-[14px] font-semibold text-[#4a1a73]">Confirm New Password</label>
            <div className="h-[56px] bg-[#fefefe] rounded-[12px] border border-[#e2d4f0] overflow-hidden">
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                className="w-full h-full px-4 font-raleway text-[13px] font-medium text-[#565656] outline-none bg-transparent"
              />
            </div>
            {errors.confirm && <span className="font-raleway text-[12px] text-[#ff383c]">{errors.confirm}</span>}
          </div>

          <button
            type="submit"
            disabled={!password || !confirm || loading}
            className="h-[56px] rounded-[40px] font-raleway text-[18px] font-semibold text-white transition-opacity"
            style={{ backgroundColor: !password || !confirm || loading ? "#d6beeb" : "#7b2cbf" }}
          >
            {loading ? "Saving…" : "Save New Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
