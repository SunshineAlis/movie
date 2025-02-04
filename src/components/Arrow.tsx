import * as React from "react";

type LogoProps = {
  width?: string | number;
  height?: string | number;
  className?: string;
};

function Arrow({
  width = 10,
  height = 10,
  className = "",
  ...props
}: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={width}
      height={height}
      viewBox="0 0 330 330"
      className={className} // 
      {...props}
    >
      <path d="m250.606 154.389-150-149.996c-5.857-5.858-15.355-5.858-21.213.001-5.857 5.858-5.857 15.355.001 21.213l139.393 139.39L79.393 304.394c-5.857 5.858-5.857 15.355.001 21.213C82.322 328.536 86.161 330 90 330s7.678-1.464 10.607-4.394l149.999-150.004a14.996 14.996 0 0 0 0-21.213z" />
    </svg>
  );
}

export default Arrow;

