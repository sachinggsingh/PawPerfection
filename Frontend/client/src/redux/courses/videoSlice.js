import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../util/api";

export const fetchVideo = createAsyncThunk("video/getVideo", async (id, {rejectWithValue}) => {
    try {
        const response = await api.get('/video/show');
        console.log(response.data.videos);
        const data = response.data.videos;
        return data;
    } catch (error) {
        console.error("Fetch Error:", error);
        return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch video");
    }
});


export const videoSlice = createSlice({
    name: "video",
    initialState: {
        video: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVideo.fulfilled, (state, action) => {
                state.loading = false;
                state.video = action.payload || [];
            })
            .addCase(fetchVideo.rejected, (state, action) => {
                state.loading = false;
                state.video = [];
                state.error = action.payload || "Unknown error occurred";
            });
    }
    }
);

export default videoSlice.reducer;
