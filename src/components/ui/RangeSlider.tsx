/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState } from 'react';

type RangeSliderProps = {
	label: string;
	minValue: number;
	maxValue: number;
	fixMinValue: number;
	fixMaxValue: number;
	onDragGetMinValue: (minVal: number) => void;
	onDragGetMaxValue: (maxVal: number) => void;
};

export default function RangeSlider({
	label,
	minValue,
	maxValue,
	fixMinValue,
	fixMaxValue,
	onDragGetMinValue,
	onDragGetMaxValue,
}: RangeSliderProps) {
	const [leftPosition, setLeftPosition] = useState(0);
	const [rightPosition, setRightPosition] = useState(500);

	const handleDragLeft = (e: React.DragEvent<HTMLDivElement>) => {
		const parentRect = e.currentTarget.parentElement?.getBoundingClientRect(); // 부모 요소의 위치, 크기 정보 확인

		const partControlValue = (fixMaxValue - fixMinValue) / 16;

		if (parentRect) {
			const positionX = e.clientX - parentRect.left; // 요소의 가로 위치 - 부모의 왼쪽위치 = 가로값 0
			const sectionWidth = 500 / 16; // 한 영역의 길이 = 16등분 된 진행 길이 500 / 16 = 31.25
			const numberOfSections = Math.trunc(positionX / sectionWidth); // 핸들의 위치 / 한 영역의 길이 = 0, 1, 2 ...

			const controlValue = Math.trunc(partControlValue * numberOfSections);

			if (0 <= positionX && numberOfSections <= 15 && controlValue < maxValue) {
				const newValue = numberOfSections * sectionWidth; // 영역의 인덱스 * 한 영역의 길이
				onDragGetMinValue(controlValue);
				setLeftPosition(newValue);
			}
		}
	};

	const handleDragRight = (e: React.DragEvent<HTMLDivElement>) => {
		const parentRect = e.currentTarget.parentElement?.getBoundingClientRect(); // 부모 요소의 위치, 크기 정보 확인

		const partControlValue = (fixMaxValue - fixMinValue) / 16;

		if (parentRect) {
			const positionX = e.clientX - parentRect.left; // 요소의 가로 위치 - 부모의 왼쪽위치 = 가로값 0
			const sectionWidth = 500 / 16; // 한 영역의 길이 = 16등분 된 진행 길이 500 / 16 = 31.25
			const numberOfSections = Math.trunc(positionX / sectionWidth); // 핸들의 위치 / 한 영역의 길이 = 0, 1, 2 ...

			const controlValue = Math.trunc(partControlValue * numberOfSections);

			if (0 <= positionX && numberOfSections > 0 && numberOfSections <= 16 && controlValue > minValue) {
				const newValue = numberOfSections * sectionWidth; // 영역의 인덱스 * 한 영역의 길이
				onDragGetMaxValue(controlValue);
				setRightPosition(newValue);
			}
		}
	};

	return (
		<div>
			<div css={rangeSliderWrapCss}>
				<div>{label}</div>
				<div>
					<div css={progressBarWrapCss}>
						<div
							onDragStart={handleDragLeft}
							onDrag={handleDragLeft}
							onDragEnd={handleDragLeft}
							css={[sliderHandleWrapCss, leftSliderHandleCss(leftPosition)]}
							draggable
						>
							<span css={sliderHandleCss}></span>
						</div>

						<div css={progressBarCss(leftPosition, rightPosition)}></div>

						<div
							onDragStart={handleDragRight}
							onDrag={handleDragRight}
							onDragEnd={handleDragRight}
							css={[sliderHandleWrapCss, rightSliderHandleCss(rightPosition)]}
							draggable
						>
							<span css={sliderHandleCss}></span>
						</div>
					</div>
					<div css={rangePriceWrapCss}>
						<span>{minValue.toLocaleString()}원</span>
						<span>{maxValue.toLocaleString()}원</span>
					</div>
				</div>
			</div>
		</div>
	);
}

const rangeSliderWrapCss = css`
	display: flex;
	gap: 40px;
`;
const sliderHandleWrapCss = css`
	position: absolute;
	top: 3px;
	padding: 8px;
	transform: translate(-50%, -50%);
	z-index: 10;
	cursor: pointer;
`;

const leftSliderHandleCss = (leftPosition: number) => css`
	left: ${leftPosition}px;
`;

const rightSliderHandleCss = (rightPosition: number) => css`
	left: ${rightPosition}px;
	margin-right: -32px;
`;

const sliderHandleCss = css`
	display: inline-block;
	width: 15px;
	height: 15px;
	border-radius: 100%;
	background-color: #fff;
	border: 3px solid #d53147;
`;

const progressBarWrapCss = css`
	position: relative;
	width: 500px;
	height: 5px;
	background-color: #eaeaeb;
`;

const progressBarCss = (leftPosition: number, rightPosition: number) => css`
	position: absolute;
	left: ${leftPosition}px;
	width: calc(${rightPosition - leftPosition}px);
	height: 5px;
	background-color: #d53147;
`;

const rangePriceWrapCss = css`
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
`;
