/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import NavBarMenu from './NavBarMenu';

export default function SideNavBar() {
	return (
		<header css={headerCss}>
			<div css={logoWrapCss}>
				<h1>
					<a href="/">
						<img src="/img/logo.png" alt="천지얌 로고" />
					</a>
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
`;

const logoWrapCss = css`
	margin-bottom: 80px;
	text-align: center;
`;
