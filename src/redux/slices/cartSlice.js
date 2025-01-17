import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: []
}

const cartSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }

            state.totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.count), 0);
        },
        minusItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);

            if (findItem) {
                findItem.count--;
            }
            state.totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.count), 0);
        },
        removeItem(state, action) {
            state.items = state.items.filter((obj) => obj.id !== action.payload.id);

            state.totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.count), 0);
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0;
        }
    }
})

export const selectCart = state => state.cart
export const selectCartItemById = (id) => state => state.cart.items.find((item) => item.id === id)

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer