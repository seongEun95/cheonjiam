/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { ProductHorizontalList } from '../types/ProductHorizontal.type';
import { PRODUCT_HORIZONTAL_DATA } from '../data/productHorizontal';
import ProductCardHorizontal from '../components/ProductCardHorizontal';
import { useState } from 'react';

export default function RedGinsengPage() {
	const [data] = useState<ProductHorizontalList>(PRODUCT_HORIZONTAL_DATA.filter((_, index) => index < 8));

	return (
		<div>
			<div>
				<h2 css={titleCss}>홍삼</h2>
			</div>
			<div css={ProductCardWrapCss}>
				{data.map(data => {
					return <ProductCardHorizontal key={data.productVersionGroupSeq} ProductData={data} />;
				})}
			</div>
		</div>
	);
}

const ProductCardWrapCss = css`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 535px));
	gap: 40px;
	width: 1110px;
`;

const titleCss = css`
	text-align: center;
`;
