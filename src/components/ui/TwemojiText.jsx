import React, { useLayoutEffect, useRef } from "react";
import twemoji from "twemoji";
import { classNames } from "../../utils/classNames";

/** CDN base for Twemoji SVG assets (flags & all emoji render consistently on Windows). */
const TWEMOJI_ASSETS_BASE =
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/";

const parseOpts = {
  folder: "svg",
  ext: ".svg",
  base: TWEMOJI_ASSETS_BASE,
};

/**
 * Renders children then replaces emoji codepoints with Twemoji SVG <img> tags.
 * Use for headings / paragraphs / list lines that may include regional flags (🏠 🇬🇭 etc.).
 */
const TwemojiText = React.forwardRef(
  ({ as: Component = "span", className, children, ...props }, forwardedRef) => {
    const localRef = useRef(null);

    useLayoutEffect(() => {
      const el = localRef.current;
      if (!el) return;
      twemoji.parse(el, parseOpts);
    }, [children]);

    const setRefs = (node) => {
      localRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    return (
      <Component ref={setRefs} className={classNames("twemoji-root", className)} {...props}>
        {children}
      </Component>
    );
  }
);

TwemojiText.displayName = "TwemojiText";
export default TwemojiText;
