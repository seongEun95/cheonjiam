/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

export default function CartPage() {
	return <div css={contentCss}>카트 페이지</div>;
}

const contentCss = css`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 500px;
`;
