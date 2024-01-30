/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { ProductHorizontalList } from '../types/ProductHorizontal.type';
import { PRODUCT_HORIZONTAL_DATA } from '../data/productHorizontal';
import ProductCardHorizontal from '../components/ProductCardHorizontal';
import { useEffect, useState } from 'react';
import RangeSlider, { SelectedRange } from '../components/ui/RangeSlider';
import axios from 'axios';
import { refreshTokens } from '../api/refresh.api';

const min = 1000; // 더블슬라이드 최소값
const max = 280000; // 더블슬라이드 최대값, 최소값과 최대값을 함수컴포넌트 밖으로 빼는 이유 : 컴포넌트 안에 변수가 있으면 컴포넌트가 계속 렌더링되면서 변수도 같이 메모리에 영향을 주므로 밖에서 선언한다.

export default function RedGinsengPage() {
	// const [data] = useState<ProductHorizontalList>(PRODUCT_HORIZONTAL_DATA.filter((_, index) => index < 8));

	const [range, setRange] = useState([min, max]); // 슬라이드의 최소값, 최대값을 배열 상태값으로 설정
	const handleChangeRange = (range: SelectedRange) => {
		setRange([range[0].price, range[1].price]); // 최소밗, 최대값 가격을 상태변경

		// Range값을 벡엔드 서버에 api 요청함.
	};

	const [newData, setNewData] = useState<ProductHorizontalList>([]);
	const [load, setLoad] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setError(false);
		setLoad(true);
		let tokenErrorCount = 0;

		const getHongsamList = async () => {
			const at = localStorage.getItem('at');

			return await axios
				.get('http://localhost:8000/hongsam', {
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
					<RangeSlider label="가격" min={min} max={max} onChangeRange={handleChangeRange} />
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
	width: 1075px;
	line-height: 80px;
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
