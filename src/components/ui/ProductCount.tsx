/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';

type ProductCountProps = {
	productCount?: number;
	onClickLeft: React.MouseEventHandler<HTMLSpanElement>;
	onClickRight: React.MouseEventHandler<HTMLSpanElement>;
};

export default function ProductCount({ productCount, onClickLeft, onClickRight }: ProductCountProps) {
	return (
		<div css={plusMinusBtnWrapCss}>
			<span onClick={onClickLeft} css={plusMinusBtnCss}>
				<CiCircleMinus size={26} />
			</span>
			<span css={productCountCss}>{productCount}</span>
			<span onClick={onClickRight} css={plusMinusBtnCss}>
				<CiCirclePlus size={26} />
			</span>
		</div>
	);
}

const plusMinusBtnWrapCss = css`
	display: flex;
	align-items: center;
	gap: 14px;
`;

const plusMinusBtnCss = css`
	cursor: pointer;
`;

const productCountCss = css`
	width: 20px;
	text-align: center;
`;
