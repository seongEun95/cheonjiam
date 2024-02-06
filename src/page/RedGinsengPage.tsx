/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { ProductHorizontalList } from '../types/ProductHorizontal.type';
import ProductCardHorizontal from '../components/ProductCardHorizontal';
import { useEffect, useState } from 'react';
import RangeSlider, { SelectedRange } from '../components/ui/RangeSlider';
import axios from 'axios';
import { refreshTokens } from '../api/refresh.api';

export default function RedGinsengPage() {
	const [range, setRange] = useState([1000, 280000]); // 슬라이드의 최소값, 최대값을 배열 상태값으로 설정
	const [newData, setNewData] = useState<ProductHorizontalList>([]);
	const [load, setLoad] = useState(false);
	const [error, setError] = useState(false);

	const handleChangeRange = (range: SelectedRange) => {
		setRange([range[0].price, range[1].price]); // 최소밗, 최대값 가격을 상태변경

		setError(false);
		setLoad(true);

		// Range값을 벡엔드 서버에 api 요청함.
		const at = localStorage.getItem('at');
		axios
			.get(`http://localhost:8000/hongsam?min=${range[0].price}&max=${range[1].price}`, {
				headers: { Authorization: `Bearer ${at}` },
			})
			.then(res => {
				setNewData(res.data);
				setLoad(false);
			})
			.catch(err => {
				console.error(err);
				setError(true);
			});
	};

	useEffect(() => {
		setError(false);
		setLoad(true);
		let tokenErrorCount = 0;

		const getHongsamList = async () => {
			const at = localStorage.getItem('at');

			return await axios
				.get(`http://localhost:8000/hongsam?min=${range[0]}&max=${range[1]}`, {
					headers: { Authorization: `Bearer ${at}` },
				})
				.then(res => {
					setNewData(res.data);
					setLoad(false);
				})
				.catch(err => {
					console.log(err);

					if (err.response.data.message === 'Invalid access token') {
						if (tokenErrorCount >= 3) {
							setError(true);
							console.error('invalid token error occured more than 3 times.');
						} else {
							tokenErrorCount === 0
								? refreshTokens(getHongsamList)
								: setTimeout(() => refreshTokens(getHongsamList), 1000);
						}

						return tokenErrorCount++;
					}

					setError(true);
				});
		};

		getHongsamList();
	}, []);

	return (
		<div css={productPageWrapCss}>
			<div>
				<h2 css={titleCss}>홍삼</h2>
			</div>
			<div css={priceSortedProductsFilterCss}>
				<div css={checkboxWrapCss}>
					<div>
						<input type="checkbox" id="sold_out_product" />
						<label htmlFor="sold_out_product">품절상품 제외</label>
					</div>
					<div>
						<input type="checkbox" id="regular_delivery" />
						<label htmlFor="regular_delivery">정기배송</label>
					</div>
				</div>
				<div css={sliderWrapCss}>
					<RangeSlider label="가격" min={range[0]} max={range[1]} onChangeRange={handleChangeRange} />
				</div>
			</div>
			<div css={ProductCardWrapCss}>
				{error ? <div>Error</div> : load && <div css={loadingCss}>loading</div>}
				{newData.map(data => {
					return <ProductCardHorizontal key={data.productVersionGroupSeq} productData={data} />;
				})}
			</div>
		</div>
	);
}

const productPageWrapCss = css`
	width: 100%;
	max-width: 1110px;
`;

const priceSortedProductsFilterCss = css`
	display: flex;
	padding: 40px;
	background-color: #f9f9f9;
	margin-bottom: 10px;
`;

const checkboxWrapCss = css`
	display: flex;
	flex-direction: column;
	gap: 20px;
	border-right: 1px solid #ccc;
	margin-right: 60px;
	padding-right: 60px;
`;

const sliderWrapCss = css`
	flex: 1;
`;

const ProductCardWrapCss = css`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 535px));
	gap: 40px;
`;

const loadingCss = css`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 200px;
	height: 200px;
	line-height: 200px;
	color: #fff;
	border-radius: 100%;
	background-color: #d53147;
	z-index: 10;
	text-align: center;
	animation: opacity 0.4s infinite alternate;

	@keyframes opacity {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`;

const titleCss = css`
	font-size: 40px;
	margin: 80px 0 120px;
	text-align: center;
`;
