/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useSelector } from 'react-redux';
import CartItem from '../components/ui/CartItem';
import { RootState } from '../redux/store';
import { Cart } from '../redux/slice/cartSlice';
import EmptyCart from '../components/ui/EmptyCart';
import PriceInfo from '../components/ui/PriceInfo';

export default function CartPage() {
	const cartItems = useSelector((state: RootState) => state.cart.items);

	return (
		<div>
			<h2 css={titleCss}>장바구니</h2>
			<div css={cartWrapCss}>
				<div css={itemWrapCss}>
					{cartItems.length === 0 ? (
						<EmptyCart />
					) : (
						cartItems.map(({ id, isChecked, product, productCount }: Cart) => (
							<CartItem key={id} id={id} isChecked={isChecked} product={product} productCount={productCount} />
						))
					)}
				</div>
				<PriceInfo cartItems={cartItems} />
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
