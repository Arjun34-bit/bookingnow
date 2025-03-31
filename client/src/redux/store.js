import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import listingReducer from "./listingReducer";
import unitReducer from "./unitReducer";
import bookingReducer from "./bookingReducer";
import variableReducer from "./variableReducer";

export default configureStore({
  reducer: {
    user: authReducer,
    listing: listingReducer,
    unit: unitReducer,
    booking: bookingReducer,
    variable: variableReducer,
  },
});
