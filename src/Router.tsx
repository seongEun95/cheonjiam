import { Route, Routes, BrowserRouter } from 'react-router-dom';
import RedGinsengPage from './page/RedGinsengPage';
import AuthPage from './page/AuthPage';
import MainPage from './page/MainPage';
import SigninPage from './page/SigninPage';
import SignupPage from './page/SignupPage';
import InquiryPage from './page/InquiryPage';
import CartPage from './page/CartPage';
import DetailPage from './page/DetailPage';
import CommonPage from './page/CommonPage';
import TestPage from './page/TestPage';
import { Modal } from './components/ui/Modal';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { showModal } from './redux/slice/modalSlice';

export default function Router() {
	const dispatch = useDispatch();
	const { isShow, title, content, onConfirm } = useSelector((state: RootState) => state.modal.modal);

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<CommonPage />}>
					<Route path="/" element={<MainPage />}></Route>
					<Route path="/red_ginseng" element={<RedGinsengPage />}></Route>
					<Route path="/red_ginseng/:id" element={<DetailPage />} />
					<Route path="/auth" element={<AuthPage />}>
						<Route path="signin" element={<SigninPage />} />
						<Route path="signup" element={<SignupPage />} />
					</Route>
					<Route path="/inquiry" element={<InquiryPage />} />
					<Route path="/cart" element={<CartPage />} />
				</Route>

				<Route path="/test" element={<TestPage />}></Route>
			</Routes>

			<Modal isShow={isShow} modalTitle={title} onConfirm={onConfirm} onClose={() => dispatch(showModal(false))}>
				{content}
			</Modal>
		</BrowserRouter>
	);
}
