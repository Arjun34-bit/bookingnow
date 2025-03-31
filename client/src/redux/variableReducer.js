import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../constants/constants";
import Cookies from "js-cookie";

const variableSlice = createSlice({
  name: "variables",
  initialState: {
    count: 0,
    bookingDates: {
      checkIn: "",
      checkOut: "",
    },
    bookingDetails: {},
  },
  reducers: {
    setCount: (state, action) => {
      if (action.payload === "add") {
        state.count += 1;
      } else if (action.payload === "sub" && state.count > 0) {
        state.count -= 1;
      }
    },
    setBookingDetails: (state, action) => {
      state.bookingDetails = action.payload;
    },
    setBookingDates: (state, action) => {
      state.bookingDates = action.payload;
    },
  },
});

export const { setBookingDetails, setCount, setBookingDates } =
  variableSlice.actions;

export default variableSlice.reducer;
