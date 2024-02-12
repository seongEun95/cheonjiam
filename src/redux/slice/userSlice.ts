import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type User = {
	user: {
		id: number;
		email: string;
		createdAt: Date;
		updatedAt: Date;
	};
};

const initialState: User = {
	user: {
		id: 0,
		email: '',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload.user;
		},

		resetUser: state => {
			state.user = initialState.user;
		},
	},
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
