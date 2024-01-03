/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { IoIosArrowDown } from 'react-icons/io';
import { useRef, useState } from 'react';

export type SelectBoxSize = 'small' | 'medium' | 'large';

export type SelectBoxOption = {
	id: string;
	name: string;
	value: string;
};
export type SelectBoxOptionList = SelectBoxOption[];

type SelectBoxProps = {
	size: SelectBoxSize;
	optionData: SelectBoxOptionList;
	value: string;
	defaultValue?: string;
	onClickMenu: (selectedOption: string) => void;
};

export default function SelectBox({
	size = 'medium',
	optionData,
	value,
	defaultValue = '',
	onClickMenu,
}: SelectBoxProps) {
	const [isShowOption, setIsShowOption] = useState<boolean>(false);
	const optionRef = useRef<HTMLUListElement | null>(null);
	const optionHeight = optionRef.current?.clientHeight;

	const handleClickShowOption = () => {
		setIsShowOption(prev => !prev);
	};

	const handleClickMenu = (selectedOption: string) => {
		onClickMenu(selectedOption);
		setIsShowOption(() => false);
	};

	return (
		<div css={selectBoxWrapCss}>
			<button onClick={handleClickShowOption} css={[selectBoxTitleWrapCss, getCssTitleWidthSize(size)]}>
				<span css={[getCssTitleSize(size)]}>{optionData.find(item => item.value === value)?.name || defaultValue}</span>
				<IoIosArrowDown fill="#666" size={18} css={arrowCss(isShowOption)} />
			</button>

			<div css={selectBoxListWrapCss(isShowOption, optionHeight)}>
				<ul ref={optionRef} css={[selectBoxListCss, getCssListSize(size)]}>
					{optionData.map(({ id, name, value }) => (
						<li key={id}>
							<button css={[selectBoxListTxtCss, getCssListTxtSize(size)]} onClick={() => handleClickMenu(value)}>
								{name}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

const selectBoxWrapCss = css`
	position: relative;
	transition: all 0.3s;
`;

const selectBoxTitleWrapCss = css`
	font-family: 'Nanum Myeongjo';
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
`;

const getCssTitleWidthSize = (size: SelectBoxSize) => {
	switch (size) {
		case 'small':
			return selectBoxSmallTitleCss;
		case 'medium':
			return selectBoxMediumTitleCss;
		case 'large':
			return selectBoxLargeTitleCss;
	}
};

const selectBoxSmallTitleCss = css`
	width: 120px;
`;

const selectBoxMediumTitleCss = css`
	width: 230px;
`;

const selectBoxLargeTitleCss = css`
	width: 300px;
`;

const getCssTitleSize = (size: SelectBoxSize) => {
	switch (size) {
		case 'small':
			return selectBoxTitleSmallCss;
		case 'medium':
			return selectBoxTitleMediumCss;
		case 'large':
			return selectBoxTitleLargeCss;
	}
};

const selectBoxTitleSmallCss = css`
	height: 30px;
	font-size: 14px;
	line-height: 30px;
`;

const selectBoxTitleMediumCss = css`
	height: 50px;
	font-size: 16px;
	line-height: 50px;
`;

const selectBoxTitleLargeCss = css`
	height: 70px;
	font-size: 18px;
	line-height: 70px;
`;

const arrowCss = (isShow: boolean) => css`
	transform: rotate(${isShow ? '180' : '0'}deg);
	transition: all 0.3s;
`;

const selectBoxListWrapCss = (isShow: boolean, optionHeight: number | undefined) => css`
	position: absolute;
	width: 100%;
	height: ${isShow ? optionHeight && optionHeight + 2 : 0}px;
	overflow: hidden;
	transition: all 0.3s;
`;

const selectBoxListCss = css`
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 20px;
	background-color: #fff;
	border: 1px solid #000;
`;

const getCssListSize = (size: SelectBoxSize) => {
	switch (size) {
		case 'small':
			return selectBoxSmallListCss;
		case 'medium':
			return selectBoxMediumListCss;
		case 'large':
			return selectBoxLargeListCss;
	}
};

const selectBoxSmallListCss = css`
	gap: 12px;
	padding: 12px;
`;

const selectBoxMediumListCss = css`
	gap: 20px;
	padding: 20px;
`;

const selectBoxLargeListCss = css`
	gap: 28px;
	padding: 28px;
`;

const selectBoxListTxtCss = css`
	font-family: 'Nanum Myeongjo';
	color: #000;
	transition: 0.3s;

	&:hover {
		color: #a69471;
		text-decoration: underline;
	}
`;

const getCssListTxtSize = (size: SelectBoxSize) => {
	switch (size) {
		case 'small':
			return selectBoxListSmallTxtCss;
		case 'medium':
			return selectBoxListMediumTxtCss;
		case 'large':
			return selectBoxListLargeTxtCss;
	}
};

const selectBoxListSmallTxtCss = css`
	font-size: 14px;
`;

const selectBoxListMediumTxtCss = css`
	font-size: 16px;
`;

const selectBoxListLargeTxtCss = css`
	font-size: 18px;
`;
