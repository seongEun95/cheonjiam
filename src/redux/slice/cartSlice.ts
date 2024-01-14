import { createSlice } from '@reduxjs/toolkit';

interface cart {
	items: string[];
}

const initialState: cart = {
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItems: (state, action) => {
			state.items.push(action.payload);
		},

		removeItems: (state, action) => {
			state.items = state.items.filter((item: any) => item.id !== action.payload.id);
		},
	},
});

export const { addItems, removeItems } = cartSlice.actions;
export default cartSlice.reducer;
