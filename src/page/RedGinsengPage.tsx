/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

export default function RedGinsengPage() {
	return <div css={contentCss}>홍삼 페이지</div>;
}

const contentCss = css`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 500px;
`;
