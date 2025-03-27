import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../constants/constants";

export const createUnit = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userData?.token}`,
      },
    };
    const { data } = await axios.post(`${URL}/units/create/`, userData, config);
    dispatch(setUnits(data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Listing Fetching Failed")
    );
    dispatch(setLoading(false));
  }
};

export const getUnitByListing = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.get(`${URL}/units/${userData}`);
    dispatch(setUnits(data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Listing Fetching Failed")
    );
    dispatch(setLoading(false));
  }
};

export const getUnitById = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.get(`${URL}/units/getUnit/${userData}`);
    console.log(data);
    dispatch(setUnit(data));
    dispatch(setLoading(true));
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Listing Fetching Failed")
    );
    dispatch(setLoading(false));
  }
};

const unitSlice = createSlice({
  name: "listing",
  initialState: { units: [], unit: [], loading: false, error: null },
  reducers: {
    setUnits: (state, action) => {
      state.units = action.payload;
      state.error = null;
    },
    setUnit: (state, action) => {
      state.unit = action.payload;
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

export const { setUnits, setUnit, setLoading, setError } = unitSlice.actions;

export default unitSlice.reducer;
