/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

export default function AuthPage() {
	return (
		<div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}
