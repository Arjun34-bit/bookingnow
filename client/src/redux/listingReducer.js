import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../constants/constants";

export const createListing = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const config = {
      headers: {
        Authorization: `Bearer ${userData?.token}`,
      },
    };
    const { data } = await axios.post(
      `${URL}/listing/create`,
      userData,
      config
    );
    // dispatch(setListing(data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Listing Fetching Failed")
    );
    dispatch(setLoading(false));
  }
};

export const getListingsByUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.get(
      `${URL}/listing/search/${userData?.query}`
    );
    dispatch(setListing(data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Listing Fetching Failed")
    );
    dispatch(setLoading(false));
  }
};

export const getAllListings = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.get(`${URL}/listing/`);
    dispatch(setListing(data?.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Listing Fetching Failed")
    );
    dispatch(setLoading(false));
  }
};

export const getVendorListing = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const config = {
      headers: {
        Authorization: `Bearer ${userData}`,
      },
    };
    const { data } = await axios.post(`${URL}/listing/get`, {}, config);
    dispatch(setVendorListing(data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Listing Fetching Failed")
    );
    dispatch(setLoading(false));
  }
};

const listingSlice = createSlice({
  name: "listing",
  initialState: { listing: [], vendorListing: [], loading: false, error: null },
  reducers: {
    setListing: (state, action) => {
      state.listing = action.payload;
      state.error = null;
    },
    setVendorListing: (state, action) => {
      state.vendorListing = action.payload;
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

export const { setListing, setVendorListing, setLoading, setError } =
  listingSlice.actions;

export default listingSlice.reducer;
