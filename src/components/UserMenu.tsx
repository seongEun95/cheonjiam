/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Link } from 'react-router-dom';

export default function UserMenu() {
	return (
		<ul css={userMenuWrapCss}>
			<li>
				<Link to="/auth/signin">
					<img src={process.env.PUBLIC_URL + '/img/icon-util-login.png'} alt="로그인" />
				</Link>
			</li>
			<li>
				<Link to="/auth/signup">
					<img src={process.env.PUBLIC_URL + '/img/icon-util-join.png'} alt="회원가입" />
				</Link>
			</li>
			<li>
				<Link to="/cart">
					<img src={process.env.PUBLIC_URL + '/img/icon-util-cart.png'} alt="장바구니" />
				</Link>
			</li>
			<li>
				<Link to="/inquiry">
					<img src={process.env.PUBLIC_URL + '/img/icon-util-customer.png'} alt="문의하기" />
				</Link>
			</li>
		</ul>
	);
}

const userMenuWrapCss = css`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 22px;
	padding: 30px;
`;
