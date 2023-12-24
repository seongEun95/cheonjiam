/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

type DiscountLabelProps = {
	percent: number;
};

export default function DiscountLabel({ percent }: DiscountLabelProps) {
	return <div css={DiscountLabelCss}>{percent}%</div>;
}

const DiscountLabelCss = css`
	height: 23px;
	border: 1px solid #d53147;
	color: #d53147;
	padding: 3px 6px 4px 6px;
`;
