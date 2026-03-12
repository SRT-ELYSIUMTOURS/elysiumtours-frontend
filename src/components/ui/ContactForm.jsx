import React, { useState } from "react";
import { classNames } from "../../utils/classNames";

// From Figma: Frame 173 (576×756) in Frame 8 of Contact page Frame 184
// Structure: VERTICAL gap:32
//   Line 6: stroke:#7b2cbf (top accent line)
//   Frame 171 VERTICAL gap:48:
//     Frame 172 VERTICAL gap:16 — form fields:
//       Frame 169: "Full Name*" label + 2-col inputs (First Name, Last Name) HORIZONTAL gap:24
//       Frame 166: "Email*" label + full-width input
//       Frame 167: "Phone Number" label + prefix+input (GH +233 dropdown + number field)
//       Frame 171: "Subject*" label + full-width input
//       Frame 170: "Message*" label + textarea (576×150)
//     Button: "Send Message" fill:#7b2cbf r:40 169×56
// Input field style: border stroke + rounded, placeholder [13px/500] #949494
// Label style: [16px/500] #2d2d2d
// Phone prefix: "GH +233" [13px/700] #2d2d2d in bordered box

const InputField = ({ label, required, placeholder, type = "text", value, onChange, className = "" }) => (
  <div className={classNames("flex flex-col gap-[6px]", className)}>
    {label && (
      <label style={{ fontSize:"16px", fontWeight:500, color:"#2d2d2d", fontFamily:"Raleway,sans-serif" }}>
        {label}{required && <span style={{ color:"#7b2cbf" }}>*</span>}
      </label>
    )}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-sm border border-primary-dark-default px-4 outline-none transition-all duration-300 ease-in focus:border-secondary-normal-default focus:ring-1 focus:ring-secondary-light-default"
      style={{ height:"48px", fontSize:"13px", fontWeight:500, color:"#2d2d2d", fontFamily:"Raleway,sans-serif",
        "::placeholder": { color:"#949494" } }}
    />
  </div>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="#fefefe" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ContactForm = React.forwardRef(({
  onSubmit,
  className = "",
  ...props
}, ref) => {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    phoneCode: "GH +233", phone: "",
    subject: "", message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div ref={ref} className={classNames("flex flex-col items-center justify-center gap-6 py-16", className)} {...props}>
        <div className="w-16 h-16 rounded-full bg-secondary-light-default flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#7b2cbf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <p style={{ fontSize:"20px", fontWeight:600, color:"#2d2d2d", fontFamily:"Raleway,sans-serif" }}>Message sent successfully!</p>
        <button onClick={() => setSubmitted(false)} style={{ fontSize:"16px", fontWeight:500, color:"#7b2cbf", fontFamily:"Raleway,sans-serif", textDecoration:"underline" }}>Send another</button>
      </div>
    );
  }

  return (
    // Frame 173: VERTICAL gap:32
    <div ref={ref} className={classNames("flex flex-col gap-[32px]", className)} {...props}>
      {/* Top accent line — Line 6 stroke:#7b2cbf */}
      <div className="w-full h-[2px] rounded-full bg-secondary-normal-default" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-md">

        {/* Full Name — 2-col HORIZONTAL gap:24 */}
        <div className="flex flex-col gap-[6px]">
          <label style={{ fontSize:"16px", fontWeight:500, color:"#2d2d2d", fontFamily:"Raleway,sans-serif" }}>
            Full Name<span style={{ color:"#7b2cbf" }}>*</span>
          </label>
          <div className="flex gap-[24px]">
            <input value={form.firstName} onChange={set("firstName")} placeholder="First Name" required
              className="flex-1 rounded-sm border border-primary-dark-default px-4 outline-none transition-all duration-300 ease-in focus:border-secondary-normal-default"
              style={{ height:"48px", fontSize:"13px", fontWeight:500, color:"#2d2d2d", fontFamily:"Raleway,sans-serif" }} />
            <input value={form.lastName} onChange={set("lastName")} placeholder="Last Name" required
              className="flex-1 rounded-sm border border-primary-dark-default px-4 outline-none transition-all duration-300 ease-in focus:border-secondary-normal-default"
              style={{ height:"48px", fontSize:"13px", fontWeight:500, color:"#2d2d2d", fontFamily:"Raleway,sans-serif" }} />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-[6px]">
          <label style={{ fontSize:"16px", fontWeight:500, color:"#2d2d2d", fontFamily:"Raleway,sans-serif" }}>
            Email<span style={{ color:"#7b2cbf" }}>*</span>
          </label>
          <input value={form.email} onChange={set("email")} placeholder="First Name" type="email" required
            className="w-full rounded-sm border border-primary-dark-default px-4 outline-none transition-all duration-300 ease-in focus:border-secondary-normal-default"
            style={{ height:"48px", fontSize:"13px", fontWeight:500, color:"#2d2d2d", fontFamily:"Raleway,sans-serif" }} />
        </div>

        {/* Phone Number — prefix (GH +233) + number field, HORIZONTAL gap:-12 */}
        <div className="flex flex-col gap-[6px]">
          <label style={{ fontSize:"16px", fontWeight:500, color:"#2d2d2d", fontFamily:"Raleway,sans-serif" }}>
            Phone Number
          </label>
          <div className="flex rounded-sm border border-primary-dark-default overflow-hidden focus-within:border-secondary-normal-default transition-all duration-300 ease-in">
            {/* Country code prefix */}
            <select value={form.phoneCode} onChange={set("phoneCode")}
              className="border-r border-primary-dark-default bg-transparent px-3 outline-none shrink-0"
              style={{ fontSize:"13px", fontWeight:700, color:"#2d2d2d", fontFamily:"Raleway,sans-serif", height:"48px" }}>
              <option value="GH +233">GH +233</option>
              <option value="US +1">US +1</option>
              <option value="UK +44">UK +44</option>
              <option value="NG +234">NG +234</option>
            </select>
            {/* Phone number input */}
            <input value={form.phone} onChange={set("phone")} placeholder="0234  2456 34556" type="tel"
              className="flex-1 px-4 outline-none bg-transparent"
              style={{ height:"48px", fontSize:"13px", fontWeight:400, color:"#949494", fontFamily:"Raleway,sans-serif" }} />
          </div>
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-[6px]">
          <label style={{ fontSize:"16px", fontWeight:500, color:"#2d2d2d", fontFamily:"Raleway,sans-serif" }}>
            Subject<span style={{ color:"#7b2cbf" }}>*</span>
          </label>
          <input value={form.subject} onChange={set("subject")} placeholder="Enter your message title" required
            className="w-full rounded-sm border border-primary-dark-default px-4 outline-none transition-all duration-300 ease-in focus:border-secondary-normal-default"
            style={{ height:"48px", fontSize:"13px", fontWeight:500, color:"#2d2d2d", fontFamily:"Raleway,sans-serif" }} />
        </div>

        {/* Message — textarea 576×150 */}
        <div className="flex flex-col gap-[6px]">
          <label style={{ fontSize:"16px", fontWeight:500, color:"#2d2d2d", fontFamily:"Raleway,sans-serif" }}>
            Message<span style={{ color:"#7b2cbf" }}>*</span>
          </label>
          <textarea value={form.message} onChange={set("message")} placeholder="Enter your message" required
            className="w-full rounded-sm border border-primary-dark-default px-4 py-3 outline-none resize-none transition-all duration-300 ease-in focus:border-secondary-normal-default"
            style={{ height:"150px", fontSize:"13px", fontWeight:500, color:"#2d2d2d", fontFamily:"Raleway,sans-serif" }} />
        </div>

        {/* Send Message button — fill:#7b2cbf r:40 169×56, right-aligned */}
        <div className="flex justify-end">
          <button type="submit"
            className="flex items-center gap-3 rounded-md bg-secondary-normal-default hover:bg-secondary-normal-hover active:bg-secondary-normal-active transition-all duration-300 ease-in"
            style={{ height:"56px", padding:"0 24px", fontSize:"16px", fontWeight:600, color:"#fefefe", fontFamily:"Raleway,sans-serif" }}>
            Send Message
            <ArrowIcon />
          </button>
        </div>
      </form>
    </div>
  );
});

ContactForm.displayName = "ContactForm";
export default ContactForm;
