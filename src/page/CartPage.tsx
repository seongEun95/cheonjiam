/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useSelector } from 'react-redux';

import CartItem from '../components/ui/CartItem';
import { RootState } from '../redux/store';
import { Cart } from '../redux/slice/cartSlice';
import Button from '../components/ui/Button';
import { BsCartX } from 'react-icons/bs';

export default function CartPage() {
	const cartItems = useSelector((state: RootState) => state.cart.items);

	return (
		<div>
			<h2 css={titleCss}>장바구니</h2>
			<div css={cartWrapCss}>
				<div css={itemWrapCss}>
					{cartItems.length === 0 ? (
						<div css={emptyItemWrapCss}>
							<div>
								<div>
									<BsCartX size={40} color="#999" />
								</div>
								<div css={emptyItemTxt}>
									장바구니에 담긴 상품이 없습니다.
									<br /> 다양한 상품을 확인하고 장바구니에 담아보세요!
								</div>
								<div>
									<Button size="medium" kind="secondary">
										로그인 하기
									</Button>
								</div>
							</div>
						</div>
					) : (
						cartItems.map(({ id, isChecked, product, productCount }: Cart) => (
							<CartItem key={id} id={id} isChecked={isChecked} product={product} productCount={productCount} />
						))
					)}
				</div>
				<div css={priceInfoWrapCss}>
					<ul css={priceInfoItemListCss}>
						<li css={priceInfoItemCss}>
							<span css={InfoTitleCss}>전체상품</span>
							<span>
								<span>{cartItems.length}</span>개
							</span>
						</li>
						<li css={priceInfoItemCss}>
							<span css={InfoTitleCss}>상품금액</span>
							<span>
								<span>0</span>원
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
								<span>0</span>원
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
						<Button disabled={cartItems.length === 0 && true} size="xlarge">
							주문하기
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

const cartWrapCss = css`
	display: flex;
	align-items: flex-start;
	gap: 40px;
`;

const titleCss = css`
	font-size: 40px;
	margin: 80px 0 120px;
	text-align: center;
`;

const itemWrapCss = css`
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding-top: 30px;
	border-top: 1px solid #aaa;
`;

const emptyItemWrapCss = css`
	width: 760px;
	height: 300px;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

const emptyItemTxt = css`
	margin: 20px 0;
	line-height: 1.5;
`;

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
