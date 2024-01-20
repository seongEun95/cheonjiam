/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useRef, useState } from 'react';

type RangeSliderProps = {
	label?: string;
	min: number;
	max: number;
	onChangeRange?: (range: SelectedRange) => void;
};

export type Section = { id: number; price: number; selected: boolean };
export type SectionList = Section[];
export type SelectedRange = [Section, Section];
type DragRefType = {
	isDragging: boolean; // 드래그 여부
	offset: number;
	draggingSide: string;
	result: SectionList;
	newSelectedLeft: Section | null;
	newSelectedRight: Section | null;
};

const initialDragRef = {
	isDragging: false,
	offset: 0,
	draggingSide: 'LEFT',
	result: [],
	newSelectedLeft: null,
	newSelectedRight: null,
};

// 섹션 리스트를 생성하는 함수
const createSectionList = (min: number, max: number): SectionList => {
	const sectionAmount = Math.ceil((max - min) / 16); // 1칸당 값, Ceil함수로 소수점은 올림
	return new Array(17) // new Array 생성자로 빈배열 17개 생성
		.fill(null) // fill메서드로 null값으로 채운다.
		.map((_, idx) => ({ id: idx, price: idx === 16 ? max : Math.ceil(min + sectionAmount * idx), selected: true })); // 객체로 각 섹션을 정의, id는 index로, price는 16일 때 최대값으로 16이 아니면 최소값 + 1칸당 값 * 인덱스로 한다, selected는 true로 설정한다.
};

const getSelectedSection = (sectionList: SectionList): SelectedRange => {
	const selectedLeft = sectionList.find(section => section.selected)!; // sectionList의 첫번째 true값을 반환한다, 결정적으로 마우스를 up했을 때 왼쪽에서 첫번째 true값의 객체를 반환한다.
	const selectedRight = [...sectionList].reverse().find(section => section.selected)!; // reverse()를 사용하기에 원본배열에 영향을 주므로 spread operator로 복사하여 사용한다. 그리고 Find 메서드로 첫번째 True값을 찾아서 객체를 반환한다.
	return [selectedLeft, selectedRight]; // 위 두 객체의 값을 배열로 반환한다.
};

