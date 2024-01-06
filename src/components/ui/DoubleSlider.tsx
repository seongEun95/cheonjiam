/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';

type DoubleSliderProps = {
	min: number;
	max: number;
	onClickSection?: (range: SelectedRange) => void;
};

export type Section = { id: number; price: number; selected: boolean };
export type SectionList = Section[];
export type SelectedRange = [Section, Section];

const createSectionList = (min: number, max: number): SectionList => {
	const sectionAmount = (max - min) / 15;
	console.log(min, max, sectionAmount);

	return new Array(16).fill(null).map((_, idx) => ({ id: idx, price: min + sectionAmount * idx, selected: true }));
};

export default function DoubleSlider({ min, max, onClickSection }: DoubleSliderProps) {
	const [sectionList, setSectionList] = useState<SectionList>(createSectionList(min, max));
	const selectedLeft = sectionList.find(section => section.selected);
	const selectedRight = [...sectionList].reverse().find(section => section.selected);

	console.log('selected', selectedLeft, selectedRight);

	const handleClickSection = (selectedsection: Section) => {
		if (draggRef.current.isDragging) return;

		const leftAbs = Math.abs(selectedsection.id - selectedLeft!.id);
		const rightAbs = Math.abs(selectedRight!.id - selectedsection.id);
		let newSectionList: SectionList;

		if (leftAbs <= rightAbs) {
			newSectionList = sectionList.map(section => ({
				...section,
				selected: section.id < selectedsection.id || section.id > selectedRight!.id ? false : true,
			}));
		} else {
			newSectionList = sectionList.map(section => ({
				...section,
				selected: section.id < selectedLeft!.id || section.id > selectedsection.id ? false : true,
			}));
		}

		setSectionList(newSectionList);

		const newSelectedLeft = newSectionList.find(section => section.selected);
		const newSelectedRight = [...newSectionList].reverse().find(section => section.selected);
		onClickSection && onClickSection([newSelectedLeft!, newSelectedRight!]);
	};

	// 드래그 관련
	const draggRef = useRef({ isDragging: false, offset: 0, draggingSide: 'LEFT' });

	useEffect(() => {
		document.addEventListener('mousemove', handleMouseMove);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, direction: string) => {
		console.log('mousedown');
		draggRef.current.isDragging = true;
		draggRef.current.offset = e.clientX;
		draggRef.current.draggingSide = direction;
		document.addEventListener('mouseup', handleMouseUp);
	};

	const handleMouseMove = (e: any) => {
		if (!draggRef.current.isDragging) return;

		const movedPx = e.clientX - draggRef.current.offset;
		console.log('mousemove', draggRef.current.draggingSide, movedPx);

		if (Math.abs(movedPx) < 32) return;

		let newSectionList: SectionList;
		const movedCount = movedPx > 0 ? Math.floor(movedPx / 32) : Math.ceil(movedPx / 32);
		const isLeft = draggRef.current.draggingSide === 'LEFT';

		console.log(isLeft, movedCount);
		newSectionList = sectionList.map(section => {
			let selected: Boolean;

			if (isLeft) {
				selected = section.id >= selectedLeft!.id + movedCount && section.id <= selectedRight!.id;
			} else {
				console.log(selectedLeft, selectedRight);
				selected = section.id >= selectedLeft!.id && section.id <= selectedRight!.id + movedCount;
			}

			return { ...section, selected };
		}) as SectionList;

		setSectionList(newSectionList);
	};

	const handleMouseUp = (e: any) => {
		console.log('mouseup');
		draggRef.current.isDragging = false;
		draggRef.current.offset = 0;
		draggRef.current.draggingSide = '';
		document.removeEventListener('mouseup', handleMouseUp);
	};

	return (
		<div css={DoubleSliderCss}>
			<div css={lineCss}>
				<div css={[dotCommonCss, dotLeftCss(selectedLeft?.id || 0)]} onMouseDown={e => handleMouseDown(e, 'LEFT')}>
					<div />
				</div>
				<div css={sectionWrapperCss}>
					{sectionList.map(section => (
						<div css={sectionCss(section.selected)} key={section.id} onClick={() => handleClickSection(section)}>
							<div />
						</div>
					))}
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
	left: ${position * 32 - 8}px;
`;
const dotRightCss = (position: number) => css`
	left: ${(position + 1) * 32 - 8}px;
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
