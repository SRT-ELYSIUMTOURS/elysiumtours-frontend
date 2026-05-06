import React from "react";
import { classNames } from "../../../utils/classNames";

/** Default intro copy for blog extended body (placeholder until CMS). */
export const BLOG_POST_BODY_PARAGRAPHS = [
  "Ghana — often called the Gateway to Africa — is a country that invites you to experience its soul, not just its sights. From the moment you step off the plane and feel the warm, humid breeze, you're greeted by a rhythm that runs through everything: the laughter of street vendors calling out prices in the markets of Makola, the distant beat of drums echoing through neighborhoods, and the scent of grilled tilapia mingling with the aroma of fresh cocoa and spice. Ghana is a land of contrast and connection — where modern cities like Accra pulse with energy, creativity, and innovation, while rural villages preserve the timeless traditions that have shaped the nation's identity for centuries.",

  "Every region tells a story. In the Central Region, the haunting walls of Cape Coast Castle whisper of history and resilience; in the Ashanti Kingdom, gold-adorned chiefs and ceremonial drums reflect centuries of pride and culture; while the Volta Region invites you to unwind with waterfalls, mountain trails, and tranquil lakeside escapes. Head north, and the landscapes open up to vast savannas, ancient mosques, and vibrant festivals that blend the sacred with the joyful.",

  "But beyond the landmarks, it's Ghana's people who make it unforgettable. You'll find kindness in the woman who helps you navigate a tro-tro stop, wisdom in the elder who tells stories under a mango tree, and laughter in the children waving as you pass through their village. Each encounter reveals a different side of the country — one that's warm, human, and deeply alive.",

  "Traveling through Ghana isn't just about ticking off destinations; it's about immersing yourself in a living culture that embraces you like family. Whether you're savoring jollof rice at a seaside shack, dancing at a village festival, or watching the sun set over Lake Volta, Ghana invites you to slow down, listen, and connect. This guide will help you do just that — to move beneath the surface, travel safely and meaningfully, and experience Ghana the way locals do: with open arms, an open heart, and endless curiosity.",
];

/**
 * Opening body copy — four paragraphs, ~10/12 grid width on desktop (Figma blog extended).
 */
const BlogPostBody = React.forwardRef(({ paragraphs = BLOG_POST_BODY_PARAGRAPHS, className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={classNames("w-full", className)}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-[1728px] px-[156px] flex-col gap-8">
        {paragraphs.map((text, i) => (
          <p
            key={i}
            className="text-left text-semi-md-Medium text-tertiary-normal-default"
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
});

BlogPostBody.displayName = "BlogPostBody";
export default BlogPostBody;