export default function RangeSlider({ label, min, max, onChangeRange }: RangeSliderProps) {
	const [sectionList, setSectionList] = useState<SectionList>(createSectionList(min, max)); // createSectionList 함수로 배열 생성한 것을 상태로 정의한다.
	const selectedLeft = sectionList.find(section => section.selected)!; // 단언연산자 : 피연산자가 Null이나 undefined값이 아님을 단언할 수 있다. find메서드로 첫 번째 요소 반환
	const selectedRight = [...sectionList].reverse().find(section => section.selected)!; // 반대로 뒤집어 첫 번째 요소 반환
	const dragRef = useRef<DragRefType>(initialDragRef); // useRef를 이용하여 리렌더링되어라도 값을 유지하도록 데이터를 저장한다.

	// 라인을 클릭했을 때 왼쪽핸들, 오른쪽 핸들 계산 함수
	const handleClickSection = (selectedsection: Section) => {
		const leftAbs = Math.abs(selectedsection.id - selectedLeft.id); // 클릭한 섹션의 id값 - 왼쪽 섹션의 id값
		const rightAbs = Math.abs(selectedRight.id - selectedsection.id); // 오른쪽 섹션의 id값 - 클릭한 섹션의 id값
		const isLeft = leftAbs <= rightAbs; // 왼쪽인가 = 왼쪽절대값 <= 오른쪽 절대값

		const newSectionList = sectionList.map(section => ({
			...section, // spread operator
			selected: isLeft
				? section.id >= selectedsection.id && section.id <= selectedRight.id // selected는 isLeft가 true인 경우 : 섹션id가 클릭한 섹션의 id보다 크고 섹션의 아이디가 선택된오른쪽의 id보다 작으면 true가 반환된다.
				: section.id >= selectedLeft.id && section.id <= selectedsection.id, // isLeft가 false인 경우 : 섹션아이디가 선택된 왼쪽 아이디보다 크고 섹션아이디가 섹션아이디가 클릭한 섹션 아이디보다 작으면 True가 반환된다.
		}));

		setSectionList(newSectionList); // 배열을 새로운배열리스트로 상태값 변경
		onChangeRange && onChangeRange(getSelectedSection(newSectionList)); // 슬라이드를 움직일 때마다 새로운배열리스트 값을 반환한다.
	};

	// 슬라이드 핸들을 클릭했을 때
	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, direction: string) => {
		dragRef.current.isDragging = true; // dragRef에 저장한 isDragging를 true로 변경한다.
		dragRef.current.offset = e.clientX; // 이벤트 객체의 clientX 값으로 변경한다.
		dragRef.current.draggingSide = direction; // 파라미터로 받은 direction값을 draggingSide에 할당한다.
		document.addEventListener('mousemove', handleMouseMove); // 마우스 무브 이벤트 추가
		document.addEventListener('mouseup', handleMouseUp); // 마우스 업 이벤트 추가
	};

	// 슬라이드 핸들을 잡고 움직일 때
	const handleMouseMove = (e: any) => {
		if (!dragRef.current.isDragging) return; // isDragging가 False이면 부정연산자로 true가 되므로 return

		const movedPx = e.clientX - dragRef.current.offset; // 이벤트 객체의 clientX값 - offset 값

		if (Math.abs(movedPx) < 32) return; // 만약 movedPx값이 32미만이라면 return; 수많은 아래 연산들을 막아주는 최적화 코드

		const movedCount = movedPx > 0 ? Math.floor(movedPx / 32) : Math.ceil(movedPx / 32); // 움직임횟수 = movedPx이 0보다 크면 movedPx/32 소수점 버림, 0보다 작으면 movedPx/32에 소수점을 올린다.
		const isLeft = dragRef.current.draggingSide === 'LEFT'; // draggingSide가 'LEFT' 와 같다면 true, 다르면 False
		const currentSelectedLeft = dragRef.current.newSelectedLeft || selectedLeft; // newSelectedLeft가 존재한다면 newSelectedLeft 값을 넣고 없다면 selectedLeft 값을 할당한다.
		const currentSelectedRight = dragRef.current.newSelectedRight || selectedRight; // 위와 동일한 로직

		const newSectionList = sectionList.map(section => ({
			...section,
			selected: isLeft
				? section.id >= currentSelectedLeft.id + movedCount && section.id <= currentSelectedRight.id // 섹션아이디 >= 최근선택된왼편아이디 + movedCount 이고 뒤에도 ture이면 true반환
				: section.id >= currentSelectedLeft.id && section.id <= currentSelectedRight.id + movedCount, // 둘의 조건이 모두 true이면 true반환
		}));

		const isLessThanTwoSelected = newSectionList.filter(section => section.selected).length < 2; // 선택된 섹션의 길이가 2미만이면 True
		if (isLessThanTwoSelected) return; // false이면 return

		setSectionList(newSectionList); // 새로운 배열 리스트로 sectionList 상태변경

		dragRef.current.result = newSectionList; // 새 배열리스트를 결과 배열에 대입
		dragRef.current.newSelectedLeft = newSectionList.find(section => section.selected)!; // 섹션 selected true값을 찾는다.
		dragRef.current.newSelectedRight = [...newSectionList].reverse().find(section => section.selected)!; // 반대로 selected True값을 찾는다.
		dragRef.current.offset = e.clientX; // offset에 이벤트객체의 clientX를 대입
	};

	// 마우스를 클릭하고 클릭을 해지했을 때
	const handleMouseUp = () => {
		dragRef.current.result.length !== 0 && onChangeRange && onChangeRange(getSelectedSection(dragRef.current.result)); // Result의 길이가 0이 아닐 때 마우스 무브할 때 가진 result을 getSelectedSection()를 실행한다.
		dragRef.current = initialDragRef; // dragRef값에 초기화값을 대입한다.
		document.removeEventListener('mousemove', handleMouseMove); // 마우스무브 이벤트를 제거한다.
		document.removeEventListener('mouseup', handleMouseUp); // 마우스업 이벤트를 제거한다. 제거하지 않으면 계속 메모리에 쌓여서 화면이 보이지 않게 된다.
	};

	return (
		<div>
			<div css={rangeSliderWrapCss}>
				{label && <div>{label}</div>}
				<div css={lineCss}>
					<div css={[dotCommonCss, dotCss(selectedLeft.id || 0)]} onMouseDown={e => handleMouseDown(e, 'LEFT')}></div>
					<div css={sectionWrapCss}>
						{sectionList.map((section, idx) => {
							if (idx === 16) return null;

							return (
								<div
									key={section.id}
									css={sectionCss(section.selected && sectionList[idx + 1].selected)}
									onClick={() => handleClickSection(section)}
								>
									<div></div>
								</div>
							);
						})}
					</div>
					<div css={[dotCommonCss, dotCss(selectedRight.id || 16)]} onMouseDown={e => handleMouseDown(e, 'RIGHT')}>
						<div></div>
					</div>
				</div>
			</div>
			<div css={priceWrapCss}>
				<div>{`${selectedLeft?.price.toLocaleString()}원`}</div>
				<div>{`${selectedRight?.price.toLocaleString()}원`}</div>
			</div>
		</div>
	);
}

const rangeSliderWrapCss = css`
	display: flex;
	gap: 40px;
`;

const lineCss = css`
	position: relative;
	width: 500px;
`;

const dotCommonCss = css`
	position: absolute;
	top: -4px;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background-color: #fff;
	border: 3px solid #d53147;
	cursor: pointer;
`;

const dotCss = (position: number) => css`
	left: ${position * 32 - 16}px;
`;

const sectionWrapCss = css`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 500px;
`;

const sectionCss = (selected: boolean) => css`
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 32px;
	height: 10px;
	padding-bottom: 4px;

	div {
		width: 100%;
		height: 4px;
		background-color: ${selected ? '#d53148' : '#e5e5e5'};
	}
`;

const priceWrapCss = css`
	display: flex;
	justify-content: space-between;
	width: 570px;
	margin: 10px 0 0 40px;
`;
