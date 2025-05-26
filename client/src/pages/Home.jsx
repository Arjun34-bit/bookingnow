import { Link, useLocation, useParams } from "react-router-dom";
import Swipers from "../Swiper/Swiper";
import Model from "../Model/Model";
import { useEffect, useState } from "react";
import {
  BuildingOfficeIcon,
  HomeModernIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/authReducer";
import RoomSearch from "../miscellenous/RoomSearch";
import TrendingContainer from "../components/TrendingCard";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <Swipers />
      <div className="absolute flex justify-center items-center w-full px-4 z-10 left-1/2 transform -translate-x-1/2 top-[470px]">
        <RoomSearch />
      </div>

      {/* Modal Section */}
      {user?.modal === true ? (
        <div className="absolute">
          <div className="relative">
            <Model />
          </div>
        </div>
      ) : (
        ""
      )}

      {/* Booking Showcase */}
      <div className="@apply flex justify-center items-center gap-4 mt-2">
        <div className="p-1 bg-blue-500 text-white rounded-[10%] @apply flex gap-1">
          <HomeModernIcon className="w-4 h-4 mt-1" />
          <Link to="/listing?type=hotel" className="">
            Hotels
          </Link>
        </div>
        <div className="p-1 bg-blue-500 text-white rounded-[10%] @apply flex gap-1">
          <BuildingOfficeIcon className="w-4 h-4 mt-1" />
          <Link to="/listing?type=restaurants" className="">
            Restaurants
          </Link>
        </div>
        <div className="p-1 bg-blue-500 text-white rounded-[10%] @apply flex gap-1">
          <TableCellsIcon className="w-4 h-4 mt-1" />
          <Link to="/hostels" className="">
            Hostels
          </Link>
        </div>
      </div>

      <div className="mt-2 mb-2">
        <TrendingContainer />
      </div>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Best Deals</h3>
            <p>We provide the best hotel & restaurant deals with discounts.</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
            <p>All hotels and restaurants are verified for quality service.</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p>
              Book your favorite places with a simple and user-friendly process.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12">
        <h2 className="text-2xl font-semibold">Ready to Book?</h2>
        {user?.user ? (
          <Link
            to="/listing"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Find Hotels
          </Link>
        ) : (
          <Link
            to="/"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
            onClick={() => dispatch(openModal())}
          >
            Find Hotels
          </Link>
        )}
      </section>
    </div>
  );
};

export default Home;
