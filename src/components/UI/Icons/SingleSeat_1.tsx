import React from "react";
import SvgSeat from "../SvgSeat";

const SingleSeat_1 = ({
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
  onMouseUp
}: any) => {
  return (
    <div style={{ marginLeft: "1px", marginRight: "1px" }}>
      <SvgSeat
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
        className={`${className}`}
      >
        <path
          d="M19.41,13.1H7.19A1.39,1.39,0,0,1,5.8,11.71v-8a2,2,0,0,1,2-2h11a2,2,0,0,1,2,2v8A1.39,1.39,0,0,1,19.41,13.1Z"
          transform="translate(0 -1.7)"
        />
        <path
          d="M21.7,6.07v6.76A1.17,1.17,0,0,1,20.53,14H13.2v5.4H24a2.74,2.74,0,0,0,2.74-2.74V6.07A1.17,1.17,0,0,0,25.53,4.9H22.87A1.17,1.17,0,0,0,21.7,6.07Z"
          transform="translate(0 -1.7)"
        />
        <path
          d="M5,6.07v6.76A1.17,1.17,0,0,0,6.17,14H13.5v5.4H2.74A2.74,2.74,0,0,1,0,16.66V6.07A1.17,1.17,0,0,1,1.17,4.9H3.83A1.17,1.17,0,0,1,5,6.07Z"
          transform="translate(0 -1.7)"
        />
      </SvgSeat>
    </div>
  );
};

export default SingleSeat_1;
