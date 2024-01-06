/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import DoubleSlider, { Section, SectionList, SelectedRange } from '../components/ui/DoubleSlider';
import { useState } from 'react';

export default function TestPage() {
	const handleClickSection = (range: SelectedRange) => {
		// console.log(range);
	};

	return (
		<div css={TestPageCss}>
			<DoubleSlider min={10000} max={100000} onClickSection={handleClickSection} />
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
