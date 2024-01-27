/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { CartList } from '../../redux/slice/cartSlice';
import Button from './Button';

type PriceInfoProps = {
	cartItems: CartList;
};

export default function PriceInfo({ cartItems }: PriceInfoProps) {
	const productCount = cartItems.filter(item => item.isChecked).length;
	const priceTotal = cartItems.reduce(
		(acc, cur) => (cur.isChecked ? acc + cur.product.normalPrice * cur.productCount : acc),
		0,
	);

	return (
		<div css={priceInfoWrapCss}>
			<ul css={priceInfoItemListCss}>
				<li css={priceInfoItemCss}>
					<span css={InfoTitleCss}>전체상품</span>
					<span>
						<span>{productCount}</span>개
					</span>
				</li>
				<li css={priceInfoItemCss}>
					<span css={InfoTitleCss}>상품금액</span>
					<span>
						<span>{priceTotal.toLocaleString()}</span>원
					</span>
				</li>
				<li css={priceInfoItemCss}>
					<span css={InfoTitleCss}>배송비</span>
					<span>
						<span>3,000</span>원
					</span>
				</li>
			</ul>
			<ul css={priceInfoItemListCss}>
				<li css={priceInfoItemCss}>
					<span css={InfoTitleCss}>결제 예정 금액</span>
					<span>
						<span>{(priceTotal + 3000).toLocaleString()}</span>원
					</span>
				</li>
				<li css={priceInfoItemCss}>
					<span css={InfoTitleCss}>적립 예정 마일리지</span>
					<span>
						<span>0</span>원
					</span>
				</li>
			</ul>
			<div css={orderWrapCss}>
				<Button disabled={productCount === 0 && true} size="xlarge">
					주문하기
				</Button>
			</div>
		</div>
	);
}

const priceInfoWrapCss = css`
	width: 300px;
	padding: 26px;
	border: 1px solid #ccc;
`;

const priceInfoItemListCss = css`
	display: flex;
	flex-direction: column;

	&:first-of-type {
		margin-bottom: 20px;
		border-bottom: 1px solid #e5e5e5;
	}
`;

const priceInfoItemCss = css`
	display: flex;
	justify-content: space-between;
	margin-bottom: 16px;
`;

const InfoTitleCss = css`
	font-size: 15px;
	color: #656565;
`;

const orderWrapCss = css`
	margin-top: 20px;
	padding-bottom: 30px;
	border-bottom: 1px solid #201f1f;
`;
