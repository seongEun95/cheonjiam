/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState } from 'react';
import mainProductData from '../data/mainProductData.json';
import { Link } from 'react-router-dom';

interface productCardProps {
	pageSrc: string;
	imgSrc: string;
	content: {
		title: string;
		grade: number;
		gradeCount: number;
		nonMemberPrice: number;
		discountRate: number;
		memberPrice: number;
	};
	icon: {
		payment: string;
		cart: string;
		gift: string;
		like: string;
	};
}

export default function ProductCard() {
	// @ts-ignore
	const [productData] = useState<productCardProps[]>(mainProductData.filter((data, index) => index < 8));
	return (
		<div>
			<h2 css={sectionTitleCss}>Best Seller</h2>
			<div css={productWrapCss}>
				{productData.map(data => (
					<div css={productCardCss}>
						<Link to={data.pageSrc}>
							<div>
								<img css={productImgCss} src={data.imgSrc} alt={data.content.title} />
							</div>
							{/* 마우스 오버 시 보이는 메뉴 */}
							<div>
								<img src={data.icon.payment} alt="주문하기" />
								<img src={data.icon.cart} alt="장바구니 담기" />
								<img src={data.icon.gift} alt="선물하기" />
								<img src={data.icon.like} alt="찜하기" />
							</div>
							{/* 제품 텍스트 */}
							<div css={productInfoCss}>
								<h3>{data.content.title}</h3>
								<div>
									<span>{data.content.grade}점</span>
									<span>{data.content.gradeCount}</span>
								</div>
								<div>
									비회원가 <span>{data.content.nonMemberPrice}원</span>
								</div>
								<div>
									<span>{data.content.discountRate}</span> 회원할인가
									<span>
										<strong>{data.content.memberPrice}</strong>원
									</span>
								</div>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}

const productWrapCss = css`
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 275px));
`;

const sectionTitleCss = css`
	font-size: 46px;
	text-align: center;
	margin-bottom: 80px;
`;

const productCardCss = css`
	width: 100%;
	max-width: 275px;
	margin-left: -1px;
	margin-bottom: -1px;
	border: 1px solid #ddd;
	box-sizing: border-box;
`;

const productInfoCss = css`
	padding: 20px;
	box-sizing: border-box;
`;

const productImgCss = css`
	width: 100%;
	max-width: 275px;
`;
