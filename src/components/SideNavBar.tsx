/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import NavBarMenu from './NavBarMenu';
import { Link } from 'react-router-dom';

export default function SideNavBar() {
	return (
		<header css={headerCss}>
			<div css={logoWrapCss}>
				<h1>
					<Link to={'/'}>
						<img src="/img/logo.png" alt="천지얌 로고" />
					</Link>
				</h1>
			</div>
			<NavBarMenu />
		</header>
	);
}

const headerCss = css`
	position: fixed;
	top: 0;
	left: 0;
	width: 180px;
	padding: 40px 25px 0;
	box-sizing: border-box;
	z-index: 11;
`;

const logoWrapCss = css`
	margin-bottom: 80px;
	text-align: center;
`;
