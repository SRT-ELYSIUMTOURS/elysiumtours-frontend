import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

// ── Icons ─────────────────────────────────────────────────────────────────────

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="#9b8aab" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M16.51 9.18c0-.56-.05-1.1-.14-1.62H9v3.07h4.18a3.56 3.56 0 01-1.55 2.34v1.94h2.5c1.47-1.35 2.38-3.34 2.38-5.73z" fill="#4285F4" />
    <path d="M9 17c2.1 0 3.87-.7 5.16-1.88l-2.5-1.95c-.7.47-1.6.75-2.66.75-2.04 0-3.77-1.38-4.39-3.23H2.04v2.01A8 8 0 009 17z" fill="#34A853" />
    <path d="M4.61 10.69A4.82 4.82 0 014.36 9c0-.58.1-1.15.25-1.69V5.3H2.04A8 8 0 001 9c0 1.25.3 2.44.8 3.48l2.81-2.04-.25-.75z" fill="#FBBC05" />
    <path d="M9 3.58c1.15 0 2.18.4 2.99 1.16l2.22-2.22A8 8 0 002.04 5.3l2.57 2A4.77 4.77 0 019 3.58z" fill="#EA4335" />
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#2d2d2d">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.29.07 2.18.73 2.93.73.78 0 2.26-.91 3.8-.77 1.32.12 2.47.62 3.31 1.69-3 1.8-2.5 5.76.24 6.96-.57 1.5-1.29 2.95-2.28 4.25zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

const EyeOpenIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="#9b8aab" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="#9b8aab" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 9l6 6 6-6" stroke="#9b8aab" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="5" stroke="#7b2cbf" strokeWidth="1.2" />
    <path d="M6 3.5V6l2 1.5" stroke="#7b2cbf" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const MailBoxIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M5.333 8h21.334C27.8 8 29 9.2 29 10.667v10.666C29 22.8 27.8 24 26.667 24H5.333C4.2 24 3 22.8 3 21.333V10.667C3 9.2 4.2 8 5.333 8z" stroke="#7b2cbf" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M29 10.667L16 17.333 3 10.667" stroke="#7b2cbf" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LockBoxIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="5" y="14" width="22" height="14" rx="2" stroke="#7b2cbf" strokeWidth="1.8" />
    <path d="M10 14v-4a6 6 0 0112 0v4" stroke="#7b2cbf" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="16" cy="21" r="2" fill="#7b2cbf" />
  </svg>
);

const CheckBoxIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="12" stroke="#7b2cbf" strokeWidth="1.8" />
    <path d="M10.5 16.5l4 4 7-7" stroke="#7b2cbf" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Shared subcomponents ──────────────────────────────────────────────────────

// Logo image only — wordmark text removed
function ModalLogo() {
  return (
    <img src="/ElysiumAssets/Logo.png" alt="Elysium" className="w-[142px] h-[93px] object-contain" />
  );
}

function FieldLabel({ children }) {
  return (
    <span className="h-[14px] self-stretch shrink-0 basis-auto font-raleway text-[16px] font-semibold leading-[14px] text-[#4a1a73] text-left whitespace-nowrap">
      {children}
    </span>
  );
}

function AuthInput({ label, type = "text", value, onChange, placeholder, error, hint, rightElement, autoFocus, ...rest }) {
  const [focused, setFocused] = useState(false);

  const borderColor = error ? "#ff383c" : focused ? "#7b2cbf" : "#e2d4f0";
  const shadow = error
    ? "0 0 4px 0 rgba(255,56,60,0.5)"
    : focused
    ? "0 0 4px 0 #7b2cbf"
    : "none";

  return (
    <div className="flex flex-col gap-[12px] items-start self-stretch shrink-0">
      {label && <FieldLabel>{label}</FieldLabel>}
      <div
        className="h-[56px] self-stretch shrink-0 bg-[#fefefe] rounded-[12px] relative overflow-hidden"
        style={{ border: `1px solid ${borderColor}`, boxShadow: shadow, transition: "border-color 0.15s, box-shadow 0.15s" }}
      >
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoFocus={autoFocus}
          className="absolute inset-0 font-raleway text-[13px] font-medium text-[#565656] placeholder:text-[#949494] placeholder:font-medium outline-none bg-transparent"
          style={{ paddingLeft: "15px", paddingRight: rightElement ? "48px" : "15px" }}
          {...rest}
        />
        {rightElement && (
          <div className="absolute top-1/2 -translate-y-1/2 right-[14px] flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {hint && (
        <span className="font-raleway text-[13px] font-medium leading-[22px] text-[#949494]">{hint}</span>
      )}
      {error && (
        <span className="font-raleway text-[13px] font-medium text-[#ff383c]">{error}</span>
      )}
    </div>
  );
}

