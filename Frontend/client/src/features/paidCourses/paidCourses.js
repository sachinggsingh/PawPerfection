import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Async thunk to fetch paid courses
export const getAllPaidCourses = createAsyncThunk(
  "paidCourses/getAllPaidCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/payments/user-payments");
      const data = response.data;

      if (Array.isArray(data?.trainingPrograms)) {
        return data.trainingPrograms;
      }

      throw new Error(
        "Unexpected response structure: " + JSON.stringify(data)
      );
    } catch (error) {
      console.error("Fetch Error:", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch courses"
      );
    }
  }
);

const paidCourseSlice = createSlice({
  name: "paidCourses",
  initialState: {
    courses: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetPaidCourses: (state) => {
      state.courses = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPaidCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPaidCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(getAllPaidCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetPaidCourses } = paidCourseSlice.actions;
export default paidCourseSlice.reducer;
