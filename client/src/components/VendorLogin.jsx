import { useState } from "react";
import { loginUser } from "../redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const VendorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state) => state?.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password, role: "vendor" }));
    if (!user?.user || !user?.error) {
      alert(user?.error || "Something Went Wrong");
    } else {
      navigate("/vendor/home");
    }
  };
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-gray-600">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded focus:outline-blue-500"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-600">Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded focus:outline-blue-500"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Login
      </button>
    </form>
  );
};

export default VendorLogin;
