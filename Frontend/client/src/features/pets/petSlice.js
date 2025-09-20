import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Async thunk to create a pet
export const createPet = createAsyncThunk(
  "pets/createPet",
  async (petData, { rejectWithValue }) => {
    try {
      const response = await api.post("/pet/pet-profile", petData);
      return response.data;
    } catch (error) {
      console.error("Create Pet Error:", error);
      return rejectWithValue(error.response?.data?.msg || error.message || "Failed to create pet");
    }
  }
);

// Async thunk to fetch all pets for the authenticated user
export const fetchPets = createAsyncThunk(
  "pets/fetchPets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/pet/pets");
      return response.data;
    } catch (error) {
      console.error("Fetch Pets Error:", error);
      return rejectWithValue(error.response?.data?.msg || error.message || "Failed to fetch pets");
    }
  }
);

// Async thunk to fetch a single pet by ID
export const fetchPetById = createAsyncThunk(
  "pets/fetchPetById",
  async (petId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/pet/pet-profile/${petId}`);
      return response.data;
    } catch (error) {
      console.error("Fetch Pet Error:", error);
      return rejectWithValue(error.response?.data?.msg || error.message || "Failed to fetch pet");
    }
  }
);

// Async thunk to update a pet
export const updatePet = createAsyncThunk(
  "pets/updatePet",
  async ({ petId, petData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/pet/pet-profile/${petId}`, petData);
      return response.data;
    } catch (error) {
      console.error("Update Pet Error:", error);
      return rejectWithValue(error.response?.data?.msg || error.message || "Failed to update pet");
    }
  }
);

// Async thunk to delete a pet
export const deletePet = createAsyncThunk(
  "pets/deletePet",
  async (petId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/pet/pet-profile/${petId}`);
      return { petId, message: response.data.msg };
    } catch (error) {
      console.error("Delete Pet Error:", error);
      return rejectWithValue(error.response?.data?.msg || error.message || "Failed to delete pet");
    }
  }
);

// Redux slice
const petSlice = createSlice({
  name: "pets",
  initialState: {
    pets: [],
    currentPet: null,
    loading: false,
    petLoading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearPets: (state) => {
      state.pets = [];
      state.currentPet = null;
      state.error = null;
      state.success = null;
    },
    clearCurrentPet: (state) => {
      state.currentPet = null;
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
      // Create pet
      .addCase(createPet.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createPet.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.msg || "Pet created successfully";
        if (action.payload.pet) {
          state.pets.push(action.payload.pet);
        }
      })
      .addCase(createPet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create pet";
      })
      // Fetch all pets
      .addCase(fetchPets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = action.payload.pets || [];
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.loading = false;
        state.pets = [];
        state.error = action.payload || "Failed to fetch pets";
      })
      // Fetch pet by ID
      .addCase(fetchPetById.pending, (state) => {
        state.petLoading = true;
        state.error = null;
      })
      .addCase(fetchPetById.fulfilled, (state, action) => {
        state.petLoading = false;
        state.currentPet = action.payload.pet;
      })
      .addCase(fetchPetById.rejected, (state, action) => {
        state.petLoading = false;
        state.currentPet = null;
        state.error = action.payload || "Failed to fetch pet";
      })
      // Update pet
      .addCase(updatePet.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updatePet.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.msg || "Pet updated successfully";
        if (action.payload.pet) {
          const index = state.pets.findIndex(pet => pet._id === action.payload.pet._id);
          if (index !== -1) {
            state.pets[index] = action.payload.pet;
          }
          if (state.currentPet && state.currentPet._id === action.payload.pet._id) {
            state.currentPet = action.payload.pet;
          }
        }
      })
      .addCase(updatePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update pet";
      })
      // Delete pet
      .addCase(deletePet.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deletePet.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message || "Pet deleted successfully";
        state.pets = state.pets.filter(pet => pet._id !== action.payload.petId);
        if (state.currentPet && state.currentPet._id === action.payload.petId) {
          state.currentPet = null;
        }
      })
      .addCase(deletePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete pet";
      });
  },
});

export const { clearPets, clearCurrentPet, clearError, clearSuccess } = petSlice.actions;
export default petSlice.reducer;
