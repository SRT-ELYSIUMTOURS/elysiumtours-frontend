import React from "react";
import { classNames } from "../../../utils/classNames";
import Button from "../../ui/button";
import ExploreMoreArrowIcon from "../../icons/ExploreMoreArrowIcon";
import sectionLineImg from "../../../assets/ElysiumAssets/section-line.svg";
import whyChooseBg    from "../../../assets/ElysiumAssets/why-choose-bg.png";

// ── WhyChooseSection ─────────────────────────────────────────────────────────
// Figma frame: 1914:37693  (bg-[#f2eaf9], relative, full-width)
//
// Layout (absolute coords → converted to normal flow):
//   Header  1914:37694  — left=156  top=80   w=1416  h≈194
//   Image   1914:37706  — left=156  top=314  w=1419  h=554
//   Gap between header bottom (80+194=274) and image top (314) = 40px → mb-[40px]
//
// Below this first frame is a second "article preview" section (1914:39485)
// that is preserved but not yet Figma-mapped in this task.

const WhyChooseSection = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={classNames("w-full bg-[#f2eaf9] px-[156px] pt-[80px] pb-[80px]", className)}
      {...props}
    >
      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      {/* Figma 1914:37694 — flex items-start justify-between, w=1416
          mb-[40px]: gap between header bottom and image top                    */}
      <div className="flex items-start justify-between w-full mb-[40px]">

        {/* Left block — section-line + label
            Figma: flex gap-[8px] items-center
            Line: h=0 w=46 (SVG with explicit px dims to avoid 300×150 default)
            Label: Raleway Bold 13px/18px #2b0f43, w=274                       */}
        <div className="flex items-center gap-[8px] shrink-0">
          <img
            src={sectionLineImg}
            alt=""
            aria-hidden="true"
            style={{ width: "46px", height: "2px", display: "block" }}
          />
          <div className="flex items-center justify-center p-[10px]">
            <span className="font-raleway font-bold text-[13px] leading-[18px] text-[#2b0f43] w-[274px]">
              AUTHENTIC.SEAMLESS.UNFOREGETTABLE
            </span>
          </div>
        </div>

        {/* Right block — w=677, flex-col gap-[16px] items-end
            Title:  h=37, w=597 inner, Raleway Bold 25px/34px #2d2d2d text-right
            Desc:   h=93, w=565 inner, Raleway Regular 16px/24px #2d2d2d text-right
            Button: h=32, Raleway SemiBold 13px #7b2cbf + arrow 14px           */}
        <div className="flex flex-col gap-[16px] items-end w-[677px]">

          {/* Title */}
          <div className="flex h-[37px] items-center justify-center pl-[10px] py-[10px] w-[597px]">
            <h2 className="font-raleway font-bold text-[25px] leading-[34px] text-[#2d2d2d] text-right w-[581px]">
              Why Choose Elysium Tours?
            </h2>
          </div>

          {/* Description */}
          <div className="flex h-[93px] items-center justify-end pl-[10px] pr-px py-[10px] w-full">
            <p className="font-raleway font-normal text-[16px] leading-[24px] text-[#2d2d2d] text-right w-[565px]">
              At Elysium Tours, we believe travel is more than visiting destinations — it's
              about experiencing the soul of a place. With expert local guides and
              personalized itineraries, every journey is seamless, stress-free, and
              enriching. We create authentic cultural connections that let
            </p>
          </div>

          {/* Explore More button
              Figma: border-[0.8px] border-[#7b2cbf] rounded-[40px] h-[32px]
                     shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] gap-[9px] p-[10px]
              Note: icon placed inside children (not endIcon) so Button's
                    gap-[9px] override controls spacing instead of the default ml-2 */}
          <Button
            variant="secondaryOutline"
            endIcon={<ExploreMoreArrowIcon />}
            shape="pill"
            size="small"
            className="h-[32px]  rounded-[40px] border-[0.8px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] px-[10px]"
          >
            Explore More
          </Button>
        </div>
      </div>

      {/* ── LARGE IMAGE ─────────────────────────────────────────────────────── */}
      {/* Figma 1914:37706 — w≈1419 (w-full), h=554, rounded-[20px], overflow-clip
          The asset is rendered larger than the container and offset upward:
            height: 172.44% of 554px ≈ 955px
            top:   -24.49% of 554px ≈ -136px
          This crops to the lower/centre portion of the panoramic photo.        */}
      <div className="relative w-full h-[554px] rounded-[20px] overflow-clip shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]">
        <img
          src={whyChooseBg}
          alt="Safari vehicles and canoes in an African national park"
          className="absolute left-0 w-full max-w-none pointer-events-none"
          style={{ height: "172.44%", top: "-24.49%" }}
        />
      </div>

    </section>
  );
});

WhyChooseSection.displayName = "WhyChooseSection";
export default WhyChooseSection;