function PasswordInput({ label, value, onChange, error, placeholder, autoFocus }) {
  const [show, setShow] = useState(false);
  return (
    <AuthInput
      label={label}
      type={show ? "text" : "password"}
      value={value}
      onChange={onChange}
      error={error}
      placeholder={placeholder || "••••••••"}
      autoFocus={autoFocus}
      rightElement={
        <button type="button" tabIndex={-1} onClick={() => setShow(v => !v)} className="cursor-pointer" aria-label={show ? "Hide" : "Show"}>
          {show ? <EyeOpenIcon /> : <EyeOffIcon />}
        </button>
      }
    />
  );
}

function TravelSelect({ value, onChange }) {
  const OPTIONS = ["Leisure", "Business", "Family", "Solo", "Adventure", "Group"];
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex flex-col gap-[12px] items-start self-stretch shrink-0" ref={ref}>
      <FieldLabel>I'm traveling As</FieldLabel>
      <div className="h-[56px] self-stretch shrink-0 bg-[#fefefe] rounded-[12px] border border-[#e2d4f0] relative overflow-visible">
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          className="absolute inset-0 flex items-center px-[14px] cursor-pointer"
        >
          <span className="flex-1 text-left font-raleway text-[13px] font-medium text-[#565656]">
            {value || <span className="text-[#949494]">Select type</span>}
          </span>
          <ChevronDownIcon />
        </button>
        {open && (
          <div
            className="absolute top-[60px] left-0 right-0 bg-white rounded-[12px] z-50 overflow-hidden"
            style={{ border: "1px solid #e2d4f0", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
          >
            {OPTIONS.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => { onChange(opt); setOpen(false); }}
                className="w-full px-[14px] py-[10px] text-left font-raleway text-[13px] font-medium text-[#565656] hover:bg-[#f6f2f9] transition-colors"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OAuthButtons() {
  return (
    <div className="flex flex-col gap-[10px] items-start self-stretch shrink-0">
      <button
        type="button"
        className="h-[64px] self-stretch shrink-0 bg-white rounded-[12px] flex items-center justify-center gap-[8px] cursor-pointer hover:bg-[#fafafa] transition-colors"
        style={{ border: "1px solid #d6beeb" }}
      >
        <GoogleIcon />
        <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#2d2d2d] whitespace-nowrap">
          Continue with Google
        </span>
      </button>
      <button
        type="button"
        className="h-[64px] self-stretch shrink-0 bg-white rounded-[12px] flex items-center justify-center gap-[8px] cursor-pointer hover:bg-[#fafafa] transition-colors"
        style={{ border: "1px solid #d6beeb" }}
      >
        <AppleIcon />
        <span className="font-raleway text-[16px] font-semibold leading-[22px] text-[#2d2d2d] whitespace-nowrap">
          Continue with Apple
        </span>
      </button>
    </div>
  );
}

function OrDivider() {
  return (
    <div className="flex gap-[12px] items-center self-stretch shrink-0">
      <div className="flex-1 h-px bg-[#ebdff5]" />
      <span className="h-[18px] shrink-0 font-raleway text-[13px] font-semibold leading-[18px] text-[#7b2cbf] whitespace-nowrap">OR</span>
      <div className="flex-1 h-px bg-[#ebdff5]" />
    </div>
  );
}

function PrimaryButton({ children, disabled, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-[64px] gap-[16px] justify-center items-center self-stretch shrink-0 rounded-[40px] transition-colors"
      style={{
        backgroundColor: disabled ? "#d6beeb" : "#7b2cbf",
        boxShadow: "0 4px 4px 0 rgba(0,0,0,0.05)",
        cursor: disabled ? "default" : "pointer",
      }}
    >
      <span className="h-[28px] shrink-0 font-raleway text-[20px] font-semibold leading-[28px] text-[#fefefe] whitespace-nowrap">
        {children}
      </span>
    </button>
  );
}

function OutlinedButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[64px] gap-[16px] justify-center items-center self-stretch shrink-0 rounded-[40px] cursor-pointer hover:bg-[#f9f5ff] transition-colors"
      style={{ border: "1px solid #d6beeb", boxShadow: "0 4px 4px 0 rgba(0,0,0,0.05)" }}
    >
      <span className="h-[28px] shrink-0 font-raleway text-[20px] font-semibold leading-[28px] text-[#7b2cbf] whitespace-nowrap">
        {children}
      </span>
    </button>
  );
}

function TermsText({ forSignup = false }) {
  return (
    <div className="self-stretch shrink-0 font-raleway text-[13px] font-medium leading-[22px] text-center">
      <span className="text-[#6f6f6f]">By continuing, you agree to Elysium's </span>
      <span className="text-[#7b2cbf] underline cursor-pointer">Terms of Service</span>
      {forSignup ? (
        <>
          <span className="text-[#6f6f6f]"> and acknowledge our </span>
          <span className="text-[#7b2cbf] underline cursor-pointer">Privacy Policy.</span>
        </>
      ) : (
        <>
          <span className="text-[#6f6f6f]"> and </span>
          <span className="text-[#7b2cbf] underline cursor-pointer">Privacy Policy</span>
          <span className="text-[#6f6f6f]">.</span>
        </>
      )}
    </div>
  );
}

function ViewFooter({ variant = "login", onLogin, onSignUp }) {
  if (variant === "signup") {
    return (
      <div className="h-[45px] self-stretch shrink-0 border-b border-[#eeeeee]">
        <div className="font-raleway text-[16px] font-semibold leading-[22px] text-center whitespace-nowrap mt-[13px]">
          <span className="text-[#6b7280]">Already have an account? </span>
          <button type="button" onClick={onLogin} className="text-[#622399] cursor-pointer hover:underline">Log in</button>
        </div>
      </div>
    );
  }
  return (
    <div className="h-[45px] self-stretch shrink-0 border-b border-[#eeeeee]">
      <div className="font-raleway text-[16px] font-semibold leading-[22px] text-center whitespace-nowrap mt-[13px]">
        <span className="text-[#6b7280]">New to Elysium? </span>
        <button type="button" onClick={onSignUp} className="text-[#622399] cursor-pointer hover:underline">Create an account</button>
      </div>
    </div>
  );
}

function PurpleIconBox({ icon }) {
  return (
    <div className="flex w-[80px] h-[75px] pt-[2px] pr-[6px] pb-[2px] pl-[6px] gap-[4px] justify-center items-center shrink-0 bg-[#ebdff5] rounded-[8px]">
      {icon}
    </div>
  );
}

function OtpBoxes({ value, onChange }) {
  const inputRefs = useRef([]);
  const digits = Array.from({ length: 6 }, (_, i) => value[i] || "");

  const handleChange = (i, e) => {
    const ch = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...digits]; next[i] = ch;
    onChange(next.join(""));
    if (ch && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      const next = [...digits]; next[i - 1] = "";
      onChange(next.join(""));
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(text);
    inputRefs.current[Math.min(text.length, 5)]?.focus();
    e.preventDefault();
  };

  return (
    <div className="flex gap-[16px] items-start self-stretch shrink-0">
      {digits.map((d, i) => (
        <div key={i} className="flex-1 h-[79px]">
          <input
            ref={el => (inputRefs.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={e => handleChange(i, e)}
            onKeyDown={e => handleKeyDown(i, e)}
            onPaste={handlePaste}
            autoFocus={i === 0}
            className="h-[79px] w-full bg-[#fefefe] rounded-[12px] text-center font-raleway font-bold text-[28px] text-[#2b0f43] outline-none transition-all"
            style={{
              border: `1px solid ${d ? "#7b2cbf" : "#d6beeb"}`,
              boxShadow: d ? "0 0 4px 0 rgba(123,44,191,0.3)" : "none",
            }}
            aria-label={`Digit ${i + 1}`}
          />
        </div>
      ))}
    </div>
  );
}

// ── View layout helpers ───────────────────────────────────────────────────────
// Every view has 3 regions:
//   • ViewHeader  — shrink-0, always visible (title + subtitle + OAuth if applicable)
//   • ViewFields  — flex-1 overflow-y-auto, the only scrollable part
//   • ViewCta     — shrink-0, always visible (button + footer)

function ViewHeader({ children }) {
  return <div className="shrink-0 flex flex-col gap-[24px]">{children}</div>;
}

function ViewFields({ children }) {
  return (
    <div className="flex-1 overflow-y-auto min-h-0 flex flex-col gap-[16px] py-[16px]">
      {children}
    </div>
  );
}

function ViewCta({ children }) {
  return (
    <div className="shrink-0 flex flex-col gap-[16px] items-center">
      {children}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// VIEWS
// ══════════════════════════════════════════════════════════════════════════════

function LoginView({ onSuccess, onForgot, onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const ready = email.trim().length > 0 && password.trim().length > 0;

  const handleContinue = async () => {
    if (!ready) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const displayName = email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    login({ name: displayName, email: email.trim() });
    onSuccess?.();
    setLoading(false);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <ViewHeader>
        <div className="flex flex-col gap-[16px] items-center self-stretch">
          <span className="self-stretch font-raleway text-[25px] font-bold leading-[27.5px] text-[#7b2cbf] text-center whitespace-nowrap">
            Log In or Sign Up
          </span>
          <span className="font-raleway text-[20px] font-medium leading-[28px] text-[#6b7280] text-left whitespace-nowrap">
            Access your bookings, saved tours, and travel profile.
          </span>
        </div>
      </ViewHeader>

      <ViewFields>
        <OAuthButtons />
        <OrDivider />
        <AuthInput
          label="Email address"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoFocus
        />
        <PasswordInput
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <button
          type="button"
          onClick={onForgot}
          className="self-end font-raleway text-[13px] font-semibold text-[#7b2cbf] cursor-pointer hover:underline"
        >
          Forgot password?
        </button>
      </ViewFields>

      <ViewCta>
        <div className="flex flex-col gap-[12px] items-start self-stretch">
          <PrimaryButton disabled={!ready || loading} onClick={handleContinue}>
            {loading ? "Please wait…" : "Continue"}
          </PrimaryButton>
          <TermsText />
        </div>
        <ViewFooter variant="login" onSignUp={onSignUp} />
      </ViewCta>
    </div>
  );
}

function SignupView({ onSuccess, onLogin }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [travelAs, setTravelAs] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const validate = () => {
    const e = {};
    if (!firstName.trim()) e.firstName = "First name is required.";
    if (!lastName.trim()) e.lastName = "Last name is required.";
    if (!email.includes("@")) e.email = "Please enter a valid email.";
    if (password.length < 8) e.password = "Password must be at least 8 characters.";
    if (password !== retypePassword) e.retypePassword = "Passwords do not match.";
    return e;
  };

  const handleCreate = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    login({ name: `${firstName.trim()} ${lastName.trim()}`, email: email.trim() });
    onSuccess?.();
    setLoading(false);
  };

  const ready = firstName.trim() && lastName.trim() && email.trim() && password.trim() && retypePassword.trim();

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <ViewHeader>
        <div className="flex flex-col gap-[16px] items-center self-stretch">
          <span className="self-stretch font-raleway text-[25px] font-bold leading-[27.5px] text-[#7b2cbf] text-center whitespace-nowrap">
            Create Your Account
          </span>
          <span className="font-raleway text-[20px] font-medium leading-[28px] text-[#6b7280] whitespace-nowrap">
            Join thousands of travelers exploring West Africa.
          </span>
        </div>
      </ViewHeader>

      <ViewFields>
        <OAuthButtons />
        <OrDivider />
        {/* First Name + Last Name row */}
        <div className="flex gap-[16px] items-start self-stretch shrink-0">
          <div className="flex flex-col gap-[12px] items-start flex-1 shrink-0">
            <FieldLabel>First Name</FieldLabel>
            <div
              className="h-[56px] self-stretch bg-[#fefefe] rounded-[12px] relative overflow-hidden"
              style={{ border: `1px solid ${errors.firstName ? "#ff383c" : "#e2d4f0"}` }}
            >
              <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="First name"
                className="absolute inset-0 px-[15px] font-raleway text-[13px] font-medium text-[#565656] placeholder:text-[#949494] outline-none bg-transparent"
                autoFocus
              />
            </div>
          </div>
          <div className="flex flex-col gap-[12px] items-start flex-1 shrink-0">
            <FieldLabel>Last Name</FieldLabel>
            <div
              className="h-[56px] self-stretch bg-[#fefefe] rounded-[12px] relative overflow-hidden"
              style={{ border: `1px solid ${errors.lastName ? "#ff383c" : "#e2d4f0"}` }}
            >
              <input
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Last name"
                className="absolute inset-0 px-[15px] font-raleway text-[13px] font-medium text-[#565656] placeholder:text-[#949494] outline-none bg-transparent"
              />
            </div>
          </div>
        </div>
        <AuthInput
          label="Email address"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          error={errors.email}
        />
        <TravelSelect value={travelAs} onChange={setTravelAs} />
        <PasswordInput label="Password" value={password} onChange={e => setPassword(e.target.value)} error={errors.password} />
        <PasswordInput label="Retype Password" value={retypePassword} onChange={e => setRetypePassword(e.target.value)} error={errors.retypePassword} />
      </ViewFields>

      <ViewCta>
        <div className="flex flex-col gap-[12px] items-start self-stretch">
          <PrimaryButton disabled={!ready || loading} onClick={handleCreate}>
            {loading ? "Creating account…" : "Create Account"}
          </PrimaryButton>
          <TermsText forSignup />
        </div>
        <ViewFooter variant="signup" onLogin={onLogin} />
      </ViewCta>
    </div>
  );
}

function ForgotView({ onBack, onOtp, onSignUp }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!email.includes("@")) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    onOtp?.(email.trim());
    setLoading(false);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <ViewHeader>
        <div className="flex flex-col gap-[16px] items-center self-stretch">
          <span className="self-stretch font-raleway text-[25px] font-bold leading-[27.5px] text-[#7b2cbf] text-center whitespace-nowrap">
            Forgot your password?
          </span>
          <span className="font-raleway text-[20px] font-medium leading-[28px] text-[#6b7280] text-center">
            No worries. Enter your email and we'll send you a 6-digit verification code.
          </span>
        </div>
      </ViewHeader>

      <ViewFields>
        <AuthInput
          label="Email address"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          hint="We'll send a 6-digit code to this address."
          autoFocus
        />
      </ViewFields>

      <ViewCta>
        <div className="flex flex-col gap-[12px] items-start self-stretch">
          <PrimaryButton disabled={!email.includes("@") || loading} onClick={handleSend}>
            {loading ? "Sending…" : "Send Verification Code"}
          </PrimaryButton>
          <OutlinedButton onClick={onBack}>Back to Log In</OutlinedButton>
        </div>
        <ViewFooter variant="login" onSignUp={onSignUp} />
      </ViewCta>
    </div>
  );
}

function OtpView({ email, onVerify, onChangeEmail, onSignUp }) {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const handleVerify = async () => {
    if (otp.length < 6) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    onVerify?.();
    setLoading(false);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <ViewHeader>
        <div className="flex flex-col gap-[24px] items-center self-stretch">
          <PurpleIconBox icon={<MailBoxIcon />} />
          <div className="flex flex-col gap-[16px] items-center self-stretch">
            <span className="self-stretch font-raleway text-[25px] font-bold leading-[27.5px] text-[#7b2cbf] text-center whitespace-nowrap">
              Check your inbox
            </span>
            <div className="self-stretch font-raleway text-[20px] font-medium leading-[28px] text-center">
              <span className="text-[#6b7280]">We sent a 6-digit code to </span>
              <span className="text-[#7b2cbf]">{email}</span>
            </div>
          </div>
        </div>
      </ViewHeader>

      <ViewFields>
        <OtpBoxes value={otp} onChange={setOtp} />
      </ViewFields>

      <ViewCta>
        <div className="flex flex-col gap-[12px] justify-center items-center self-stretch">
          <PrimaryButton disabled={otp.length < 6 || loading} onClick={handleVerify}>
            {loading ? "Verifying…" : "Verify Code"}
          </PrimaryButton>
          <div className="flex gap-[12px] items-center">
            <div className="font-raleway text-[16px] font-semibold leading-[22px] text-center whitespace-nowrap">
              <span className="text-[#6b7280]">Didn't receive it? </span>
              <button
                type="button"
                onClick={() => { setCountdown(60); setOtp(""); }}
                className="text-[#7b2cbf] cursor-pointer hover:underline"
                disabled={countdown > 0}
                style={{ opacity: countdown > 0 ? 0.5 : 1 }}
              >
                Resend code
              </button>
            </div>
            <span className="font-raleway text-[16px] font-semibold text-[#6b7280] whitespace-nowrap">in</span>
            <div className="flex pt-[2px] pr-[6px] pb-[2px] pl-[6px] gap-[4px] justify-center items-center bg-[#ebdff5] rounded-[16px]">
              <ClockIcon />
              <span className="font-raleway text-[13px] font-semibold text-[#7b2cbf] whitespace-nowrap">
                {formatTime(countdown)}
              </span>
            </div>
          </div>
          <OutlinedButton onClick={onChangeEmail}>Change Email</OutlinedButton>
        </div>
        <ViewFooter variant="login" onSignUp={onSignUp} />
      </ViewCta>
    </div>
  );
}

function NewPasswordView({ onSave, onBack, onSignUp }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    const e = {};
    if (password.length < 8) e.password = "Password must be at least 8 characters.";
    if (password !== confirm) e.confirm = "Passwords do not match.";
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    onSave?.();
    setLoading(false);
  };

  const ready = password.trim() && confirm.trim();

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <ViewHeader>
        <div className="flex flex-col gap-[24px] items-center self-stretch">
          <PurpleIconBox icon={<LockBoxIcon />} />
          <div className="flex flex-col gap-[16px] items-center self-stretch">
            <span className="self-stretch font-raleway text-[25px] font-bold leading-[27.5px] text-[#7b2cbf] text-center whitespace-nowrap">
              Create New Password
            </span>
            <span className="font-raleway text-[20px] font-medium leading-[28px] text-[#6b7280] text-center">
              Your new password must be different from previous passwords.
            </span>
          </div>
        </div>
      </ViewHeader>

      <ViewFields>
        <PasswordInput label="New Password" value={password} onChange={e => setPassword(e.target.value)} error={errors.password} autoFocus />
        <PasswordInput label="Confirm New Password" value={confirm} onChange={e => setConfirm(e.target.value)} error={errors.confirm} />
      </ViewFields>

      <ViewCta>
        <div className="flex flex-col gap-[12px] items-center self-stretch">
          <PrimaryButton disabled={!ready || loading} onClick={handleSave}>
            {loading ? "Saving…" : "Save New Password"}
          </PrimaryButton>
          <OutlinedButton onClick={onBack}>Back</OutlinedButton>
        </div>
        <ViewFooter variant="login" onSignUp={onSignUp} />
      </ViewCta>
    </div>
  );
}

function ResetSuccessView({ onLogin, onSignUp }) {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <ViewHeader>
        <div className="flex flex-col gap-[24px] items-center self-stretch">
          <PurpleIconBox icon={<CheckBoxIcon />} />
          <div className="flex flex-col gap-[16px] items-center self-stretch">
            <span className="self-stretch font-raleway text-[25px] font-bold leading-[27.5px] text-[#7b2cbf] text-center whitespace-nowrap">
              Password Reset!
            </span>
            <span className="font-raleway text-[20px] font-medium leading-[28px] text-[#6b7280] text-center">
              Your password has been updated successfully.
              <br />You can now log in with your new password.
            </span>
          </div>
        </div>
      </ViewHeader>

      {/* Empty flex spacer so CTA sits at bottom */}
      <div className="flex-1 min-h-[16px]" />

      <ViewCta>
        <div className="flex flex-col gap-[12px] items-center self-stretch">
          <PrimaryButton onClick={onLogin}>Back To Log In</PrimaryButton>
        </div>
        <ViewFooter variant="login" onSignUp={onSignUp} />
      </ViewCta>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// AuthModal — main export
// ══════════════════════════════════════════════════════════════════════════════

export default function AuthModal({ isOpen, onClose, initialView = "login", onAuthSuccess }) {
  const [view, setView] = useState(initialView);
  const [otpEmail, setOtpEmail] = useState("");

  useEffect(() => {
    if (isOpen) setView(initialView);
  }, [isOpen, initialView]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  const handleAuthSuccess = () => {
    onClose?.();
    onAuthSuccess?.();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={handleOverlayClick}
    >
      {/* Card — flex column, fixed max-height, NO overflow on the card itself */}
      <div
        className="relative bg-white rounded-[30px] w-full max-w-[648px] mx-4 flex flex-col"
        style={{ maxHeight: "90vh", boxShadow: "0 10px 4px 0 rgba(0,0,0,0.15)" }}
      >
        {/* Close button — always visible, outside scroll */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-[24px] right-[23px] cursor-pointer z-10"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        {/* Logo — fixed, never scrolls */}
        <div className="shrink-0 flex justify-center pt-[24px] pb-2">
          <ModalLogo />
        </div>

        {/* purble element */}
        <div
          className="w-[80%] mb-3 mx-auto h-[2px] border border-secondary-normal-default"
          style={{
            opacity: 0.5,
            background: "var(--violet-secondary-30-normal, #7B2CBF)",
            filter: "blur(10px)",
          }}
        />

        {/* View area — fills remaining height, inner scroll is per-view */}
        <div className="flex flex-col flex-1 min-h-0 px-[52px] pb-[40px]">
          {view === "login" && (
            <LoginView
              onSuccess={handleAuthSuccess}
              onForgot={() => setView("forgot")}
              onSignUp={() => setView("signup")}
            />
          )}
          {view === "signup" && (
            <SignupView
              onSuccess={handleAuthSuccess}
              onLogin={() => setView("login")}
            />
          )}
          {view === "forgot" && (
            <ForgotView
              onBack={() => setView("login")}
              onOtp={(email) => { setOtpEmail(email); setView("otp"); }}
              onSignUp={() => setView("signup")}
            />
          )}
          {view === "otp" && (
            <OtpView
              email={otpEmail}
              onVerify={() => setView("new-password")}
              onChangeEmail={() => setView("forgot")}
              onSignUp={() => setView("signup")}
            />
          )}
          {view === "new-password" && (
            <NewPasswordView
              onSave={() => setView("reset-success")}
              onBack={() => setView("otp")}
              onSignUp={() => setView("signup")}
            />
          )}
          {view === "reset-success" && (
            <ResetSuccessView
              onLogin={() => setView("login")}
              onSignUp={() => setView("signup")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
