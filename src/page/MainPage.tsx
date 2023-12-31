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
import CarouselSlide from '../components/Carousel';
import { ProductList } from '../types/Product.type';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

export default function MainPage() {
	const dispatch = useDispatch();
	const count = useSelector((state: RootState) => state.count);

	const [data] = useState<ProductList>(PRODUCT_DATA.filter((_, index) => index < 10)); // 인덱스 0 ~ 7까지만 생성, 총 8개 제품만 보여주기

	const navigate = useNavigate();
	const [slideNum, setSlideNum] = useState<number>(0);

	const handleClickSlideNext = () => {
		setSlideNum(prev => prev - 1);
	};

	const handleClickSlidePrev = () => {
		setSlideNum(prev => prev + 1);
	};

	const handleClickCard = (cardId: number) => {
		console.log(cardId);
		navigate(`/red_ginseng/${cardId}`);
	};

	return (
		<div css={mainWrapCss}>
			<div>
				<CarouselSlide />
			</div>

			<div css={productCardVerticalWrapCss}>
				<h2 css={titleCss}>Best Seller</h2>
				<div css={productCardVerticalOuterCss}>
					<div css={productCardVerticalInnerCss(slideNum)}>
						{data.map(data => {
							return <ProductCardVertical data={data} key={data.productVersionGroupSeq} onClick={handleClickCard} />;
						})}
					</div>
				</div>
				<div>
					{slideNum !== 0 && (
						<button css={[btnCommonCss, prevBtnCss]} onClick={handleClickSlidePrev}>
							<IoIosArrowBack size={20} />
						</button>
					)}
					{slideNum !== -data.length + 3 && (
						<button css={[btnCommonCss, nextBtnCss]} onClick={handleClickSlideNext}>
							<IoIosArrowForward size={20} />
						</button>
					)}
				</div>
			</div>
			<div css={reduxTestCss}>
				<span>{count.count}</span>
				<button
					css={reduxPlusBtnCss}
					onClick={() => {
						dispatch(plusCount(count.count));
					}}
				>
					+
				</button>
			</div>
		</div>
	);
}

const mainWrapCss = css`
	min-height: 1000px;
`;

const productCardVerticalWrapCss = css`
	position: relative;
`;

const titleCss = css`
	margin: 60px 0;
	font-size: 48px;
	text-align: center;
`;

const productCardVerticalOuterCss = css`
	width: 925px;
	overflow: hidden;
	margin: 0 auto;
`;

const productCardVerticalInnerCss = (slideNum: number) => css`
	display: flex;
	gap: 50px;
	transform: translateX(${325 * slideNum}px);
	transition: 0.3s;
`;

const btnCommonCss = css`
	position: absolute;
	top: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50px;
	height: 50px;
	border-radius: 100%;
	border: 1px solid #ccc;
`;

const prevBtnCss = css`
	left: 3%;
`;

const nextBtnCss = css`
	right: 3%;
`;

const reduxTestCss = css`
	margin: 40px 0;
	text-align: center;
`;

const reduxPlusBtnCss = css`
	margin: 10px;
	padding: 10px;
	font-size: 20px;
	border: 1px solid #ccc;
`;
