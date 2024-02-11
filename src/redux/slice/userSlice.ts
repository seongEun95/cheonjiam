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
			const { id, email, createdAt, updatedAt } = action.payload.user;
			state.user.id = id;
			state.user.email = email;
			state.user.createdAt = createdAt;
			state.user.updatedAt = updatedAt;
		},

		resetUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload.user;
		},
	},
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
