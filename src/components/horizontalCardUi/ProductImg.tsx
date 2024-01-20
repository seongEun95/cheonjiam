/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiHeartOutline } from 'react-icons/ti';
import { TiHeartFullOutline } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { Product } from '../../types/Product.type';
import { addItems } from '../../redux/slice/cartSlice';

type ProductImgProps = {
	ProductData: Product;
	isHover: boolean;
};

export default function ProductImg({ ProductData, isHover }: ProductImgProps) {
	const dispatch = useDispatch();

	const cartData = {
		id: ProductData.productVersionGroupSeq,
		isChecked: false,
		product: {
			name: ProductData.name,
			normalPrice: ProductData.normalPrice,
			memberPrice: ProductData.memberPrice,
			iconClsf: ProductData.iconClsf,
			brandName: ProductData.brandName,
			productSeq: ProductData.productSeq,
		},
		productCount: 1,
	};

	const navigate = useNavigate();
	const [isHeartFilled, setIsHeartFilled] = useState(false);

	const handleClickStopNavigation = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	const handleClickRedirectToSignin = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		navigate('/auth/signin');
	};

	const handleClickAddCart = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		dispatch(addItems(cartData));
	};

	const heartToggle = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setIsHeartFilled(prev => !prev);
	};

	return (
		<div css={imgWrapCss}>
			<img
				css={imgCss(isHover)}
				src={`https://www.cheonjiyang.co.kr/api/attach/view/product/${ProductData.productSeq}/image/1`}
				alt={ProductData.name}
			/>

			<div onClick={handleClickStopNavigation} css={iconWrapCss(isHover)}>
				<div css={paymentIconCss} onClick={handleClickRedirectToSignin}>
					<img src="/img/icon-payment.png" alt="결제하기" />
				</div>
				<div onClick={handleClickAddCart}>
					<img src="/img/icon-cart.png" alt="선물하기" />
				</div>
				<div css={heartIconCss} onClick={heartToggle}>
					{isHeartFilled ? <TiHeartFullOutline fill="#d53147" size={24} /> : <TiHeartOutline size={24} />}
				</div>
			</div>
		</div>
	);
}

const imgWrapCss = css`
	width: 240px;
	height: 240px;
	overflow: hidden;
	flex-shrink: 0;
`;

const imgCss = (isHover: boolean) => css`
	width: 100%;
	transform: scale(${isHover ? 1.1 : 1});
	transition: all 0.4s;
`;

const iconWrapCss = (isHover: boolean) => css`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20px;
	width: 100%;
	height: 60px;
	transform: ${isHover ? 'translateY(-60px)' : 'translateY(0)'};
	opacity: ${isHover ? 1 : 0};
	background-color: rgba(255, 255, 255, 0.8);
	transition: all 0.4s;
`;

const paymentIconCss = css`
	margin-top: 4px;
`;

const heartIconCss = css`
	margin-top: 2px;
`;
