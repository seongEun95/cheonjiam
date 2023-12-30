/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

const CustomLeftArrow = ({ onClick }: any) => (
	<i css={[arrowCommonCss, nextArrowCss]} onClick={() => onClick()}>
		<RiArrowRightSLine size={20} fill="#666" />
	</i>
);
const CustomRightArrow = ({ onClick }: any) => (
	<i css={[arrowCommonCss, prevArrowCss]} onClick={() => onClick()}>
		<RiArrowLeftSLine size={20} fill="#666" />
	</i>
);
export { CustomLeftArrow, CustomRightArrow };

const arrowCommonCss = css`
	position: absolute;
	bottom: 55px;
	cursor: pointer;
`;

const prevArrowCss = css`
	right: 32%;
`;

const nextArrowCss = css`
	right: 30%;
`;
