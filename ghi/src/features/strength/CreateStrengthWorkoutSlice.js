import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fields: {
    workout_name: "",
    date: "",
    type: "Strength",
    status: "Incomplete",
  },
  errorMessage: null,
};

const strengthSlice = createSlice({
  name: "strengthForm",
  initialState,
  reducers: {
    handleWorkoutNameChange: (state, action) => {
      state.fields.workout_name = action.payload;
    },
    handleDateChange: (state, action) => {
      state.fields.date = action.payload;
    },
    handleStatusChange: (state, action) => {
      state.fields.status = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
  handleWorkoutNameChange,
  handleDateChange,
  handleStatusChange,
  reset,
} = strengthSlice.actions;
export default strengthSlice.reducer;
