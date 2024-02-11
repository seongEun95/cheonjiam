import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import countSlice from './slice/countSlice';
import cartSlice from './slice/cartSlice';
import modalSlice from './slice/modalSlice';
import userSlice from './slice/userSlice';

const middlewares = [];
if (process.env.NODE_ENV === 'development') middlewares.push(logger);

const store = configureStore({
	reducer: {
		count: countSlice,
		cart: cartSlice,
		modal: modalSlice,
		user: userSlice,
	},
	middleware: middlewares,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
