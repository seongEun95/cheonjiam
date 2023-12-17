/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

export default function SigninPage() {
	return <div css={contentCss}>로그인 페이지</div>;
}

const contentCss = css`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 500px;
`;
