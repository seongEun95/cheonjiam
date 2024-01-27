import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/Product.type';

export type Cart = {
	id: number;
	isChecked: boolean;
	product: Product;
	productCount: number;
};

export type CartList = Cart[];

type CartState = {
	items: CartList;
};

const initialState: CartState = {
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItems: (state, action: PayloadAction<Cart>) => {
			const newItem = action.payload;
			const isItemExist = state.items.find(item => item.id === newItem.id);
			if (!isItemExist) {
				state.items.push(newItem);
			} else {
				const { id } = action.payload;
				const findItem = state.items.find(item => item.id === id);

				if (findItem) {
					findItem.productCount += 1;
				}
			}
		},

		removeItems: (state, action: PayloadAction<number>) => {
			const id = action.payload;
			state.items = state.items.filter(item => item.id !== id);
		},

		plusProductCount: (state, action: PayloadAction<number>) => {
			const id = action.payload;
			const findItem = state.items.find(item => item.id === id);

			if (findItem) {
				findItem.productCount += 1;
			}
		},

		minusProductCount: (state, action: PayloadAction<number>) => {
			const id = action.payload;
			const findItem = state.items.find(item => item.id === id);

			if (findItem && findItem.productCount > 1) {
				findItem.productCount -= 1;
			}
		},

		isCheckedChange: (state, action: PayloadAction<number>) => {
			const id = action.payload;
			const findItem = state.items.find(item => item.id === id);

			if (findItem) {
				findItem.isChecked = !findItem.isChecked;
			}
		},
	},
});

export const { addItems, removeItems, plusProductCount, minusProductCount, isCheckedChange } = cartSlice.actions;
export default cartSlice.reducer;
