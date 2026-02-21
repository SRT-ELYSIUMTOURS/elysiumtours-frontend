import React, { useState } from "react";
import { classNames } from "../../utils/classNames";

// From Figma: Frame 150 (1416×850) in Single Blog page
// Structure:
//   "Add a review" [25px/700] #2d2d2d
//   "3 comments"   [20px/700] #2d2d2d
//   Input bar: Frame 1375×80 stroke:#f2eaf9 r:40
//     "Share your thoughts" placeholder [16px/500] #bebebe
//     Submit button: fill:#7b2cbf r:40 140×56 "Submit" [16px/600] #fefefe
//   Frame 156 VERTICAL gap:- (each item has stroke:#f2eaf9 border bottom)
//     Frame 152/153/154/155 (1402×138) — each comment:
//       HORIZONTAL gap:24
//         Frame 151: 115×115 avatar circle
//         Frame 138 VERTICAL gap:10 pad:10/10
//           Name [20px/700] #2d2d2d
//           Body [20px/500] #2d2d2d (or shorter variants)
//           Timestamp + Like row: [13px/500] #949494 + "Like" [13px/600] #2d2d2d

const CommentItem = ({ avatar, name, body, timestamp = "1 hour ago", onLike }) => (
  <div className="flex items-start gap-[24px] py-5 border-b border-secondary-light-default">
    {/* Avatar circle — 115×115 in Figma, scaled down proportionally */}
    <div className="w-[64px] h-[64px] rounded-full bg-primary-dark-default shrink-0 overflow-hidden flex items-center justify-center" style={{ minWidth:"64px" }}>
      {avatar
        ? <img src={avatar} alt={name} className="w-full h-full object-cover" />
        : <div className="w-full h-full bg-primary-dark-default" />
      }
    </div>
    {/* Content — VERTICAL gap:10 */}
    <div className="flex flex-col gap-[10px] flex-1">
      {/* Name — [20px/700] #2d2d2d */}
      <p style={{ fontSize:"20px", fontWeight:700, color:"#2d2d2d", lineHeight:"28px", fontFamily:"Raleway,sans-serif" }}>
        {name}
      </p>
      {/* Body — [20px/500] #2d2d2d */}
      <p style={{ fontSize:"16px", fontWeight:400, color:"#2d2d2d", lineHeight:"24px", fontFamily:"Raleway,sans-serif" }}>
        {body}
      </p>
      {/* Timestamp + Like row */}
      <div className="flex items-center gap-4">
        <span style={{ fontSize:"13px", fontWeight:500, color:"#949494", fontFamily:"Raleway,sans-serif" }}>{timestamp}</span>
        <button
          type="button"
          onClick={onLike}
          className="transition-all duration-300 ease-in hover:text-secondary-normal-default"
          style={{ fontSize:"13px", fontWeight:600, color:"#2d2d2d", fontFamily:"Raleway,sans-serif" }}
        >
          Like
        </button>
      </div>
    </div>
  </div>
);

const CommentSection = React.forwardRef(({
  comments = [],
  onSubmit,
  className = "",
  ...props
}, ref) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSubmit?.(inputValue.trim());
    setInputValue("");
  };

  return (
    <div ref={ref} className={classNames("flex flex-col gap-4", className)} {...props}>
      {/* "Add a review" heading — [25px/700] #2d2d2d */}
      <h3 style={{ fontSize:"25px", fontWeight:700, color:"#2d2d2d", lineHeight:"34px", fontFamily:"Raleway,sans-serif" }}>
        Add a review
      </h3>

      {/* Comment count — [20px/700] #2d2d2d */}
      <p style={{ fontSize:"20px", fontWeight:700, color:"#2d2d2d", lineHeight:"28px", fontFamily:"Raleway,sans-serif" }}>
        {comments.length} comment{comments.length !== 1 ? "s" : ""}
      </p>

      {/* Input bar — Frame 1375×80 stroke:#f2eaf9 r:40 */}
      <form onSubmit={handleSubmit}
        className="flex items-center justify-between pl-6 pr-1 rounded-[40px] border border-secondary-light-default"
        style={{ height:"80px", backgroundColor:"#fefefe" }}>
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Share your thoughts"
          className="flex-1 bg-transparent outline-none"
          style={{ fontSize:"16px", fontWeight:500, color:"#2d2d2d", fontFamily:"Raleway,sans-serif" }}
        />
        {/* Submit button — fill:#7b2cbf r:40 140×56 [16px/600] #fefefe */}
        <button
          type="submit"
          className="rounded-[40px] bg-secondary-normal-default hover:bg-secondary-normal-hover active:bg-secondary-normal-active transition-all duration-300 ease-in"
          style={{ width:"140px", height:"56px", fontSize:"16px", fontWeight:600, color:"#fefefe", fontFamily:"Raleway,sans-serif" }}
        >
          Submit
        </button>
      </form>

      {/* Comment list — Frame 156 VERTICAL gap:- */}
      <div className="flex flex-col">
        {comments.map((comment, i) => (
          <CommentItem
            key={i}
            avatar={comment.avatar}
            name={comment.name}
            body={comment.body}
            timestamp={comment.timestamp}
            onLike={() => {}}
          />
        ))}
      </div>
    </div>
  );
});

CommentSection.displayName = "CommentSection";
export { CommentItem, CommentSection };
export default CommentSection;
