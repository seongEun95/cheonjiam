/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { plusCount } from '../redux/slice/countSlice';
import ProductCardVertical from '../components/ProductCardVertical';
import { useState } from 'react';
import { PRODUCT_DATA } from '../data/productSample';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
	const dispatch = useDispatch();
	const count = useSelector((state: RootState) => state.count);

	const [data] = useState(PRODUCT_DATA.filter((_, index) => index < 8)); // 인덱스 0 ~ 7까지만 생성, 총 8개 제품만 보여주기

	const navigate = useNavigate();

	const handleClickCard = (cardId: number) => {
		console.log(cardId);
		navigate(`/red_ginseng/${cardId}`);
	};

	return (
		<div css={mainWrapCss}>
			메인페이지
			<div>
				<span>{count.count}</span>
				<button
					onClick={() => {
						dispatch(plusCount(count.count));
					}}
				>
					+
				</button>
			</div>
			<div css={ProductCardVerticalWrapCss}>
				{data.map(data => {
					return <ProductCardVertical data={data} key={data.productVersionGroupSeq} onClick={handleClickCard} />;
				})}
			</div>
		</div>
	);
}

const mainWrapCss = css`
	min-height: 1000px;
	background-color: #f9f9f9;
`;

const ProductCardVerticalWrapCss = css`
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 275px));
	width: 1100px;
`;
