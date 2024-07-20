import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPhones = createAsyncThunk('phones/fetchPhonesStatus', async ({ currentPage, category, sort, search, thunkApi }) => {
    try {
        const { data } = await axios.get(`https://668fde68c0a7969efd99e538.mockapi.io/phones?page=${currentPage}&limit=4&${category}&sortBy=${sort.sort}&order=desc${search}`);
        if (data.length === 0) {
            return thunkApi.rejectWithValue("Empty phones");
        }
        return data;
    } catch (error) {
        console.error("Error fetching phones:", error);
        return []
    }
});

const initialState = {
    items: [],
    status: ''
}

const phonesSlice = createSlice({
    name: "phones",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPhones.pending, (state) => {
                state.status = 'loading';
                state.items = [];
            })
            .addCase(fetchPhones.fulfilled, (state, action) => {
                state.status = 'success';
                state.items = action.payload;
            })
            .addCase(fetchPhones.rejected, (state) => {
                state.status = 'error';
                state.items = [];
            })
    }
})

export const selectPizzaData = (state) => state.phones;

export const {} = phonesSlice.actions;

export default phonesSlice.reducer