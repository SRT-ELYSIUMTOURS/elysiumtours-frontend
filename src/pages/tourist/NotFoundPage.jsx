import React from "react";
import { Link } from "react-router-dom";

/** Same asset + dimensions as `Navbar` `ElysiumLogo` */
const NAV_LOGO_SRC = "/ElysiumAssets/Logo.png";

/** Figma / Codia megaphone asset for the “Oops” pill */
const OOPS_DECO_ICON =
  "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-05-06/BLpXeAMtrF.png";

/** Hero photo — swap `NOT_FOUND_IMAGE` for your Figma export if needed */
const NOT_FOUND_IMAGE = "/tourCountryAssets/guide2.png";

/**
 * 404 — standalone layout (no main Navbar/Footer): Figma two-column + minimal footer.
 */
export default function NotFoundPage() {
  const year = new Date().getFullYear();

  return (
    <div
      className="flex min-h-screen flex-col bg-[#f5f3f8] font-raleway text-primary-dark-default"
      style={{ fontFamily: "Raleway, sans-serif" }}
    >
      <header className="shrink-0 px-6 pt-8 md:px-[145px]">
        <Link to="/" className="inline-flex items-center" aria-label="Elysium Tours home">
          <img src={NAV_LOGO_SRC} width={80} height={80} alt="" />
        </Link>
      </header>

      <main className="flex flex-1 flex-col justify-center px-6 py-10 md:px-[145px] md:py-14">
        <div className="mx-auto flex w-full max-w-[1728px] justify-between flex-col items-stretch gap-12 lg:flex-row lg:items-center lg:gap-[100px] xl:gap-[160px]">
          {/* Left — Figma: 508px column, split “404” digits + pill */}
          <div className="relative mx-auto flex w-full max-w-[508px] flex-col flex-nowrap items-center gap-[16px] lg:mx-0">
            <div className="relative flex h-[181px] w-[336px] max-w-full shrink-0 flex-nowrap items-center justify-center">
              <div className="relative z-[1] flex h-[200px] w-[112px] shrink-0 flex-col flex-nowrap items-center justify-center gap-[10px] p-[10px]">
                <span
                  className="relative z-[2] inline-flex w-[100px] shrink-0 basis-auto items-center justify-start whitespace-nowrap text-left font-semibold leading-[212px] text-[#c6c6c6]"
                  style={{ fontFamily: "'Poppins', sans-serif", fontSize: "150px", height: "212px" }}
                >
                  4
                </span>
              </div>
              <div className="relative z-[3] flex h-[200px] w-[112px] shrink-0 flex-col flex-nowrap items-center justify-center gap-[10px] p-[10px]">
                <span
                  className="relative z-[4] h-[225px] shrink-0 basis-auto whitespace-nowrap text-left font-semibold leading-[225px] text-[#c6c6c6]"
                  style={{ fontFamily: "'Poppins', sans-serif", fontSize: "150px" }}
                >
                  0
                </span>
              </div>
              <div className="relative z-[5] flex h-[200px] w-[112px] shrink-0 flex-col flex-nowrap items-center justify-center gap-[10px] p-[10px]">
                <span
                  className="relative z-[6] h-[225px] shrink-0 basis-auto whitespace-nowrap text-left font-semibold leading-[225px] text-[#c6c6c6]"
                  style={{ fontFamily: "'Poppins', sans-serif", fontSize: "150px" }}
                >
                  4
                </span>
              </div>
            </div>

            <div className="relative z-[7] flex min-h-[60px] w-full shrink-0 flex-nowrap items-center justify-center gap-[8px] self-stretch rounded-[30px] bg-[rgba(235,223,245,0.5)] py-[10px] pl-[27px] pr-px">
              <div
                className="relative z-[8] h-6 w-6 shrink-0 bg-cover bg-center bg-no-repeat"
                role="presentation"
                aria-hidden
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M2.00031 20H18.0003" stroke="#5C218F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3.82527 12.1661C3.55027 11.9661 3.30027 11.7161 3.00028 10.8411C2.91891 10.6241 2.61139 9.53619 2.35028 8.54109C2.13003 7.7017 1.93377 6.93555 2.02528 6.74109C2.10029 6.54109 2.20027 6.39109 2.52527 6.19109C2.72527 6.06802 3.75027 5.81609 3.95027 5.76609C4.15027 5.71609 4.42526 5.69109 4.65027 5.76609C5.07527 5.84109 5.95027 7.11609 6.17527 7.26609C6.27526 7.36609 6.60027 7.657 6.97527 7.69109C7.25027 7.71609 7.52527 7.64109 7.82528 7.51609C8.10027 7.40151 13.5253 4.76609 14.0253 4.54109C18.1003 2.84109 21.0603 5.63609 21.5103 6.23609C21.9753 6.81609 22.0753 6.99109 21.9503 7.49109C21.7887 8.01609 21.3503 8.11609 21.1003 8.19109C20.8503 8.26609 17.4003 9.19109 16.0503 9.56609C15.7554 9.6621 15.6114 9.85492 15.5753 9.89109C15.4003 10.1411 14.6053 11.8411 14.3803 12.2161C14.2253 12.6161 13.8003 13.1161 13.2503 13.3161C12.6753 13.5161 11.6753 13.7411 11.4503 13.8161C11.2253 13.8911 10.7003 14.0411 10.5253 13.9911C10.3003 13.9411 10.0853 13.7161 10.1853 13.3661C10.2853 13.0161 10.4753 12.0411 10.5003 11.8911C10.5253 11.7411 10.7753 11.1161 10.5003 11.0911C10.4503 11.0161 9.92527 11.2411 9.15027 11.4161C8.57449 11.5782 7.9715 11.7386 7.55027 11.8411C5.92527 12.3161 5.04521 12.4411 4.85027 12.4411C4.47527 12.4411 4.20027 12.3911 3.82527 12.1661Z" stroke="#5C218F" stroke-width="1.5"/>
</svg>
              </div>
              <div className="relative z-[9] min-w-0 max-w-[487px] shrink font-raleway text-left text-[16px] font-semibold leading-[22px]">
                <span className="text-[20px] font-semibold leading-[28px] text-[#5c218f]">
                  Oops!{" "}
                </span>
                <span className="text-[16px] font-medium leading-[26px] text-[#2d2d2d]">
                  This page took a detour. It may have been moved, renamed, or isn&apos;t available
                  anymore.
                </span>
              </div>
            </div>
          </div>

          {/* Right — image + CTA */}
          <div className="relative w-full shrink-0 lg:w-[min(100%,716px)] lg:max-w-[716px]">
            <div
              className="relative aspect-[716/765] w-full min-h-[280px] overflow-hidden rounded-[20px] bg-neutral-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] lg:min-h-0 lg:aspect-auto lg:h-[min(70vh,765px)]"
              style={{ boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.05)" }}
            >
              <img
                src={NOT_FOUND_IMAGE}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

              <div className="absolute bottom-6 right-6 z-10 md:bottom-8 md:right-8">
                <Link
                  to="/"
                  className="pointer-events-auto inline-flex items-center justify-center rounded-[40px] bg-secondary-normal-default px-8 py-3.5 text-[16px] font-semibold text-primary-light-default shadow-md transition-colors hover:bg-secondary-normal-hover active:bg-secondary-normal-active"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto shrink-0 border-t border-black/[0.06] px-6 py-6 md:px-[145px]">
        <div className="mx-auto flex max-w-[1728px] flex-col gap-4 text-[13px] font-medium text-[#6b6b6b] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Elysium Tours. All rights reserved.</p>
          <div className="flex flex-wrap gap-6 sm:justify-end">
            <a href="#" className="transition-colors hover:text-secondary-normal-default">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-secondary-normal-default">
              Terms of Use
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
