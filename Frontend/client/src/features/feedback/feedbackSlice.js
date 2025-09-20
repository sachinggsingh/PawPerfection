import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Async thunk to create feedback
export const createFeedback = createAsyncThunk(
  "feedback/createFeedback",
  async (feedbackData, { rejectWithValue }) => {
    try {
      const response = await api.post("/feedback/message", feedbackData);
      return response.data;
    } catch (error) {
      console.error("Create Feedback Error:", error);
      return rejectWithValue(error.response?.data?.msg || error.message || "Failed to create feedback");
    }
  }
);

// Async thunk to fetch feedbacks by email
export const fetchFeedbacks = createAsyncThunk(
  "feedback/fetchFeedbacks",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.get(`/feedback/message?email=${encodeURIComponent(email)}`);
      return response.data;
    } catch (error) {
      console.error("Fetch Feedbacks Error:", error);
      return rejectWithValue(error.response?.data?.msg || error.message || "Failed to fetch feedbacks");
    }
  }
);

// Redux slice
const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedbacks: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearFeedback: (state) => {
      state.feedbacks = [];
      state.error = null;
      state.success = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create feedback
      .addCase(createFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.msg || "Feedback submitted successfully";
        // Optionally add the new feedback to the list
        if (action.payload.feedBack) {
          state.feedbacks.push(action.payload.feedBack);
        }
      })
      .addCase(createFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to submit feedback";
      })
      // Fetch feedbacks
      .addCase(fetchFeedbacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload.feedBacks || [];
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.feedbacks = [];
        state.error = action.payload || "Failed to fetch feedbacks";
      });
  },
});

export const { clearFeedback, clearError, clearSuccess } = feedbackSlice.actions;
export default feedbackSlice.reducer;
