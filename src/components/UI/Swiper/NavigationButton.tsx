import React from "react";
import { CustomIcon, IconButton } from "../Icons/Icons";

const NavigationButton = ({ back, direction, darkMode, isEnglish }: any) => {
  
  return (
    <IconButton
      className={`custom-swiper-button-${direction} ${
        darkMode ? "border-white" : "border-black"
      } ${"border-yellows bg-yellows hover:border-primary hover:bg-primary"}`}
      w={35}
      h={35}
    >
      <CustomIcon
        fontSize={15}
        name={back ? "arrow_back_ios_new" : "arrow_forward_ios"}
        className={`
          text-black
        ${isEnglish ? "rotate-0" : "rotate-0"} 
        p-2 hover:bg-primary hover:text-white`}
      />
    </IconButton>
  );
};

export default NavigationButton;
