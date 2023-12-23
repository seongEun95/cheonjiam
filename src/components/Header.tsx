/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Link } from 'react-router-dom';
import userMenuData from '../data/userMenuData.json';

export default function UserMenu() {
	return (
		<ul css={userMenuWrapCss}>
			{userMenuData.map((icon, index) => (
				<li key={index}>
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
