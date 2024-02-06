/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import ProductCardVertical from '../components/ProductCardVertical';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarouselSlide from '../components/Carousel';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import axios from 'axios';
import { ProductHorizontalList } from '../types/ProductHorizontal.type';

export default function MainPage() {
	const [newData, setNewData] = useState<ProductHorizontalList>([]);
	const slideData = newData.filter((_, index) => index < 10);

	const at = localStorage.getItem('at');
	axios
		.get(`http://localhost:8000/hongsam?min=1000&max=280000`, {
			headers: { Authorization: `Bearer ${at}` },
		})
		.then(res => {
			setNewData(res.data);
		})
		.catch(err => {
			console.error(err);
		});

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
						{slideData.map(data => {
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
					{slideNum !== -newData.length + 3 && (
						<button css={[btnCommonCss, nextBtnCss]} onClick={handleClickSlideNext}>
							<IoIosArrowForward size={20} />
						</button>
					)}
				</div>
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
