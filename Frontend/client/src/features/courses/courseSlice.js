import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Async thunk to fetch courses
export const fetchCourses = createAsyncThunk(
  "courses/getAllCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/training/courses");
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

// Async thunk to fetch individual course
export const fetchCourseById = createAsyncThunk(
  "courses/getCourseById",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/training/courses/${courseId}`);
      const data = response.data;

      if (data?.trainingProgram) {
        return data.trainingProgram;
      }

      throw new Error("Unexpected response structure: " + JSON.stringify(data));
    } catch (error) {
      console.error("Fetch Course Error:", error);
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch course");
    }
  }
);


// Redux slice
const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    currentCourse: null,
    loading: false,
    courseLoading: false,
    error: null,
  },
  reducers: {
    clearCourses: (state) => {
      state.courses = [];
      state.currentCourse = null;
      state.error = null;
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
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
      })
      .addCase(fetchCourseById.pending, (state) => {
        state.courseLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.courseLoading = false;
        state.currentCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.courseLoading = false;
        state.currentCourse = null;
        state.error = action.payload || "Failed to fetch course";
      });
  },
});

export const { clearCourses, clearCurrentCourse } = courseSlice.actions;
export default courseSlice.reducer;
