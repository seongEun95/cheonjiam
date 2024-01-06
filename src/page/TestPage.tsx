/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import DoubleSlider, { Section, SectionList, SelectedRange } from '../components/ui/DoubleSlider';
import { useState } from 'react';

const min = 48600;
const max = 132300;

export default function TestPage() {
	const [range, setRange] = useState([min, max]);

	const handleClickSection = (range: SelectedRange) => {
		// console.log(range);
		setRange([range[0].price, range[1].price]);

		// API 요청
	};

	return (
		<div css={TestPageCss}>
			<div>{`selected range: ${range[0]}~${range[1]}`}</div>
			<DoubleSlider min={min} max={max} onChangeRange={handleClickSection} />
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
