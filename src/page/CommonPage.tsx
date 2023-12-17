/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserMenu from '../components/UserMenu';

export default function CommonPage() {
	return (
		<div css={commonWrapCss}>
			<Header />
			<UserMenu />
			<Outlet />
			<Footer />
		</div>
	);
}

const commonWrapCss = css`
	padding: 0 0 0 222px;
`;
