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

export default function Router() {
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
			</Routes>
		</BrowserRouter>
	);
}
