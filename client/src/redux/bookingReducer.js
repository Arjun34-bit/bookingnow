import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../constants/constants";

export const createBooking = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    const { data } = await axios.post(
      `${URL}/bookings/create/`,
      userData,
      config
    );
    console.log(data);
    dispatch(setBooking(data));
    dispatch(setLoading(false));
  } catch (error) {
    alert({ Error: error.response?.data?.message });
    dispatch(
      setError(error.response?.data?.message || "Listing Fetching Failed")
    );
    dispatch(setLoading(false));
  }
};

export const getBookingByUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    const { data } = await axios.get(`${URL}/bookings/user/`, config);
    dispatch(setBookings(data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Listing Fetching Failed")
    );
    dispatch(setLoading(false));
  }
};

export const cancelBooking = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const config = {
      headers: {
        Authorization: `Bearer ${userData?.token}`,
      },
    };
    const { data } = await axios.put(
      `${URL}/bookings/cancel/${userData?.bookingId}`,
      {},
      config
    );
    dispatch(setBookings(data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Listing Fetching Failed")
    );
    dispatch(setLoading(false));
  }
};

export const changeBookingStatus = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    const { data } = await axios.get(
      `${URL}/bookings/change/`,
      userData,
      config
    );
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Listing Fetching Failed")
    );
    dispatch(setLoading(false));
  }
};

export const getAllBookingVendor = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const config = {
      headers: {
        Authorization: `Bearer ${userData?.token}`,
      },
    };
    const { data } = await axios.post(`${URL}/bookings/`, {}, config);
    dispatch(setBookings(data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Listing Fetching Failed")
    );
    dispatch(setLoading(false));
  }
};

const bookingSlice = createSlice({
  name: "listing",
  initialState: {
    booking: [],
    bookings: [],
    vendorBookings: [],
    loading: false,
    error: null,
  },
  reducers: {
    setVendorBooking: (state, action) => {
      state.vendorBookings = action.payload;
      state.error = null;
    },
    setBooking: (state, action) => {
      state.booking = action.payload;
      state.error = null;
    },
    setBookings: (state, action) => {
      state.bookings = action.payload;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setBookings,
  setBooking,
  setLoading,
  setError,
  setVendorBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
