import React from "react";
import Button from "../Button/Button";

const GuestBox = () => {
  return (
    <div className="absolute w-64 bg-white p-1 h-48 rounded-lg mt-1 p-2 shadow-lg">
      <div className="flex justify-between items-center">
        <span>Adult :</span>
        <Button
          h={6}
          w={16}
          col={"bg-white-600"}
          hcol={"bg-grey-700"}
          text={"text-black-600"}
          op={"adult"}
        />
      </div>
      <div className="flex justify-between items-center mt-2">
        <span>Child :</span>
        <Button
          h={6}
          w={16}
          col={"bg-white-600"}
          hcol={"bg-grey-700"}
          text={"text-black-600"}
          op={"child"}
        />
      </div>
      <div className="flex justify-between items-center mt-2">
        <span>Room :</span>
        <Button
          h={6}
          w={16}
          col={"bg-white-600"}
          hcol={"bg-gray-700"}
          text={"text-black-600"}
          op={"room"}
        />
      </div>

      <div className="mt-5 gap-2 flex justify-center items-center">
        <label htmlFor="pet">Travelling with Pets ?</label>
        <input type="checkbox" id="pet" />
      </div>

      <div className="mb-5 flex justify-center items-center">
        <button className="w-56 rounded-lg h-8 border border-[1px] border-[blue] text-center">
          Done
        </button>
      </div>
    </div>
  );
};

export default GuestBox;
