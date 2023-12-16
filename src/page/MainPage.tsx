/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

export default function MainPage() {
	return <div css={mainWrapCss}>메인페이지</div>;
}

const mainWrapCss = css`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 1000px;
	background-color: #f9f9f9;
`;
