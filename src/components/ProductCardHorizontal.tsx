/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState } from 'react';
import ProductLabel from './horizontalCardUi/ProductLabel';
import ProductImg from './horizontalCardUi/ProductImg';
import ProductStarRate from './horizontalCardUi/ProductStarRate';
import DiscountRate from './horizontalCardUi/DiscountRate';
import { useNavigate } from 'react-router-dom';
import { ProductHorizontal } from '../types/ProductHorizontal.type';

export default function ProductCardHorizontal({ productData }: { productData: ProductHorizontal }) {
	const navigate = useNavigate();
	const [isHover, setIsHover] = useState(false);

	const handleMouseEnter = () => {
		setIsHover(true);
	};

	const handleMouseLeave = () => {
		setIsHover(false);
	};

	const handleClickNavigate = (productId: number) => {
		navigate(`/red_ginseng/${productId}`);
	};

	return (
		<div
			css={productWrapCss}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={() => handleClickNavigate(productData.productVersionGroupSeq)}
		>
			<ProductImg productData={productData} isHover={isHover} />

			<div css={txtWrapCss}>
				<div>
					<ProductLabel label={productData.iconClsf} />
					<div css={brandNameCss}>{productData.brandName}</div>
					<div css={titleCss(isHover)}>{productData.name}</div>
				</div>

				<div>
					<div css={starRateCss}>
						<ProductStarRate reviewStarRating={productData.reviewAvgRating} />
						<span css={reveiwCountCss}>{`(${productData.reviewCount})`}</span>
					</div>
					<div css={nonMemberPriceWrapCss}>
						비회원가 <span css={nonMemberPriceCss}>{`${productData.normalPrice.toLocaleString()}원`}</span>
					</div>

					<div css={memberPriceWrapCss}>
						<DiscountRate discountRate={productData.memberDcRate} />
						<span css={memberPriceTxtCss}>
							회원할인가 <strong css={memberPriceCss}>{productData.memberPrice.toLocaleString()}</strong>
							<span css={wonCss}>원</span>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

const productWrapCss = css`
	display: flex;
	gap: 20px;
	cursor: pointer;
`;

const txtWrapCss = css`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	padding: 10px 0;
`;

const brandNameCss = css`
	margin-bottom: 12px;
`;

const titleCss = (isHover: boolean) => css`
	font-size: 16px;
	font-weight: 600;
	line-height: 1.4;
	margin-bottom: 40px;
	text-decoration: ${isHover ? 'underline' : 'none'};
`;

const starRateCss = css`
	display: flex;
	align-items: center;
	gap: 3px;
`;

const reveiwCountCss = css`
	font-size: 12px;
	color: #959595;
	vertical-align: bottom;
`;

const nonMemberPriceWrapCss = css`
	margin-top: 12px;
	font-size: 13px;
	color: #959595;
`;

const nonMemberPriceCss = css`
	font-size: 14px;
	text-decoration: line-through;
`;

const memberPriceWrapCss = css`
	display: flex;
	align-items: center;
	gap: 10px;
	margin-top: 8px;
`;

const memberPriceTxtCss = css`
	font-size: 13px;
`;

const memberPriceCss = css`
	font-size: 18px;
	font-weight: 500;
	vertical-align: text-bottom;
`;

const wonCss = css`
	font-size: 18px;
	vertical-align: middle;
`;
