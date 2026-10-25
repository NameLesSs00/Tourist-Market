"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CONTINUOUS_ARROW_PATH =
  "M 0 48.6872C1.83986 47.1382 3.78314 45.5627 5.82185 43.9726 L 13.8876 37.9723 C 17.8193 35.1805 22.0084 32.3895 26.4131 29.6618 L 35.0647 24.5522 C 39.3629 22.1349 43.8216 19.8051 48.4081 17.6117 L 57.5556 13.4997 C 62.1607 11.5622 66.8661 9.7837 71.6417 8.20916 L 81.257 5.3507 C 86.1226 4.06471 91.0386 3.01348 95.9746 2.24215 L 105.936 1.08065 C 110.958 0.700103 115.98 0.638987 120.969 0.944487 L 130.932 2.06413 C 135.85 2.879 140.716 4.08982 145.497 5.74335 L 154.77 9.57304 C 159.175 11.7042 163.486 14.2589 167.677 17.2765 L 175.464 23.5555 C 179.053 26.7793 182.533 30.3906 185.886 34.4173 L 191.954 42.3706 C 193.368 44.3901 194.755 46.4948 196.113 48.6872 L 204.501 64.3197 C 206.591 68.7526 208.611 73.4424 210.577 78.354 L 214.23 87.8794 C 215.939 92.518 217.615 97.3168 219.271 102.251 L 222.453 111.957 C 223.978 116.709 225.494 121.564 227.011 126.502 L 229.978 136.243 C 231.435 141.062 232.9 145.944 234.383 150.872 L 237.316 160.596 C 238.783 165.437 240.272 170.31 241.792 175.198 L 244.848 184.906 C 246.393 189.746 247.973 194.589 249.598 199.421 L 252.904 209.051 C 254.591 213.861 256.329 218.65 258.125 223.4 L 261.809 232.877 C 263.709 237.626 265.674 242.324 267.714 246.956 L 271.942 256.226 C 274.133 260.861 276.408 265.416 278.776 269.871 L 283.719 278.783 C 286.293 283.228 288.974 287.556 291.769 291.746 L 297.621 300.077 C 300.677 304.205 303.863 308.173 307.192 311.959 L 314.144 319.385 C 317.758 323.003 321.529 326.415 325.47 329.599 L 333.617 335.679 C 337.792 338.547 342.144 341.17 346.686 343.527 L 355.895 347.821 C 360.511 349.741 365.311 351.399 370.304 352.775 L 380.216 355.081 C 385.074 356.01 390.104 356.686 395.316 357.093 L 405.579 357.54 C 410.502 357.59 415.578 357.411 420.811 356.992 L 430.799 355.924 C 433.331 355.587 435.897 355.196 438.5 354.75 L 456.195 354.313 C 460.621 354.053 465.735 353.653 471.372 353.044 L 481.462 351.789 C 486.242 351.116 491.277 350.293 496.492 349.29 L 506.41 347.198 C 511.242 346.087 516.179 344.816 521.165 343.36 L 530.841 340.313 C 535.591 338.703 540.355 336.916 545.084 334.931 L 554.341 330.76 C 558.885 328.565 563.368 326.171 567.747 323.559 L 576.291 318.081 C 580.453 315.214 584.486 312.124 588.349 308.793 L 595.768 301.873 C 599.306 298.3 602.655 294.487 605.777 290.417 L 611.595 282.107 C 614.268 277.908 616.714 273.467 618.898 268.769 L 622.778 259.391 C 624.464 254.766 625.911 249.918 627.094 244.835 L 629.02 234.877 C 629.408 232.387 629.735 229.845 630 227.25 L 631.873 210.569 C 632.462 205.822 633.105 201.059 633.815 196.306 L 635.33 186.83 C 636.14 182.082 637.027 177.359 638.005 172.687 L 640.105 163.33 C 641.239 158.618 642.477 153.976 643.834 149.432 L 646.777 140.29 C 648.374 135.684 650.112 131.205 652.006 126.884 L 656.127 118.233 C 658.374 113.892 660.811 109.752 663.457 105.849 L 669.2 98.1684 C 672.288 94.4314 675.621 90.9839 679.222 87.8682 L 686.844 82.0539 C 690.781 79.4254 694.997 77.151 699.512 75.2721 L 708.565 72.1594 C 713.012 70.9316 717.718 70.0501 722.698 69.5456 L 732.296 69.0493 C 734.642 69.0385 737.043 69.1045 739.5 69.25 L 757.346 71.6433 C 762.511 72.7551 767.417 74.2054 772.083 75.9659 L 781.44 80.0619 C 786.074 82.3849 790.449 85.039 794.59 87.9903 L 802.627 94.3305 C 806.471 97.6717 810.097 101.288 813.526 105.145 L 820.045 113.056 C 823.12 117.073 826.028 121.294 828.789 125.688 L 834.022 134.514 C 836.496 138.931 838.849 143.488 841.099 148.158 L 845.4 157.484 C 847.454 162.131 849.424 166.868 851.327 171.668 L 855.011 181.243 C 856.799 186.027 858.534 190.857 860.232 195.709 L 863.57 205.4 C 865.222 210.261 866.848 215.13 868.463 219.983 L 871.704 229.721 C 873.338 234.619 874.973 239.486 876.626 244.296 L 880.011 253.979 C 881.756 258.875 883.533 263.693 885.36 268.406 L 889.18 277.912 C 891.199 282.745 893.288 287.438 895.47 291.96 L 900.135 301.079 C 902.65 305.707 905.293 310.107 908.092 314.24 L 914.183 322.479 C 917.482 326.55 920.989 330.269 924.742 333.584 L 932.855 339.84 C 937.093 342.66 941.619 345.011 946.474 346.834 L 956.288 349.689 C 961.066 350.699 966.132 351.25 971.516 351.298 L 981.717 350.817 C 984.246 350.564 986.84 350.209 989.5 349.75 L 1006.8 345.976 C 1011.81 344.638 1016.65 343.125 1021.3 341.448 L 1030.73 337.735 C 1035.46 335.706 1039.99 333.499 1044.34 331.129 L 1053 326.049 C 1057.33 323.323 1061.47 320.425 1065.43 317.373 L 1073.26 310.947 C 1077.08 307.609 1080.73 304.119 1084.21 300.494 L 1091.01 293.029 C 1094.31 289.204 1097.46 285.255 1100.48 281.2 L 1106.32 272.954 C 1109.15 268.778 1111.85 264.507 1114.44 260.161 L 1119.47 251.401 C 1121.91 246.984 1124.25 242.504 1126.51 237.977 L 1130.91 228.879 C 1133.06 224.304 1135.14 219.694 1137.16 215.067 L 1141.13 205.781 C 1143.09 201.107 1145 196.428 1146.88 191.76 L 1150.64 182.366 C 1152.52 177.637 1154.37 172.933 1156.22 168.271 L 1159.97 158.873 C 1161.87 154.13 1163.78 149.446 1165.71 144.843 L 1169.7 135.566 C 1171.76 130.861 1173.87 126.26 1176.04 121.786 L 1180.57 112.788 C 1182.98 108.216 1185.47 103.806 1188.07 99.5881 L 1193.59 91.1604 C 1196.56 86.9258 1199.67 82.935 1202.95 79.2235 L 1209.98 71.989 C 1213.7 68.5107 1217.64 65.3675 1221.84 62.6007 L 1230.58 57.5839 C 1235.01 55.3935 1239.72 53.5868 1244.72 52.202 L 1254.55 50.0952 C 1259.32 49.3534 1264.35 48.9618 1269.65 48.9469 L 1279.67 49.3466 C 1282.19 49.5491 1284.76 49.8294 1287.39 50.19 L 1304.25 53.5934 C 1308.92 54.8103 1313.64 56.2486 1318.38 57.8687 L 1327.63 61.2403 C 1332.19 63.0021 1336.74 64.9073 1341.26 66.921 L 1350.2 71.0551 C 1354.66 73.1929 1359.07 75.4158 1363.39 77.6896 L 1372.06 82.364 C 1376.45 84.7944 1380.74 87.2547 1384.88 89.7056 L 1393.3 94.7884 C 1397.68 97.4881 1401.86 100.142 1405.79 102.696 L 1413.98 108.118 C 1418.55 111.194 1422.64 114.035 1426.15 116.523 L 1440 126.704";

