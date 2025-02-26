import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DropDown from "../miscellenous/DropDown";
import { openModal } from "../redux/authReducer";
import { useEffect } from "react";

import Cookies from "js-cookie";

const Navbar = () => {
  const user = useSelector((state) => state?.user);

  const dispatch = useDispatch();

  const handleModal = (e) => {
    e.preventDefault();
    dispatch(openModal(!user?.loading));
  };

  useEffect(() => {
    // const userInfo = JSON.parse(localStorage.getItem("userDetails"));
    // if (userInfo) {
    //   console.log(userInfo);
    // }
  }, []);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          BookingNow.com
        </Link>
        <ul className="p-1 hidden md:flex space-x-6">
          <li>INR</li>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmHqUFx4yBWukSFU98PfOvQaSbIoVjgSz6tA&s"
            // height={1}
            // width={25}
            className="rounded-full w-6 h-6 object-cover"
          />
          <li>
            <Link to="/vendor" className="p-1 hover:text-gray-300">
              List Your Property
            </Link>
          </li>
          {user?.user?.role ? (
            <DropDown />
          ) : (
            <>
              <li
                className="p-1 bg-white text-black border rounded hover:text-gray-300 cursor"
                onClick={handleModal}
              >
                <Link to="/" className="hover:text-gray-300">
                  Login
                </Link>
              </li>

              <li className="p-1 bg-white text-black border rounded">
                <Link to="/register" className="hover:text-gray-300">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
        {/* Mobile Menu Button */}
        <button className="md:hidden">☰</button>
      </div>
    </nav>
  );
};

export default Navbar;
