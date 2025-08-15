import React from "react";

const Svg = ({
  color,
  style,
  width,
  height,
  children,
  className,
  hoverColor,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onClick,
  onMouseLeave,
  onMouseEnter,
  onMouseDown,
  onMouseMove,
  onMouseUp,
}: any) => {
  return (
    <svg
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={`${className} svg-icon`}
      width={width}
      height={height}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={style} // Smooth transition for the color change
    >
      {children}
      <style jsx>{`
        .svg-icon:hover {
          fill: ${hoverColor ||
          color}; // Use hoverColor if provided, otherwise fall back to color
        }
      `}</style>
    </svg>
  );
};

export default Svg;