const HEXAGONS = [
  {
    id: "hex-1",
    title: "Uncover the Wonders",
    img: "/PrivateExcursions/Polygon 2.png",
    pos: "top",
    // Balanced wave positions inside max-w-[1440px] container matching reference
    left: "2%",
    top: "3%",
  },
  {
    id: "hex-2",
    title: "Journey Through Time",
    img: "/PrivateExcursions/Polygon 3.png",
    pos: "bottom",
    left: "21.5%",
    top: "46%",
  },
  {
    id: "hex-3",
    title: "Sail into Serenity",
    img: "/PrivateExcursions/Polygon 4.png",
    pos: "top",
    left: "41%",
    top: "3%",
  },
  {
    id: "hex-4",
    title: "Beyond the Ordinary",
    img: "/PrivateExcursions/Polygon 5.png",
    pos: "bottom",
    left: "60.5%",
    top: "46%",
  },
  {
    id: "hex-5",
    title: "Your ideal vacation starts here",
    img: "/PrivateExcursions/Polygon 6.png",
    pos: "top",
    left: "80%",
    top: "3%",
  },
];

export function PrivateExcursionsHero() {
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const handlePrev = () => {
    setActiveMobileIdx((prev) => (prev === 0 ? HEXAGONS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveMobileIdx((prev) => (prev + 1) % HEXAGONS.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="relative w-full bg-[#F4F1D5] overflow-hidden pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-14 lg:pb-16 font-poppins select-none">
      {/* Container aligned with parent max-width and padding */}
<div className="relative w-full max-w-[1440px] mx-auto px-0">
        {/* ─── 1. Header Titles ─── */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-tight">
            <span className="text-[#DE7423]">Private</span>{" "}
            <span className="text-[#0E4A68]">Excursions</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-[#646464] font-medium max-w-2xl mx-auto">
            Discover amazing private excursions in the Red Sea with the best prices and services
          </p>
        </div>

        {/* ─── 2. DESKTOP VIEW (lg / xl / 2xl): Matches PromptsUi/PrivateExcursionshero.png ─── */}
        <div className="hidden lg:block relative w-full h-[620px] xl:h-[660px] select-none">
          {/* Layer A: Doodles background (1418 x 447) */}
          <div
            className="absolute inset-x-0 pointer-events-none z-0"
            style={{
              top: "70px",
              height: "450px",
            }}
          >
            <Image
              src="/PrivateExcursions/doodles.svg"
              alt=""
              fill
              priority
              className="object-contain object-center pointer-events-none"
            />
          </div>

          {/* Layer B: Dashed Flight Path from arrowpath.svg (1440 x 359) */}
          <div
            className="absolute inset-x-0 z-10 pointer-events-none"
            style={{
              top: "95px",
              height: "360px",
            }}
          >
            <Image
              src="/PrivateExcursions/arrowpath.svg"
              alt=""
              fill
              priority
              className="object-contain object-center pointer-events-none"
            />
          </div>

          {/* Layer C: Animated Arrow traveling along the dashed path, arrowhead pointed in travel direction */}
          <svg
            className="absolute inset-x-0 z-20 pointer-events-none w-full"
            style={{
              top: "95px",
              height: "360px",
            }}
            viewBox="0 0 1440 359"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <animateMotion
                path={CONTINUOUS_ARROW_PATH}
                dur="12s"
                repeatCount="indefinite"
                rotate="auto"
              />
              {/* Arrow SVG element with orientation adjusted so arrowhead points directly forward along travel tangent */}
              <g transform="rotate(-53) translate(-13.5, -17)">
                <path
                  d="M24.7149 32.8006L15.0957 11.0661M25.3394 1.57843L25.1259 32.4274C25.1255 32.5389 25.0929 32.6478 25.0319 32.7411C24.971 32.8344 24.8843 32.908 24.7824 32.9531C24.6805 32.9982 24.5677 33.0128 24.4577 32.9952C24.3477 32.9776 24.2451 32.9285 24.1623 32.8539L1.18517 12.2685C1.09862 12.1885 1.03865 12.0839 1.01331 11.9688C0.987979 11.8537 0.998502 11.7336 1.04346 11.6247C1.08843 11.5157 1.16567 11.4232 1.26482 11.3594C1.36396 11.2957 1.48024 11.2638 1.59803 11.2681L14.5253 11.0514C14.7041 11.0597 14.8824 11.0263 15.0461 10.9539C15.2097 10.8815 15.3543 10.7719 15.4684 10.634L24.3173 1.20977C24.393 1.11803 24.4952 1.05192 24.6099 1.0205C24.7246 0.98908 24.8463 0.993876 24.9581 1.03423C25.07 1.07459 25.1667 1.14853 25.235 1.24595C25.3032 1.34336 25.3397 1.45949 25.3394 1.57843Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#FFFFFF"
                />
              </g>
            </g>
          </svg>

          {/* Layer D: The 5 Polygons with Titles */}
          {HEXAGONS.map((item) => (
            <div
              key={item.id}
              className="absolute z-20 flex flex-col items-center select-none w-[235px] xl:w-[250px] transition-transform duration-300 hover:scale-105"
              style={{
                left: item.left,
                top: item.top,
              }}
            >
              {item.pos === "top" && (
                <h3 className="text-[14px] xl:text-[16px] font-bold text-[#0E4A68] text-center mb-2.5 xl:mb-3 whitespace-nowrap drop-shadow-sm">
                  {item.title}
                </h3>
              )}

              <div className="relative w-full aspect-[714/786] drop-shadow-[0_12px_24px_rgba(0,0,0,0.16)]">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {item.pos === "bottom" && (
                <h3 className="text-[14px] xl:text-[16px] font-bold text-[#0E4A68] text-center mt-2.5 xl:mt-3 whitespace-nowrap drop-shadow-sm">
                  {item.title}
                </h3>
              )}
            </div>
          ))}
        </div>

        {/* ─── 3. RESPONSIVE VIEW (< lg: Tablet & Mobile) ─── */}
        <div
          className="block lg:hidden relative w-full pt-2 pb-4"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Background Doodles watermark */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <Image
              src="/PrivateExcursions/doodles.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* Active Featured Card with Navigation */}
          <div className="relative z-10 flex flex-col items-center max-w-sm mx-auto">
            {/* Title */}
            <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0E4A68] text-center mb-4 min-h-[32px] px-2">
              {HEXAGONS[activeMobileIdx].title}
            </h3>

            {/* Polygon Hexagon with Left & Right Arrow Navigation */}
            <div className="relative w-[240px] sm:w-[280px] h-[265px] sm:h-[310px] flex items-center justify-center">
              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous destination"
                className="absolute -left-3 sm:-left-5 z-30 w-11 h-11 rounded-full bg-white border border-black/15 shadow-lg flex items-center justify-center text-[#0E4A68] hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
              >
                <FiChevronLeft size={24} />
              </button>

              {/* Polygon Image */}
              <div className="relative w-full h-full drop-shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition-all duration-300">
                <Image
                  src={HEXAGONS[activeMobileIdx].img}
                  alt={HEXAGONS[activeMobileIdx].title}
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next destination"
                className="absolute -right-3 sm:-right-5 z-30 w-11 h-11 rounded-full bg-white border border-black/15 shadow-lg flex items-center justify-center text-[#0E4A68] hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
              >
                <FiChevronRight size={24} />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2 mt-6">
              {HEXAGONS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveMobileIdx(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === activeMobileIdx
                      ? "w-8 bg-[#DE7423]"
                      : "w-2.5 bg-[#0E4A68]/30 hover:bg-[#0E4A68]/60"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Quick Destination Strip Below */}
          <div className="mt-7 flex items-center justify-center gap-3 overflow-x-auto no-scrollbar py-2 px-3">
            {HEXAGONS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveMobileIdx(idx)}
                className={`relative w-[62px] sm:w-[74px] h-[68px] sm:h-[80px] shrink-0 rounded-xl overflow-hidden transition-all cursor-pointer ${
                  idx === activeMobileIdx
                    ? "ring-2 ring-[#DE7423] scale-105 opacity-100 shadow-md"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="74px"
                  className="object-contain"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrivateExcursionsHero;
