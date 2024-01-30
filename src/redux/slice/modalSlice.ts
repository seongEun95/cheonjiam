import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ModalState {
	modal: {
		isShow: boolean;
		title: string;
		content: string;
		onConfirm: (() => void) | undefined; // 함수를 반환할 수 있고 undefined를 반환할 수도 있다. 명시성 & 타입안정성
	};
}

const initialState: ModalState = {
	modal: {
		isShow: false,
		title: '제목입니다.',
		content: '이것은 팝업 입니다.',
		onConfirm: undefined,
	},
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		showModal(state, action: PayloadAction<boolean>) {
			state.modal.isShow = action.payload;
		},
		titleChangeModal(state, action: PayloadAction<string>) {
			state.modal.title = action.payload;
		},
		contentChangeModal(state, action: PayloadAction<string>) {
			state.modal.content = action.payload;
		},
		confirmModal(state, action: PayloadAction<() => void>) {
			state.modal.onConfirm = action.payload;
		},
		resetModal(state) {
			state.modal.isShow = false;
			state.modal.content = '';
			state.modal.onConfirm = undefined;
		},
	},
});

export const { showModal, titleChangeModal, contentChangeModal, confirmModal, resetModal } = modalSlice.actions;
export default modalSlice.reducer;
