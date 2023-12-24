import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface countState {
	count: number;
}
const initialState: countState = {
	count: 0,
};

const countSlice = createSlice({
	name: 'count',
	initialState,
	reducers: {
		plusCount(state, action: PayloadAction<number>) {
			state.count = action.payload + 1;
		},
	},
});

export const { plusCount } = countSlice.actions;
export default countSlice.reducer;
