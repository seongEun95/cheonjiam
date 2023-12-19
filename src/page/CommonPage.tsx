/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import { Outlet } from 'react-router-dom';
import SideNavBar from '../components/SideNavBar';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function CommonPage() {
	return (
		<div css={commonWrapCss}>
			<SideNavBar />
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
}

const commonWrapCss = css`
	padding: 0 0 0 180px;
`;
