/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Product } from '../types/Product.type';
import ProductImg from './ui/ProductImg';
import RateStar from './ui/RateStar';
import DiscountLabel from './ui/DiscountLabel';
import { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItems } from '../redux/slice/cartSlice';

interface ProductCardVerticalProps {
	data: Product;
	onClick?: (cardId: number) => void;
}

export default function ProductCardVertical({ data, onClick }: ProductCardVerticalProps) {
	const dispatch = useDispatch();

	const cartData = {
		src: `https://www.cheonjiyang.co.kr/api/attach/view/product/${data.productSeq}/image/1`,
		name: data.name,
		productId: data.productVersionGroupSeq,
		normalPrice: data.normalPrice,
		memberPrice: data.memberPrice,
		iconClsf: data.iconClsf,
		brandName: data.brandName,
	};

	const [isHover, setIsHover] = useState(false);
	const [isLike, setIsLike] = useState(false);

	const handleClickLike = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setIsLike(prev => !prev);
	};

	const navigate = useNavigate();

	const handleClickLoginNavigation = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		navigate('/auth/signin');
	};

	const handleClickAddCart = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		dispatch(addItems(cartData));
	};

	return (
		<div
			css={productWrapCss}
			onMouseEnter={() => setIsHover(() => true)}
			onMouseLeave={() => setIsHover(() => false)}
			onClick={() => onClick && onClick(data.productVersionGroupSeq)}
		>
			<ProductImg
				src={`https://www.cheonjiyang.co.kr/api/attach/view/product/${data.productSeq}/image/1`}
				alt={data.name}
				productId={data.productVersionGroupSeq}
				isHover={isHover}
			/>

			<div css={descriptionBoxCss}>
				<div css={nameCss}>{data.name}</div>
				<div css={lineWrapperCss}>
					<div css={firtsLineCss}>
						<RateStar reviewAvgRating={data.reviewAvgRating} />
						<span>{`(${data.reviewCount})`}</span>
					</div>
					<div css={secondLineCss}>
						<span>
							비회원가 <span>{data.normalPrice.toLocaleString()}</span>원
						</span>
					</div>
					<div css={thirdLineCss}>
						<DiscountLabel percent={data.memberDcRate} />
						<span>회원할인가</span>
						<span>{`${data.memberPrice.toLocaleString()}원`}</span>
					</div>
				</div>
			</div>

			<div css={iconWrapperCss(isHover)}>
				<div onClick={handleClickLoginNavigation}>
					<img src="/img/icon-payment.png" alt="paymentIcon" />
				</div>
				<div onClick={handleClickAddCart}>
					<img src="/img/icon-cart.png" alt="cartIcon" />
				</div>
				<div css={heartIconCss} onClick={handleClickLike}>
					{isLike ? <FaHeart fill="#d53147" size={20} /> : <FaRegHeart size={20} />}
				</div>
			</div>
		</div>
	);
}

const productWrapCss = css`
	position: relative;
	width: 275px;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: hidden;
	background-color: white;
	border: 1px solid #ccc;
	cursor: pointer;
`;

const descriptionBoxCss = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 235px;
	padding: 25px 30px;
`;

const iconWrapperCss = (isHover: boolean) => css`
	position: absolute;
	top: ${isHover ? 235 : 275}px;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
	width: 100%;
	height: 40px;
	background-color: white;
	transition: all 0.3s ease;
	opacity: ${isHover ? 0.8 : 0};
	z-index: 10;
`;

const heartIconCss = css`
	color: #494848;
`;

const nameCss = css`
	font-size: 18px;
	font-weight: 600;
	line-height: 1.4;
`;

const lineWrapperCss = css`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const firtsLineCss = css`
	display: flex;
	align-items: center;
	gap: 4px;

	span {
		font-size: 10px;
		color: grey;
	}
`;

const secondLineCss = css`
	display: flex;
	align-items: center;
	gap: 4px;
	font-size: 14px;
	color: grey;

	span > span {
		text-decoration: line-through;
	}
`;

const thirdLineCss = css`
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: 13px;

	span:last-of-type {
		font-size: 18px;
		font-weight: 600;
	}
`;
