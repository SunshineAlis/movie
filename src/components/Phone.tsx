import React from "react";

type LogoProps = {
  width?: string | number;
  height?: string | number;
  className?: string;
};

function Phone({ width = 16, height = 17, className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      {...props}
    >
      <g clipPath="url(#a)">
        <path
          stroke="#FAFAFA"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.667 11.28v2a1.332 1.332 0 0 1-1.453 1.333 13.193 13.193 0 0 1-5.754-2.047 13 13 0 0 1-4-4 13.193 13.193 0 0 1-2.046-5.78A1.333 1.333 0 0 1 2.74 1.333h2A1.333 1.333 0 0 1 6.074 2.48a8.56 8.56 0 0 0 .466 1.873 1.333 1.333 0 0 1-.3 1.407l-.846.846a10.667 10.667 0 0 0 4 4l.846-.846a1.333 1.333 0 0 1 1.407-.3 8.56 8.56 0 0 0 1.873.466 1.333 1.333 0 0 1 1.147 1.354Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
export default Phone;
