import { createSlice } from "@reduxjs/toolkit";
import { URL1 } from "../constants/constants";

export const notifyMe = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post(`${URL1}/api/notify`, userData);
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(
      setError(error?.response?.data?.message || "Notification Request Failed")
    );

    dispatch(setLoading(false));
  }
};

const notifiSlice = createSlice({
  name: "notify",
  initialState: {
    notify: "",
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setError } = notifiSlice.actions;

export default notifiSlice.reducer;
