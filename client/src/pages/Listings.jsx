import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getAllListings, getListingsByUser } from "../redux/listingReducer";
import ListingCard from "../miscellenous/ListingCard";
import FilterBar from "../miscellenous/FilterBar";
import SearchBar from "../miscellenous/SearchBar";
import LoadingBar from "../miscellenous/Loading";

const Listings = () => {
  const location = useLocation();
  const query = location?.search;

  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");

  const dispatch = useDispatch();

  useEffect(() => {
    if (query === "") {
      dispatch(getAllListings());
    } else {
      dispatch(getListingsByUser({ query }));
    }
  }, [query, dispatch]);

  const listings = useSelector((state) => state?.listing?.listing);

  const loading = useSelector((state) => state?.listing?.loading);

  console.log(loading);

  return (
    <>
      {loading ? <LoadingBar /> : ""}

      <div className="container mx-auto">
        {/* Filters */}
        <FilterBar />
        <SearchBar />
      </div>

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-6">
          Available Listings
        </h1>
        {listings?.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        ) : (
          // Display message if listings are empty
          <div className="text-center text-gray-500 mt-10 text-lg">
            {type === "hotel"
              ? "No hotels found for your search."
              : type === "restaurants"
              ? "No restaurants found for your search."
              : "No listings found. Please adjust your filters."}
          </div>
        )}
      </div>
    </>
  );
};

export default Listings;
