import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  TruckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import GuestBox from "./GuestBox";

const RoomSearch = () => {
  const [showBox, setShowBox] = useState(false);

  const [guestCount, setGuestCount] = useState({
    adult: 1,
    child: 0,
    room: 0,
  });

  return (
    <div className="flex flex-wrap justify-center md:justify-between items-center gap-2 absolute p-1 bg-[gold] w-full max-w-[900px] h-auto rounded-lg">
      {/* Destination Input */}
      <div className="bg-white p-2 rounded-lg w-full sm:w-64 h-12 flex text-center items-center justify-center gap-2">
        <TruckIcon className="w-4 h-4" /> Where Are You Going?
      </div>
      {/* Date Input */}
      <div className="bg-white p-2 rounded-lg w-full sm:w-64 h-12 flex text-center items-center justify-center gap-2">
        <CalendarIcon className="w-4 h-4" /> CheckIn - CheckOut
      </div>
      {/* Empty Div (For Future Use) */}
      <div className="relative w-full sm:w-64">
        <div
          className="bg-white p-2 rounded-lg w-full h-12 flex text-center items-center justify-center gap-2"
          onClick={() => setShowBox(!showBox)}
        >
          <UserIcon className="w-4 h-4" />
          <span>
            {guestCount.adult} adult - {guestCount.child} child -{" "}
            {guestCount.room} room
          </span>
          {showBox ? (
            <ChevronUpIcon className="w-4 h-4" />
          ) : (
            <ChevronDownIcon className="w-4 h-4" />
          )}
        </div>

        {showBox && (
          <div className="absolute w-full rounded-lg mt-1">
            <GuestBox />
          </div>
        )}
      </div>
      {/* Search Button */}
      <button className="bg-blue-600 p-2 rounded-lg w-full sm:w-20 h-12 text-white">
        Search
      </button>
    </div>
  );
};

export default RoomSearch;
