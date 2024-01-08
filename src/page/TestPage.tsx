/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import DoubleSlider, { SelectedRange } from '../components/ui/DoubleSlider';
import { useState } from 'react';

const min = 10000;
const max = 160000;

export default function TestPage() {
	const [range, setRange] = useState([min, max]);

	const handleChangeRange = (range: SelectedRange) => {
		console.log(range);
		setRange([range[0].price, range[1].price]);

		// API 요청
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
