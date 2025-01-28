import React from "react";

type LogoProps = {
  width?: string | number;
  height?: string | number;
  className?: string;
};

export const MovieLogo: React.FC<LogoProps> = ({
  width = 20,
  height = 21,
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    className={className} // className дамжуулах
    {...props} // Дахин бусад props дамжуулах
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.834 2.167v16.666m8.333-16.666v16.666M1.667 10.5h16.667M1.667 6.333h4.167m-4.167 8.334h4.167m8.333 0h4.167m-4.167-8.334h4.167M3.484 2.166h13.033c1.003 0 1.817.814 1.817 1.817v13.034a1.817 1.817 0 0 1-1.817 1.816H3.484a1.817 1.817 0 0 1-1.817-1.816V3.982c0-1.003.813-1.817 1.817-1.817Z"
    />
  </svg>
);
