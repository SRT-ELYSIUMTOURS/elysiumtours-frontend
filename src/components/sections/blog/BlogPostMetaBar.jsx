import React, { useCallback, useState } from "react";
import { classNames } from "../../../utils/classNames";

function CalendarGlyph({ className }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12.667 2.667H3.333C2.597 2.667 2 3.264 2 4v9.333c0 .737.597 1.334 1.333 1.334h9.334c.736 0 1.333-.597 1.333-1.334V4c0-.736-.597-1.333-1.333-1.333z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M10.667 1.333V4M5.333 1.333V4M2 6.667h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}



function ClockGlyph({ className }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 4.667V8l2.667 1.333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M7.21783 20.9384L7.1005 21.6792H7.1005L7.21783 20.9384ZM3.06156 16.7822L3.80232 16.6648V16.6648L3.06156 16.7822ZM20.9384 16.7822L21.6792 16.8995V16.8995L20.9384 16.7822ZM16.7822 20.9384L16.8995 21.6792H16.8995L16.7822 20.9384ZM20.6 10.5496C20.3513 10.2184 19.8811 10.1516 19.5499 10.4003C19.2187 10.6491 19.1519 11.1192 19.4007 11.4504L20.0004 11L20.6 10.5496ZM4.59931 11.4504C4.84808 11.1192 4.78126 10.6491 4.45007 10.4003C4.11888 10.1516 3.64873 10.2184 3.39996 10.5496L3.99963 11L4.59931 11.4504ZM12.75 3C12.75 2.58579 12.4142 2.25 12 2.25C11.5858 2.25 11.25 2.58579 11.25 3H12H12.75ZM8.58768 12.534C8.33033 12.2095 7.8586 12.155 7.53403 12.4123C7.20946 12.6697 7.15497 13.1414 7.41232 13.466L8 13L8.58768 12.534ZM9.39785 14.763L8.81016 15.2289V15.2289L9.39785 14.763ZM14.6022 14.763L14.0145 14.297V14.297L14.6022 14.763ZM16.5877 13.466C16.845 13.1414 16.7905 12.6697 16.466 12.4123C16.1414 12.155 15.6697 12.2095 15.4123 12.534L16 13L16.5877 13.466ZM11.7493 16.9801L11.6313 17.7208L11.6313 17.7208L11.7493 16.9801ZM12.2507 16.9801L12.3687 17.7208L12.3687 17.7208L12.2507 16.9801ZM21 14H20.25V15H21H21.75V14H21ZM15 21V20.25H9V21V21.75H15V21ZM3 15H3.75V14H3H2.25V15H3ZM9 21V20.25C8.04233 20.25 7.65082 20.2477 7.33515 20.1977L7.21783 20.9384L7.1005 21.6792C7.56216 21.7523 8.09965 21.75 9 21.75V21ZM3 15H2.25C2.25 15.9003 2.24767 16.4378 2.32079 16.8995L3.06156 16.7822L3.80232 16.6648C3.75233 16.3492 3.75 15.9577 3.75 15H3ZM7.21783 20.9384L7.33515 20.1977C5.51661 19.9096 4.09035 18.4834 3.80232 16.6648L3.06156 16.7822L2.32079 16.8995C2.71048 19.3599 4.64012 21.2895 7.1005 21.6792L7.21783 20.9384ZM21 15H20.25C20.25 15.9577 20.2477 16.3492 20.1977 16.6648L20.9384 16.7822L21.6792 16.8995C21.7523 16.4378 21.75 15.9003 21.75 15H21ZM15 21V21.75C15.9003 21.75 16.4378 21.7523 16.8995 21.6792L16.7822 20.9384L16.6648 20.1977C16.3492 20.2477 15.9577 20.25 15 20.25V21ZM20.9384 16.7822L20.1977 16.6648C19.9096 18.4834 18.4834 19.9096 16.6648 20.1977L16.7822 20.9384L16.8995 21.6792C19.3599 21.2895 21.2895 19.3599 21.6792 16.8995L20.9384 16.7822ZM21 14H21.75C21.75 12.7064 21.3219 11.5106 20.6 10.5496L20.0004 11L19.4007 11.4504C19.9342 12.1607 20.25 13.0424 20.25 14H21ZM3 14H3.75C3.75 13.0424 4.06583 12.1607 4.59931 11.4504L3.99963 11L3.39996 10.5496C2.67806 11.5106 2.25 12.7064 2.25 14H3ZM12 3H11.25V16H12H12.75V3H12ZM8 13L7.41232 13.466L8.81016 15.2289L9.39785 14.763L9.98553 14.297L8.58768 12.534L8 13ZM14.6022 14.763L15.1898 15.2289L16.5877 13.466L16 13L15.4123 12.534L14.0145 14.297L14.6022 14.763ZM9.39785 14.763L8.81016 15.2289C9.35616 15.9176 9.80475 16.4852 10.2055 16.8875C10.6096 17.2932 11.0582 17.6294 11.6313 17.7208L11.7493 16.9801L11.8673 16.2395C11.7612 16.2225 11.5913 16.1532 11.2682 15.8289C10.9418 15.5012 10.5543 15.0143 9.98553 14.297L9.39785 14.763ZM14.6022 14.763L14.0145 14.297C13.4457 15.0143 13.0582 15.5012 12.7318 15.8289C12.4087 16.1532 12.2388 16.2225 12.1327 16.2395L12.2507 16.9801L12.3687 17.7208C12.9418 17.6294 13.3904 17.2932 13.7945 16.8875C14.1953 16.4852 14.6438 15.9175 15.1898 15.2289L14.6022 14.763ZM11.7493 16.9801L11.6313 17.7208C11.7534 17.7402 11.8766 17.75 12 17.75V17V16.25C11.9559 16.25 11.9117 16.2465 11.8673 16.2395L11.7493 16.9801ZM12 17V17.75C12.1234 17.75 12.2466 17.7402 12.3687 17.7208L12.2507 16.9801L12.1327 16.2395C12.0883 16.2465 12.0441 16.25 12 16.25V17ZM12 16H11.25V17H12H12.75V16H12Z" fill="currentColor"/>
  </svg>
  );
}

function ShareIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M8 7C8 7 10.1958 4.28386 11.4044 3.23889C11.5987 3.0709 11.8169 2.99152 12.0337 3.00072C12.2282 3.00897 12.4215 3.08844 12.5958 3.23912C13.8041 4.28428 16 7 16 7M12.0337 4V15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8 11C6.59987 11 5.8998 11 5.36502 11.2725C4.89462 11.5122 4.51217 11.8946 4.27248 12.365C4 12.8998 4 13.5999 4 15V16C4 18.357 4 19.5355 4.73223 20.2678C5.46447 21 6.64298 21 9 21H15C17.357 21 18.5355 21 19.2678 20.2678C20 19.5355 20 18.357 20 16V15C20 13.5999 20 12.8998 19.7275 12.365C19.4878 11.8946 19.1054 11.5122 18.635 11.2725C18.1002 11 17.4001 11 16 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M15.1787 18.315C13.6551 20.5617 10.3451 20.5617 8.82146 18.315L3.5928 10.6049C2.62018 9.17074 2.56738 7.29379 3.44729 5.80092C5.2049 2.81898 9.55989 2.86144 11.2175 5.9001C11.5554 6.51949 12.4448 6.51949 12.7827 5.9001C14.4402 2.86145 18.7952 2.819 20.5528 5.80093C21.4327 7.29379 21.3799 9.17073 20.4073 10.6049L15.1787 18.315Z" stroke="currentColor" stroke-width="1.5"/>
</svg>
  );
}

const metaText =
  "font-raleway font-medium text-[13px] leading-[22px] text-secondary-dark-darker";

/**
 * Author row + download / share / like — between hero and article body (blog extended).
 */
const BlogPostMetaBar = React.forwardRef(
  (
    {
      authorName = "Davida Dzato",
      authorImage,
      dateLabel = "Jun 2, 2025",
      readTimeLabel = "3 minutes read",
      onDownload,
      onShare,
      onLike,
      className = "",
      ...props
    },
    ref
  ) => {
    const [liked, setLiked] = useState(false);

    const handleLike = useCallback(() => {
      setLiked((v) => {
        const next = !v;
        onLike?.(next);
        return next;
      });
    }, [onLike]);

    const iconBtn =
      "flex h-[47px] w-[47px] shrink-0 items-center justify-center rounded-full border border-solid border-secondary-light-default bg-[#fefefe] text-secondary-dark-darker shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] transition-colors hover:bg-secondary-light-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-normal-default";

    return (
      <section
        ref={ref}
        className={classNames("w-full bg-primary-light-default", className)}
        {...props}
      >
        <div className="mx-auto max-w-[1728px] px-[156px] pt-10">
          <div className="flex min-h-[104px] flex-col gap-6 border-t-[0.5px] border-b-[0.5px] border-solid border-secondary-light-default py-[14px] sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-3 sm:pl-[30px] sm:pr-[30px]">
            <div className="flex min-w-0 shrink-0 items-center gap-4">
              {authorImage ? (
                <img
                  src={authorImage}
                  alt=""
                  className="h-[75px] w-[75px] shrink-0 rounded-[50%] object-cover ring-1 ring-secondary-light-default"
                />
              ) : (
                <div
                  className="h-[75px] w-[75px] shrink-0 rounded-[50%] bg-secondary-light-hover ring-1 ring-secondary-light-default"
                  aria-hidden
                />
              )}
              <div className="flex min-w-0 flex-wrap items-center gap-x-1 gap-y-1 sm:flex-nowrap">
                <span className={classNames(metaText, "whitespace-nowrap px-2.5 py-2.5")}>
                  By {authorName}
                </span>
<div className="size-[3px] bg-secondary-dark-darker rounded-full"/>                <span className={classNames(metaText, "whitespace-nowrap px-2.5 py-2.5")}>
                  {dateLabel}
                </span>
<div className="size-[3px] bg-secondary-dark-darker rounded-full"/>                <span className={classNames(metaText, "whitespace-nowrap px-2.5 py-2.5")}>
                  {readTimeLabel}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 text-secondary-normal-default items-center gap-[19px] sm:justify-end">
              <button
                type="button"
                className={iconBtn}
                aria-label="Download article"
                onClick={onDownload}
              >
                <DownloadIcon />
              </button>
              <button
                type="button"
                className={iconBtn}
                aria-label="Share article"
                onClick={onShare}
              >
                <ShareIcon />
              </button>
              <button
                type="button"
                className={classNames(iconBtn, liked && "text-secondary-normal-default")}
                aria-label={liked ? "Unlike article" : "Like article"}
                aria-pressed={liked}
                onClick={handleLike}
              >
                <HeartIcon filled={liked} />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

BlogPostMetaBar.displayName = "BlogPostMetaBar";
export default BlogPostMetaBar;
