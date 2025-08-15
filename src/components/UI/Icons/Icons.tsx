import React from "react";

interface CustomIconProps {
  color?: string;
  onClick?: () => void;
  name: string; // 'name' prop is now required
  filled?: boolean;
  className?: string;
  fontSize?: number;
}

const CustomIcon: React.FC<CustomIconProps> = ({
  color,
  onClick,
  name,
  filled = false,
  className,
  fontSize,
}) => {
  // Determine fill style based on the value of filled prop
  const fillStyle = filled ? "FILL 1" : "FILL 0";

  return (
    <span
      onClick={onClick}
      className={`rounded-full cursor-pointer material-symbols-outlined ${className}`}
      style={{
        color: color,
        fontVariationSettings: `${fillStyle}, 'wght' 300, 'GRAD' 0, 'opsz' 20`,
        fontSize: fontSize,
      }}
    >
      {name}
    </span>
  );
};

const IconButton = ({ onClick, children, className }: any) => {
  return (
    <div
      className={`${className} mx-2 p-1  flex justify-center 
      items-center border rounded-full cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export { CustomIcon, IconButton };
