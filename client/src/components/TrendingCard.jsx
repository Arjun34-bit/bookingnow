import React, { useState } from "react";
import ListingCard from "../miscellenous/ListingCard";

const TrendingContainer = () => {
  const selectedCity = localStorage.getItem("cityLocation");
  console.log(selectedCity);
  const [dummyListing, setDummyListing] = useState([
    {
      vendorId: "60d21b4667d0d8992e610c85", // Replace with a real Vendor _id from your DB
      type: "hotel",
      name: "Sunrise Residency",
      address: "123 Ocean View Road, Sector 21",
      city: "Goa",
      contact: 9876543210,
      description: "A luxurious beachfront hotel with all modern amenities.",
      facilities: [
        "WiFi",
        "Pool",
        "Parking",
        "Spa",
        "Gym",
        "Breakfast Included",
      ],
      startingPrice: 2500,
      images:
        "https://www.shutterstock.com/image-photo/le-parc-hotel-bagnolesdelorne-normandy-260nw-2342456027.jpg",
      approved: true,
      offers: "Summer Special 15% Off",
      percentage: 15,
      trending: true,
      timeout: {
        checkIn: "12:00 PM",
        checkOut: "11:00 AM",
      },
      nearByes: {
        landmark: "Calangute Beach",
        distance: 0.5,
      },
      petAccomodation: true,
    },
    {
      vendorId: "60d21b4667d0d8992e610c85", // Replace with a real Vendor _id from your DB
      type: "hotel",
      name: "Sunrise Residency",
      address: "123 Ocean View Road, Sector 21",
      city: "Goa",
      contact: 9876543210,
      description: "A luxurious beachfront hotel with all modern amenities.",
      facilities: [
        "WiFi",
        "Pool",
        "Parking",
        "Spa",
        "Gym",
        "Breakfast Included",
      ],
      startingPrice: 2500,
      images:
        "https://www.shutterstock.com/image-photo/le-parc-hotel-bagnolesdelorne-normandy-260nw-2342456027.jpg",
      approved: true,
      offers: "Summer Special 15% Off",
      percentage: 15,
      trending: true,
      timeout: {
        checkIn: "12:00 PM",
        checkOut: "11:00 AM",
      },
      nearByes: {
        landmark: "Calangute Beach",
        distance: 0.5,
      },
      petAccomodation: true,
    },
    {
      vendorId: "60d21b4667d0d8992e610c85", // Replace with a real Vendor _id from your DB
      type: "hotel",
      name: "Sunrise Residency",
      address: "123 Ocean View Road, Sector 21",
      city: "Goa",
      contact: 9876543210,
      description: "A luxurious beachfront hotel with all modern amenities.",
      facilities: [
        "WiFi",
        "Pool",
        "Parking",
        "Spa",
        "Gym",
        "Breakfast Included",
      ],
      startingPrice: 2500,
      images:
        "https://www.shutterstock.com/image-photo/le-parc-hotel-bagnolesdelorne-normandy-260nw-2342456027.jpg",
      approved: true,
      offers: "Summer Special 15% Off",
      percentage: 15,
      trending: true,
      timeout: {
        checkIn: "12:00 PM",
        checkOut: "11:00 AM",
      },
      nearByes: {
        landmark: "Calangute Beach",
        distance: 0.5,
      },
      petAccomodation: true,
    },
  ]);

  return (
    <>
      <div className="flex justify-center  items-center p-2">
        <h3 className="font-semibold text-xl">HOTELS NEAR YOU</h3>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 py-4 px-8">
        {dummyListing.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </>
  );
};

export default TrendingContainer;
