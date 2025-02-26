import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authReducer";
import { useNavigate } from "react-router-dom";

const VendorRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state?.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password, role: "vendor" }));
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-600">Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded focus:outline-blue-500"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        onClick={handleSubmit}
      >
        Register
      </button>
    </form>
  );
};

export default VendorRegister;
