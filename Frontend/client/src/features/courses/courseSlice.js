import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Async thunk to fetch courses
export const fetchCourses = createAsyncThunk(
  "courses/getAllCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/training/course");
      const data = response.data;

      if (Array.isArray(data?.trainingPrograms)) {
        return data.trainingPrograms;
      }

      throw new Error("Unexpected response structure: " + JSON.stringify(data));
    } catch (error) {
      console.error("Fetch Error:", error);
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch courses");
    }
  }
);


// Redux slice
const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCourses: (state) => {
      state.courses = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload || [];
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.courses = [];
        state.error = action.payload || "Unknown error occurred";
      });
  },
});

export const { clearCourses } = courseSlice.actions;
export default courseSlice.reducer;
