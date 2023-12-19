import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import countSlice from './slice/countSlice';

const middlewares = [];
if (process.env.NODE_ENV === 'development') middlewares.push(logger);

const store = configureStore({
	reducer: {
		count: countSlice,
	},
	middleware: middlewares,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
