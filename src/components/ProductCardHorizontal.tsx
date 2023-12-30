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

export default function ProductCardHorizontal({ ProductData }: { ProductData: ProductHorizontal }) {
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
			onClick={() => handleClickNavigate(ProductData.productVersionGroupSeq)}
		>
			<ProductImg
				src={`https://www.cheonjiyang.co.kr/api/attach/view/product/${ProductData.productSeq}/image/1`}
				alt={ProductData.name}
				isHover={isHover}
			/>

			<div css={txtWrapCss}>
				<div>
					<ProductLabel label={ProductData.iconClsf} />
					<div css={brandNameCss}>{ProductData.brandName}</div>
					<div css={titleCss(isHover)}>{ProductData.name}</div>
				</div>

				<div>
					<div css={starRateCss}>
						<ProductStarRate reviewStarRating={ProductData.reviewAvgRating} />
						<span css={reveiwCountCss}>{`(${ProductData.reviewCount})`}</span>
					</div>
					<div css={nonMemberPriceWrapCss}>
						비회원가 <span css={nonMemberPriceCss}>{`${ProductData.normalPrice.toLocaleString()}원`}</span>
					</div>

					<div css={memberPriceWrapCss}>
						<DiscountRate discountRate={ProductData.memberDcRate} />
						<span css={memberPriceTxtCss}>
							회원할인가 <strong css={memberPriceCss}>{ProductData.memberPrice.toLocaleString()}</strong>
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
