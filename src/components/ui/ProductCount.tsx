/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import { minusProductCount, plusProductCount } from '../../redux/slice/cartSlice';
import { useDispatch } from 'react-redux';

type ProductCountProps = {
	id?: number;
	productCount?: number;
};

export default function ProductCount({ id, productCount }: ProductCountProps) {
	const dispatch = useDispatch();

	const handleClickPlusProductCount = () => {
		dispatch(plusProductCount(id));
	};

	const handleClickMinusProductCount = () => {
		dispatch(minusProductCount(id));
	};

	return (
		<div css={plusMinusBtnWrapCss}>
			<span onClick={handleClickMinusProductCount} css={plusMinusBtnCss}>
				<CiCircleMinus size={26} />
			</span>
			<span css={productCountCss}>{productCount}</span>
			<span onClick={handleClickPlusProductCount} css={plusMinusBtnCss}>
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
