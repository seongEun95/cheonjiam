/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import { useRef, useState } from 'react';

type SelectBoxSize = 'small' | 'medium' | 'large';

type SelectBoxProps = {
	size: SelectBoxSize;
	optionArray: string[];
	title: string;
};

export default function SelectBox({ size = 'medium', optionArray, title }: SelectBoxProps) {
	const [isShowOption, setIsShowOption] = useState<boolean>(false);
	const optionRef = useRef<HTMLUListElement | null>(null);
	const optionHeight = optionRef.current?.clientHeight;
	const [optionTitle, setOptionTitle] = useState(title);

	const handleClickShowOption = () => {
		setIsShowOption(prev => !prev);
	};

	const handleClickChangeTitle = (option: string) => {
		setOptionTitle(option);
		setIsShowOption(false);
	};

	return (
		<div css={familySiteWrapCss}>
			<h3 onClick={handleClickShowOption} css={[familySiteTitleWrapCss, getCssTitleWidthSize(size)]}>
				<span css={[getCssTitleSize(size)]}>{optionTitle}</span>
				<IoIosArrowDown fill="#666" size={18} css={arrowCss(isShowOption)} />
			</h3>

			<div css={familySiteListWrapCss(isShowOption, optionHeight)}>
				<ul ref={optionRef} css={[familySiteListCss, getCssListSize(size)]}>
					{optionArray.map((option, index) => (
						<li key={index}>
							<Link
								onClick={() => {
									handleClickChangeTitle(option);
								}}
								css={[familySiteListTxtCss, getCssListTxtSize(size)]}
								to={'#'}
							>
								{option}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

const familySiteWrapCss = css`
	position: relative;
	transition: all 0.3s;
`;

const familySiteTitleWrapCss = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
`;

const getCssTitleWidthSize = (size: SelectBoxSize) => {
	switch (size) {
		case 'small':
			return familySiteSmallTitleCss;
		case 'medium':
			return familySiteMediumTitleCss;
		case 'large':
			return familySiteLargeTitleCss;
	}
};

const familySiteSmallTitleCss = css`
	width: 120px;
`;

const familySiteMediumTitleCss = css`
	width: 230px;
`;

const familySiteLargeTitleCss = css`
	width: 300px;
`;

const getCssTitleSize = (size: SelectBoxSize) => {
	switch (size) {
		case 'small':
			return familySiteTitleSmallCss;
		case 'medium':
			return familySiteTitleMediumCss;
		case 'large':
			return familySiteTitleLargeCss;
	}
};

const familySiteTitleSmallCss = css`
	height: 30px;
	font-size: 14px;
	line-height: 30px;
`;

const familySiteTitleMediumCss = css`
	height: 50px;
	font-size: 16px;
	line-height: 50px;
`;

const familySiteTitleLargeCss = css`
	height: 70px;
	font-size: 18px;
	line-height: 70px;
`;

const arrowCss = (isShow: boolean) => css`
	transform: rotate(${isShow ? '180' : '0'}deg);
	transition: all 0.3s;
`;

const familySiteListWrapCss = (isShow: boolean, optionHeight: number | undefined) => css`
	position: absolute;
	width: 100%;
	height: ${isShow ? optionHeight && optionHeight + 2 : 0}px;
	overflow: hidden;
	transition: all 0.3s;
`;

const familySiteListCss = css`
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
			return familySiteSmallListCss;
		case 'medium':
			return familySiteMediumListCss;
		case 'large':
			return familySiteLargeListCss;
	}
};

const familySiteSmallListCss = css`
	gap: 12px;
	padding: 12px;
`;

const familySiteMediumListCss = css`
	gap: 20px;
	padding: 20px;
`;

const familySiteLargeListCss = css`
	gap: 28px;
	padding: 28px;
`;

const familySiteListTxtCss = css`
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
			return familySiteListSmallTxtCss;
		case 'medium':
			return familySiteListMediumTxtCss;
		case 'large':
			return familySiteListLargeTxtCss;
	}
};

const familySiteListSmallTxtCss = css`
	font-size: 14px;
`;

const familySiteListMediumTxtCss = css`
	font-size: 16px;
`;

const familySiteListLargeTxtCss = css`
	font-size: 18px;
`;
