/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Link } from 'react-router-dom';
import userMenuData from '../data/userMenuData.json';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function Header() {
	const cartItems = useSelector((state: RootState) => state.cart.items);
	const userInfo = useSelector((state: RootState) => state.user.user);
	const isLoggedIn = userInfo.id !== 0;

	return (
		<div>
			<ul css={userMenuWrapCss}>
				{isLoggedIn && <li>{`안녕하세요 ${userInfo.email.split('@')[0]}님`}</li>}
				{userMenuData.map((icon, index) => {
					const newUrl = isLoggedIn && index === 0 ? '/profile' : icon.to;

					return (
						<li key={index} css={iconListCss}>
							{icon.to === '/cart' && <span css={cartItemsLengthCss}>{cartItems.length}</span>}
							<Link to={newUrl}>
								<img src={icon.imgSrc} alt={icon.alt} />
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

const userMenuWrapCss = css`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 22px;
	width: 100%;
	padding: 30px;
	background-color: #fff;
`;

const iconListCss = css`
	position: relative;
`;

const cartItemsLengthCss = css`
	position: absolute;
	top: -10px;
	right: -10px;
	width: 20px;
	height: 20px;
	text-align: center;
	line-height: 20px;
	color: #fff;
	background-color: #d53147;
	border-radius: 100%;
`;
