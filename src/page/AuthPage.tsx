/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

export default function AuthPage() {
	return (
		<div>
			회원페이지
			<div>
				<Outlet />
			</div>
		</div>
	);
}
