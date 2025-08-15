import { useRouter } from "next/navigation";
import React from "react";

export const CreateButton = (props: any) => {
  const { buttonName, title, onCreate } = props;
  const router = useRouter();

  return (
    <div className="flex flex-col w-full">
      {/* Only show this text on large screens */}
      <div className="hidden lg:flex w-1/2 items-center">
        <h5 className="text-primary font-bold m-2 capitalize">{`${buttonName} ${title}`}</h5>
      </div>

      {/* Buttons section */}
      <div className="w-full flex justify-center">
        <button
          className="bg-primary text-white font-bold py-2 px-4 rounded m-1"
          onClick={onCreate}
        >
          Save
        </button>

        <button
          className="bg-black text-white font-bold py-2 px-4 rounded m-1"
          onClick={() => router.push(`/${title}`)}
        >
          Cancel
        </button>
      </div>

      <hr className="border-t border-gray-300 w-full mt-4" />
    </div>
  );
};
