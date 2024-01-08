/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useRef, useState } from 'react';

type DoubleSliderProps = {
	min: number;
	max: number;
	onChangeRange?: (range: SelectedRange) => void;
};

export type Section = { id: number; price: number; selected: boolean };
export type SectionList = Section[];
export type SelectedRange = [Section, Section];
type DragRefType = {
	isDragging: boolean;
	offset: number;
	draggingSide: string;
	result: SectionList;
	newSelectedLeft: Section | null;
	newSelectedRight: Section | null;
};

const createSectionList = (min: number, max: number): SectionList => {
	const sectionAmount = Math.ceil((max - min) / 16);
	return new Array(17)
		.fill(null)
		.map((_, idx) => ({ id: idx, price: idx === 16 ? max : Math.ceil(min + sectionAmount * idx), selected: true }));
};

const getSelectedSection = (sectionList: SectionList): SelectedRange => {
	const selectedLeft = sectionList.find(section => section.selected);
	const selectedRight = [...sectionList].reverse().find(section => section.selected);
	return [selectedLeft!, selectedRight!];
};

export default function DoubleSlider({ min, max, onChangeRange }: DoubleSliderProps) {
	const [sectionList, setSectionList] = useState<SectionList>(createSectionList(min, max));
	const selectedLeft = sectionList.find(section => section.selected);
	const selectedRight = [...sectionList].reverse().find(section => section.selected);

	// 섹션 클릭 관련
	const handleClickSection = (selectedsection: Section) => {
		if (draggRef.current.isDragging) return;

		const leftAbs = Math.abs(selectedsection.id - selectedLeft!.id);
		const rightAbs = Math.abs(selectedRight!.id - selectedsection.id);
		const isLeft = leftAbs <= rightAbs;
		let newSectionList: SectionList;

		newSectionList = sectionList.map(section => ({
			...section,
			selected: isLeft
				? section.id >= selectedsection.id && section.id <= selectedRight!.id
				: section.id >= selectedLeft!.id && section.id <= selectedsection.id,
		}));

		setSectionList(newSectionList);
		onChangeRange && onChangeRange(getSelectedSection(newSectionList));
	};

	// 드래그 관련
	const draggRef = useRef<DragRefType>({
		isDragging: false,
		offset: 0,
		draggingSide: 'LEFT',
		result: [],
		newSelectedLeft: null,
		newSelectedRight: null,
	});

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, direction: string) => {
		console.log('mousedown');
		draggRef.current.isDragging = true;
		draggRef.current.offset = e.clientX;
		draggRef.current.draggingSide = direction;
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	const handleMouseMove = (e: any) => {
		// 드래그 중이 아니면 리턴
		if (!draggRef.current.isDragging) return;

		const movedPx = e.clientX - draggRef.current.offset;

		// 32px 이하로 움직이면 리턴
		if (Math.abs(movedPx) < 32) return;

		let newSectionList: SectionList;
		const movedCount = movedPx > 0 ? Math.floor(movedPx / 32) : Math.ceil(movedPx / 32);
		const isLeft = draggRef.current.draggingSide === 'LEFT';
		const currentSelectedLeft = draggRef.current.newSelectedLeft || selectedLeft;
		const currentSelectedRight = draggRef.current.newSelectedRight || selectedRight;

		newSectionList = sectionList.map(section => ({
			...section,
			selected: isLeft
				? section.id >= currentSelectedLeft!.id + movedCount && section.id <= currentSelectedRight!.id
				: section.id >= currentSelectedLeft!.id && section.id <= currentSelectedRight!.id + movedCount,
		}));

		// console.log(newSectionList);

		// 예외체크
		const isAllNotSelected = newSectionList.every(section => !section.selected);
		const isLessThanTwoSelected = newSectionList.filter(section => section.selected).length < 2;
		if (isAllNotSelected || isLessThanTwoSelected) return;

		setSectionList(newSectionList);
		draggRef.current.result = newSectionList;
		draggRef.current.newSelectedLeft = newSectionList.find(section => section.selected)!;
		draggRef.current.newSelectedRight = [...newSectionList].reverse().find(section => section.selected)!;
		draggRef.current.offset = e.clientX;
	};

	const handleMouseUp = (e: any) => {
		console.log('mouseup');
		draggRef.current.result.length !== 0 && onChangeRange && onChangeRange(getSelectedSection(draggRef.current.result));
		draggRef.current.isDragging = false;
		draggRef.current.offset = 0;
		draggRef.current.draggingSide = '';
		draggRef.current.result = [];
		draggRef.current.newSelectedLeft = null;
		draggRef.current.newSelectedRight = null;
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	};

	return (
		<div css={DoubleSliderCss}>
			<div css={lineCss}>
				<div css={[dotCommonCss, dotLeftCss(selectedLeft?.id || 0)]} onMouseDown={e => handleMouseDown(e, 'LEFT')}>
					<div />
				</div>
				<div css={sectionWrapperCss}>
					{sectionList.map((section, idx) => {
						if (idx === 16) return null;
						return (
							<div
								css={sectionCss(section.selected && sectionList[idx + 1].selected)}
								key={section.id}
								onClick={() => handleClickSection(section)}
							>
								<div />
							</div>
						);
					})}
				</div>
				<div css={[dotCommonCss, dotRightCss(selectedRight?.id || 16)]} onMouseDown={e => handleMouseDown(e, 'RIGHT')}>
					<div />
				</div>
			</div>
			<div css={priceWrapperCss}>
				<div>{`${selectedLeft?.price.toLocaleString()}원`}</div>
				<div>{`${selectedRight?.price.toLocaleString()}원`}</div>
			</div>
		</div>
	);
}

const DoubleSliderCss = css`
	width: 600px;
	height: 100px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	background-color: white;
`;

const lineCss = css`
	position: relative;
	width: 500px;
	margin: 20px auto;
`;

const dotCommonCss = css`
	position: absolute;
	top: -5px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background-color: #d53148;
	cursor: pointer;

	div {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: white;
	}
`;

const dotLeftCss = (position: number) => css`
	left: ${position * 32 - 16}px;
`;
const dotRightCss = (position: number) => css`
	left: ${position * 32 - 16}px;
`;

const sectionWrapperCss = css`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 500px;
`;

const sectionCss = (selected: boolean) => css`
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 32px;
	height: 10px;
	padding: 0 0 4px 0;

	div {
		width: 100%;
		height: 4px;
		background-color: ${selected ? '#d53148' : '#e5e5e5'};
	}
`;

const priceWrapperCss = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 575px;
`;
