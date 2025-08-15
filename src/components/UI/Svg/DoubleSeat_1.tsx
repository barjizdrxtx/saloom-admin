import React from "react";
import Svg from "./Svg";


const DoubleSeat_1 = ({
  onMouseLeave,
  onMouseEnter,
  onClick,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  style,
  width,
  height,
  color,
  className,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  position,
}: any) => {
  return (
    <Svg
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      width={width}
      style={style}
      height={height}
      color={color}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${className} ${position === "left" ? "ml-0.5" : "mr-0.5"} `}
    >
      {position === "left" ? (
        <>
          <path
            d="M26.21,9.69A1.35,1.35,0,0,1,24.84,11H7.63A1.35,1.35,0,0,1,6.26,9.69V1.93C6.26.87,7.45,0,8.92,0H23.55C25,0,26.21.87,26.21,1.93Z"
            transform="translate(0 0)"
          />
          <path
            d="M5,4.37v6.76A1.17,1.17,0,0,0,6.17,12.3H21.53a1,1,0,0,1,.92.64l1.81,4.76H2.74A2.74,2.74,0,0,1,0,15V4.37A1.17,1.17,0,0,1,1.17,3.2H3.83A1.17,1.17,0,0,1,5,4.37Z"
            transform="translate(0 0)"
          />
          <polygon points="27.04 17.7 22.85 17.7 21.19 13.36 27.04 13.36 27.04 17.7" />
        </>
      ) : (
        <>
          <path
            d="M.83,1.93C.83.87,2,0,3.49,0H18.13c1.46,0,2.66.87,2.66,1.93V9.69A1.36,1.36,0,0,1,19.41,11H2.2A1.35,1.35,0,0,1,.83,9.69Z"
            transform="translate(0 0)"
          />
          <path
            d="M23.21,3.2h2.67A1.16,1.16,0,0,1,27,4.37V15A2.74,2.74,0,0,1,24.3,17.7H2.79l1.8-4.76a1,1,0,0,1,.92-.64H20.88A1.16,1.16,0,0,0,22,11.13V4.37A1.17,1.17,0,0,1,23.21,3.2Z"
            transform="translate(0 0)"
          />
          <polygon points="0 17.7 4.19 17.7 5.85 13.36 0 13.36 0 17.7" />
        </>
      )}
    </Svg>
  );
};

export default DoubleSeat_1;
