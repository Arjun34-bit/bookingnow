import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../constants/constants";
import Cookies from "js-cookie";

// Async function for login
export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post(`${URL}/auth/login`, userData);
    // const { data } = await fetchData({
    //   url: `${URL}/auth/login`,
    //   method: "post",
    //   data: userData,
    // });
    dispatch(setUser(data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error?.response?.data?.message || "Login failed"));
    dispatch(setLoading(false));
  }
};

// Async function for registration
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post(`${URL}/auth/register`, userData);
    dispatch(setUser(data));
    dispatch(setLoading(false));
    alert("User Registered");
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Registration failed"));
    dispatch(setLoading(false));
  }
};

// Logout function
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("userDetails");
  dispatch(logout());
};

export const openModal = () => (dispatch) => {
  dispatch(showModal());
};

export const getUser = () => {};

const storedUser = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails"))
  : [];

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: storedUser,
    loading: false,
    error: null,
    modal: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userDetails", JSON.stringify(action.payload));
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
    showModal: (state) => {
      state.modal = !state.modal;
    },
  },
});

export const { setUser, setLoading, setError, logout, showModal } =
  userSlice.actions;

export default userSlice.reducer;
