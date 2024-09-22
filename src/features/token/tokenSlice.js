import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
    isSet: false
};

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        set: (state, action) => {
            state.value = action.payload;
            state.isSet = true;
        },
        unset: (state) => {
            state.value = null;
            state.isSet = false;
        }
    }
});

export const { setToken, unsetToken } = tokenSlice.actions;
export default tokenSlice.reducer;
