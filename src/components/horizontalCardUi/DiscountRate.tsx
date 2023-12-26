/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

type DiscountRateProps = {
	discountRate: number;
};

export default function DiscountRate({ discountRate }: DiscountRateProps) {
	return (
		<div>
			<span css={discountRateCss}>{`${discountRate}%`}</span>
		</div>
	);
}

const discountRateCss = css`
	display: inline-block;
	padding: 3px 6px;
	color: #d53147;
	border: 1px solid #d53147;
`;
