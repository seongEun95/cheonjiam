/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

export default function Footer() {
	return (
		<div css={footerWrapCss}>
			<h2>footer area</h2>
		</div>
	);
}

const footerWrapCss = css`
	padding: 30px 0;
	text-align: center;
	border-top: 1px solid #ccc;
`;
