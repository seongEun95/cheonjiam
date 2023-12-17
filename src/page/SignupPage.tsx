/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

export default function SignupPage() {
	return <div css={contentCss}>회원가입 페이지</div>;
}

const contentCss = css`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 500px;
`;
