/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

export default function InquiryPage() {
	return <div css={contentCss}>1대1 문의</div>;
}

const contentCss = css`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 500px;
`;
