"use client";

import * as React from "react";

type LogoProps = {
  width?: string | number;
  height?: string | number;
  className?: string;
};

function DownArrow({
  width = 10,
  height = 10,
  className,
  ...props
}: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={width}
      height={height}
      viewBox="0 0 330 330"
      className={className} // Pass className for extra styling
      {...props}
    >
      <path
        d="M325.607 79.393c-5.857-5.857-15.355-5.858-21.213.001l-139.39 139.393L25.607 79.393c-5.857-5.857-15.355-5.858-21.213.001-5.858 5.858-5.858 15.355 0 21.213l150.004 150a14.999 14.999 0 0 0 21.212-.001l149.996-150c5.859-5.857 5.859-15.355.001-21.213z"
        stroke="black" // Use `currentColor` for styling based on the current text color
        strokeWidth="10" // Increase stroke width to make lines bolder
        fill="black" // Optional: Make sure the inside of the path is transparent
      />
    </svg>
  );
}

export default DownArrow;
