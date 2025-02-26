import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getVendorListing } from "../redux/listingReducer";
import UnitFormModal from "./UnitFormModal";
import { createUnit, getUnitByListing } from "../redux/unitReducer";
import { getUnitCount } from "../helper/countHelper";

const ListingTable = ({ onDeleteListing, onAddUnit, fetchListing }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [unitCounts, setUnitCounts] = useState({});

  const user = useSelector((state) => state?.user?.user);
  const listings = useSelector((state) => state?.listing?.vendorListing);
  const units = useSelector((state) => state?.unit?.units);

  const dispatch = useDispatch();

  const openModal = (listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedListing(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getVendorListing(user?.token));
    // dispatch(getUnitByListing(listings?._id));
  }, []);

  useEffect(() => {
    dispatch(getVendorListing(user?.token));
  }, [fetchListing]);

  const handleSubmit = (data) => {
    dispatch(createUnit(data));
    isModalOpen(false);
    alert("Unit Created Successfully");
  };

  useEffect(() => {
    if (listings?.length > 0) {
      const fetchUnitCounts = async () => {
        const counts = {};
        for (const listing of listings) {
          const units = dispatch(getUnitByListing(listing._id));
          console.log(units.length);
          counts[listing._id] = units.length;
        }
        // console.log(counts);
        setUnitCounts(counts);
      };
      fetchUnitCounts();
    }
  }, [dispatch, listings]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Listings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Starting Price</th>
              <th className="p-3 text-left">No. of Units</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings?.map((listing) => (
              <tr key={listing.id} className="border-b">
                <td className="p-3">{listing.name}</td>
                <td className="p-3">{listing.type}</td>
                <td className="p-3">{listing.address}</td>
                <td className="p-3">{listing.contact}</td>
                <td className="p-3">₹{listing.startingPrice}</td>
                <td className="p-3">{units ? units.length : 0 || 0}</td>
                <td className="p-3 flex justify-center space-x-2">
                  <button
                    onClick={() => openModal(listing)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Add Unit
                  </button>
                  <button
                    onClick={() => onDeleteListing(listing.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete Listing
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Unit Modal */}
      {isModalOpen && (
        <UnitFormModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleSubmit}
          listingId={selectedListing?._id}
        />
      )}
    </div>
  );
};

export default ListingTable;
