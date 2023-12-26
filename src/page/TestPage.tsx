/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import RateStar from '../components/ui/RateStar';
import ProductImg from '../components/ui/ProductImg';
import ProductCardVertical from '../components/ProductCardVertical';
import { PRODUCT_DATA } from '../data/productSample';
import { useNavigate } from 'react-router-dom';

export default function TestPage() {
	const navigate = useNavigate();

	const handleClickCard = (cardId: number) => {
		console.log(cardId);
		navigate(`/red_ginseng/${cardId}`);
	};

	return (
		<div css={TestPageCss}>
			{/* <RateStar reviewAvgRating={4} /> */}
			{/* <ProductImg
				productId={2233}
				alt="test"
				src="https://www.cheonjiyang.co.kr/api/attach/view/product/13734/image/1"
			/> */}
			{/* <ProductCardVertical data={PRODUCT_DATA} onClick={handleClickCard} /> */}
		</div>
	);
}

const TestPageCss = css`
	display: flex;
	justify-content: center;
	align-items: center;

	background-color: yellowgreen;
	width: 100vw;
	height: 100vh;
`;
