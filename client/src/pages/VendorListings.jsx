import React, { useState } from "react";
import ListingFormModal from "../components/ListingFormModal";
import ListingTable from "../components/ListingTable";
import { useDispatch, useSelector } from "react-redux";
import { createListing } from "../redux/listingReducer";
import LoadingBar from "../miscellenous/Loading";

const VendorListing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchListing, setFetchListing] = useState(false);

  const listings = useSelector((state) => state?.listing?.loading);

  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    dispatch(createListing(data));
    setIsModalOpen(false);
    setFetchListing(!fetchListing);
  };

  return (
    <>
      {listings ? <LoadingBar /> : ""}
      <div className="p-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Listing+
        </button>

        {/* Modal */}
        <ListingFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      </div>
      <ListingTable fetchListing={fetchListing} />
    </>
  );
};

export default VendorListing;
