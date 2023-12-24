/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

type ProductImgProp = {
	productId: number;
	src: string;
	alt: string;
	isHover: boolean;
};

export default function ProductImg({ productId, alt, src, isHover }: ProductImgProp) {
	return (
		<div css={ProductImgCss}>
			<img css={imgCss(isHover)} src={src} alt={alt} />
			<div css={dimCss(isHover)} />
		</div>
	);
}

const ProductImgCss = css`
	position: relative;
	width: 275px;
	height: 275px;
	overflow: hidden;
`;

const dimCss = (isHover: boolean) => css`
	position: absolute;
	top: 0;
	left: 0;
	width: 275px;
	height: 275px;
	background-color: ${isHover ? 'rgba(0, 0, 0, 0.1)' : 'transparent'};
	transition: all 0.3s ease;
	z-index: 1;
`;

const imgCss = (isHover: boolean) => css`
	width: 100%;
	transition: all 0.3s ease;
	transform: scale(${isHover ? 1.1 : 1});
`;
