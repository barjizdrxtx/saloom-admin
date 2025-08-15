import { useRouter } from "next/navigation";
import React from "react";

const LeavePagePopup = ({
  titleInEnglish,
  setShowPopup,
}: any) => {
  const router = useRouter();

  const handleConfirm = (confirm: any) => {
    if (confirm) {
      // Proceed with navigation, or handle according to your needs
      router.push("/dashboard");
    } else {
      // Stay on the page and prevent navigation
      window.history.pushState(null, "", window.location.href);
    }
    setShowPopup(false);
  };

  return (
    <div className="z-50 fixed top-0 left-0 w-full h-screen flex justify-center items-center">
      {/* Background overlay */}
      <div className="fixed top-0 left-0 w-full h-screen bg-blue-500 opacity-10 -z-10"></div>

      {/* Popup content */}
      <div className={` w-fit p-4 rounded-md`}>
        {/* Message based on language */}
        <p>{titleInEnglish}</p>
        <div className="flex mt-5 justify-end w-full">
          {/* Confirm button */}
          <button
            className="bg-red-500 py-2 px-6 mx-2 rounded-md"
            onClick={() => handleConfirm(true)} // Confirm cancellation of payment
          >
            {"Yes"}
          </button>
          {/* Cancel button */}
          <button
            className="bg-green-500 py-2 px-6 mx-2 rounded-md"
            onClick={() => handleConfirm(false)} // Cancel and keep the payment
          >
            {"No"} {/* Arabic for "No" */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeavePagePopup;
