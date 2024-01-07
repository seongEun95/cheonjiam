/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { ProductHorizontalList } from '../types/ProductHorizontal.type';
import { PRODUCT_HORIZONTAL_DATA } from '../data/productHorizontal';
import ProductCardHorizontal from '../components/ProductCardHorizontal';
import { useState } from 'react';
import RangeSlider from '../components/ui/RangeSlider';

export default function RedGinsengPage() {
	const [data] = useState<ProductHorizontalList>(PRODUCT_HORIZONTAL_DATA.filter((_, index) => index < 8));

	const [minValue, setMinValue] = useState(275);
	const [maxValue, setMaxValue] = useState(165000);

	const fixMinValue = 275;
	const fixMaxValue = 165000;

	const handleDragSetMinValue = (minVal: number) => {
		setMinValue(() => minVal);
	};

	const handleDragSetMaxValue = (maxVal: number) => {
		setMaxValue(() => maxVal);
	};

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
					<RangeSlider
						label="가격"
						minValue={minValue}
						maxValue={maxValue}
						fixMinValue={fixMinValue}
						fixMaxValue={fixMaxValue}
						onDragGetMinValue={handleDragSetMinValue}
						onDragGetMaxValue={handleDragSetMaxValue}
					/>
				</div>
			</div>
			<div css={ProductCardWrapCss}>
				{data.map(data => {
					return <ProductCardHorizontal key={data.productVersionGroupSeq} ProductData={data} />;
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

const titleCss = css`
	font-size: 40px;
	margin: 80px 0 120px;
	text-align: center;
`;
