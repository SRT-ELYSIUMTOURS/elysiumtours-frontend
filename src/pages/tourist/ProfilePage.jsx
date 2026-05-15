import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectUser } from "../../store/slices/authSlice";
import { logoutThunk } from "../../store/slices/authSlice";
import { updateProfileApi, changePasswordApi } from "../../api/user.api";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [profileForm, setProfileForm] = useState({ firstName: "", lastName: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [profileStatus, setProfileStatus] = useState("idle");
  const [passwordStatus, setPasswordStatus] = useState("idle");
  const [profileError, setProfileError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileError(null);
    setProfileStatus("loading");
    try {
      await updateProfileApi(profileForm);
      setProfileStatus("succeeded");
    } catch (err) {
      setProfileError(err.response?.data?.message || "Failed to update profile.");
      setProfileStatus("failed");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }
    setPasswordError(null);
    setPasswordStatus("loading");
    try {
      await changePasswordApi({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordStatus("succeeded");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPasswordError(err.response?.data?.message || "Failed to change password.");
      setPasswordStatus("failed");
    }
  };

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  return (
    <main className="min-h-screen bg-[#f9f5ff] py-12 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="font-raleway font-bold text-[28px] text-[#2b0f43]">My Profile</h1>
          <button
            onClick={handleLogout}
            className="font-raleway text-[14px] font-semibold text-[#cc0000] hover:underline"
          >
            Log Out
          </button>
        </div>

        {/* Profile info */}
        <section className="bg-white rounded-[20px] p-6 shadow-sm border border-[#f0e8fb]">
          <h2 className="font-raleway font-bold text-[18px] text-[#2b0f43] mb-5">Personal Information</h2>
          <form onSubmit={handleProfileSave} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-raleway text-[13px] font-semibold text-[#4a1a73]">First Name</label>
                <input
                  type="text"
                  value={profileForm.firstName}
                  onChange={(e) => setProfileForm((f) => ({ ...f, firstName: e.target.value }))}
                  className="h-[48px] px-4 bg-[#fefefe] border border-[#e2d4f0] rounded-[10px] font-raleway text-[14px] text-[#565656] outline-none focus:border-[#7b2cbf]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-raleway text-[13px] font-semibold text-[#4a1a73]">Last Name</label>
                <input
                  type="text"
                  value={profileForm.lastName}
                  onChange={(e) => setProfileForm((f) => ({ ...f, lastName: e.target.value }))}
                  className="h-[48px] px-4 bg-[#fefefe] border border-[#e2d4f0] rounded-[10px] font-raleway text-[14px] text-[#565656] outline-none focus:border-[#7b2cbf]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-raleway text-[13px] font-semibold text-[#4a1a73]">Email</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm((f) => ({ ...f, email: e.target.value }))}
                className="h-[48px] px-4 bg-[#fefefe] border border-[#e2d4f0] rounded-[10px] font-raleway text-[14px] text-[#565656] outline-none focus:border-[#7b2cbf]"
              />
            </div>
            {profileError && <p className="font-raleway text-[13px] text-[#cc0000]">{profileError}</p>}
            {profileStatus === "succeeded" && <p className="font-raleway text-[13px] text-green-600">Profile updated successfully.</p>}
            <button
              type="submit"
              disabled={profileStatus === "loading"}
              className="self-start h-[48px] px-8 bg-[#7b2cbf] rounded-[40px] font-raleway font-semibold text-[15px] text-white hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {profileStatus === "loading" ? "Saving…" : "Save Changes"}
            </button>
          </form>
        </section>

        {/* Password change */}
        <section className="bg-white rounded-[20px] p-6 shadow-sm border border-[#f0e8fb]">
          <h2 className="font-raleway font-bold text-[18px] text-[#2b0f43] mb-5">Change Password</h2>
          <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
            {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
              <div key={field} className="flex flex-col gap-1">
                <label className="font-raleway text-[13px] font-semibold text-[#4a1a73]">
                  {field === "currentPassword" ? "Current Password" : field === "newPassword" ? "New Password" : "Confirm New Password"}
                </label>
                <input
                  type="password"
                  value={passwordForm[field]}
                  onChange={(e) => setPasswordForm((f) => ({ ...f, [field]: e.target.value }))}
                  placeholder="••••••••"
                  className="h-[48px] px-4 bg-[#fefefe] border border-[#e2d4f0] rounded-[10px] font-raleway text-[14px] text-[#565656] outline-none focus:border-[#7b2cbf]"
                />
              </div>
            ))}
            {passwordError && <p className="font-raleway text-[13px] text-[#cc0000]">{passwordError}</p>}
            {passwordStatus === "succeeded" && <p className="font-raleway text-[13px] text-green-600">Password changed successfully.</p>}
            <button
              type="submit"
              disabled={passwordStatus === "loading" || !passwordForm.currentPassword || !passwordForm.newPassword}
              className="self-start h-[48px] px-8 bg-[#7b2cbf] rounded-[40px] font-raleway font-semibold text-[15px] text-white hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {passwordStatus === "loading" ? "Updating…" : "Update Password"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
