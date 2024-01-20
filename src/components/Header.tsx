/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Link } from 'react-router-dom';
import userMenuData from '../data/userMenuData.json';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function Header() {
	const cartItems = useSelector((state: RootState) => state.cart.items);

	return (
		<ul css={userMenuWrapCss}>
			{userMenuData.map((icon, index) => (
				<li key={index} css={iconListCss}>
					{icon.to === '/cart' && <span css={cartItemsLengthCss}>{cartItems.length}</span>}
					<Link to={icon.to}>
						<img src={icon.imgSrc} alt={icon.alt} />
					</Link>
				</li>
			))}
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
