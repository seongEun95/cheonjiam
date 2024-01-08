/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import DoubleSlider, { SelectedRange } from '../components/ui/DoubleSlider';
import { useState } from 'react';

const min = 12000;
const max = 180000;

export default function TestPage() {
	const [range, setRange] = useState([min, max]);

	const handleChangeRange = (range: SelectedRange) => {
		// console.log(range);
		setRange([range[0].price, range[1].price]);

		// API 요청

		// fetch(
		// 	`https://www.cheonjiyang.co.kr/api/product?conditions=%7B%22categoryClsfBSeq%22:%22822%22,%22searchWord%22:%22%22,%22minSalePrice%22:${range[0].price},%22maxSalePrice%22:${range[1].price},%22saleStatus%22:%22%22,%22periodicSaleYn%22:%22%22%7D&page=1&size=10&sort=orderCount,DESC`,
		// )
		// 	.then(res => res.json())
		// 	.then(data => console.log(data));
	};

	return (
		<div css={TestPageCss}>
			<div>{`selected range: ${range[0]}~${range[1]}`}</div>
			<DoubleSlider min={min} max={max} onChangeRange={handleChangeRange} />
		</div>
	);
}

const TestPageCss = css`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	background-color: yellowgreen;
	width: 100vw;
	height: 100vh;
`;
