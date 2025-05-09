import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../util/api";


// Login
export const login = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
    try {
        const response = await api.post("/auth/login", data);
        if(response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Login failed");
    }
});

// Register
export const register = createAsyncThunk("auth/register", async (data, { rejectWithValue }) => {
    try {
        const response = await api.post("/auth/register", data);
        if(response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Registration failed");
    }
});

// Logout
export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        const response = await api.post("/auth/logout");
        if(response.data.token) {
            localStorage.removeItem("token", response.data.token);
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Logout failed");
    }
});


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        error: null,
        loading: false,
    },
    reducers: {
        clearAuth: (state) => {
            state.user = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                // state.status = "loading";
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                // state.status = "succeeded";
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                // state.status = "failed";
                state.error = action.payload || action.error.message;
                state.user = null; 
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                // state.status = "loading";
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                // state.status = "succeeded";
                state.user = action.payload.user;
                state.token = action.payload.token;
                // localStorage.setItem("user", JSON.stringify(action.payload.user));
                // localStorage.setItem("token", action.payload.token);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                // state.status = "failed";
                state.error = action.payload || action.error.message;
                state.user = null;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
                // state.status = "loading";
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                // state.status = "succeeded";
                state.user = null;
                state.token = null;
                // localStorage.removeItem("user");
                // localStorage.removeItem("token");
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                // state.status = "failed";
                state.error = action.payload || action.error.message;
                state.user = null;
            });
    },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
