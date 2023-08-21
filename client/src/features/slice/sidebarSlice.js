import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
    name: "sidebar",

    initialState: {
        isOpen: false 
    },

    reducers: {
        handleOpen: (state) => {
            state.isOpen = true;
        },

        handleClose: (state) => {
            state.isOpen = false;
        }
    }
});

export const { handleOpen, handleClose } = sidebarSlice.actions;

export default sidebarSlice.reducer;