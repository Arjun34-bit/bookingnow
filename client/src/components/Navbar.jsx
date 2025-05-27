import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DropDown from "../miscellenous/DropDown";
import { openModal } from "../redux/authReducer";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Navbar = () => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  const [selectedLocation, setSelectedLocation] = useState("");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleModal = (e) => {
    e.preventDefault();
    dispatch(openModal(!user?.loading));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLocation = (e) => {
    e.preventDefault();
    setSelectedLocation(e.target.value);
  };

  localStorage.setItem("cityLocation", selectedLocation);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          BookNow.com
        </Link>

        {/* Desktop Menu */}
        <ul className="p-1 hidden md:flex space-x-6">
          <li>INR</li>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmHqUFx4yBWukSFU98PfOvQaSbIoVjgSz6tA&s"
            className="rounded-full w-6 h-6 object-cover"
          />
          <li>
            <Link to="/my-cart" className="p-1 hover:text-gray-300">
              🛒Cart
            </Link>
          </li>
          <li>
            <Link
              to="/vendor"
              className="p-1 hover:text-gray-300"
              target="_blank"
            >
              List Your Property
            </Link>
          </li>
          <li>
            <select
              name="city"
              id="city"
              className="text-black w-32 p-1 rounded-lg"
              onChange={handleLocation}
            >
              <option value="delhi">Delhi</option>
              <option value="mumbai">Mumbai</option>
              <option value="bangalore">Bangalore</option>
              <option value="chennai">Chennai</option>
            </select>
          </li>
          {user?.user?.role ? (
            <DropDown />
          ) : (
            <>
              <li
                className="p-1 bg-white text-black border rounded hover:text-gray-300 cursor-pointer"
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
        <button className="md:hidden text-2xl" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-4 p-4 bg-blue-700 text-white">
          <li>INR</li>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmHqUFx4yBWukSFU98PfOvQaSbIoVjgSz6tA&s"
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
                className="p-1 bg-white text-black border rounded hover:text-gray-300 cursor-pointer"
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
      )}
    </nav>
  );
};

export default Navbar;
