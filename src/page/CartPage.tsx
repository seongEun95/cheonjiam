/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useSelector } from 'react-redux';
import ProductLabel from '../components/horizontalCardUi/ProductLabel';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { GoGift } from 'react-icons/go';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';

export default function CartPage() {
	const [isLike, setIsLike] = useState(false);
	const cartItems = useSelector((state: any) => state.cart.items);

	const [productCount, setProductCount] = useState(1);

	const handleClickLike = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setIsLike(prev => !prev);
	};

	const handleClickMinus = () => {
		setProductCount(prev => prev - 1);
	};

	const handleClickPlus = () => {
		setProductCount(prev => prev + 1);
	};

	return (
		<div>
			<h2 css={titleCss}>장바구니</h2>
			<div css={cartWrapCss}>
				<div css={itemWrapCss}>
					{cartItems.map((item: any, index: number) => (
						<div css={itemCss} key={item.productId}>
							<div>
								<input css={checkboxCss} type="checkbox" />
								<img css={imgCss} src={item.src} alt={item.name} />
							</div>
							<div>
								<div css={firstLineCss}>
									<ProductLabel label={item.iconClsf} />
									<div css={iconWrapCss}>
										<span css={iconCss} onClick={handleClickLike}>
											{isLike ? <FaHeart fill="#d53147" size={20} /> : <FaRegHeart size={20} />}
										</span>
										<span css={iconCss}>
											<IoClose size={28} />
										</span>
									</div>
								</div>
								<div css={secondLineCss}>
									<div css={titleWrapCss}>
										<div>{item.brandName}</div>
										<div css={itemTitleCss}>{item.name}</div>
									</div>
									<div css={priceWrapCss}>
										<div css={priceCss}>{item.normalPrice * productCount}원</div>
										<div css={plusMinusBtnWrapCss}>
											<span onClick={handleClickMinus} css={plusMinustnCss}>
												<CiCircleMinus size={26} />
											</span>
											<span css={productCountCss}>{productCount}</span>
											<span onClick={handleClickPlus} css={plusMinustnCss}>
												<CiCirclePlus size={26} />
											</span>
										</div>
									</div>
								</div>
								<div css={btnWrapCss}>
									<button css={giftBtnCss}>
										<GoGift size={22} />
									</button>
									<button css={purchaseBtnCss}>바로구매</button>
								</div>
							</div>
						</div>
					))}
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
						<button css={orderCss}>주문하기</button>
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

const itemCss = css`
	display: flex;
	gap: 20px;
	padding-bottom: 14px;
	border-bottom: 1px solid #e5e5e5;
`;

const checkboxCss = css`
	vertical-align: top;
`;

const imgCss = css`
	width: 120px;
	height: 120px;
`;

const firstLineCss = css`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

const iconWrapCss = css`
	display: flex;
	align-items: center;
	gap: 4px;
`;

const iconCss = css`
	cursor: pointer;
`;

const secondLineCss = css`
	display: flex;
	justify-content: space-between;
	margin: 10px 0 20px;
`;

const titleWrapCss = css`
	width: 500px;
`;

const itemTitleCss = css`
	font-size: 16px;
	font-weight: 600;
	margin-top: 10px;
`;

const priceCss = css`
	font-size: 18px;
	font-weight: 500;
	margin-bottom: 16px;
`;

const plusMinusBtnWrapCss = css`
	display: flex;
	align-items: center;
	gap: 14px;
`;

const plusMinustnCss = css`
	cursor: pointer;
`;

const productCountCss = css`
	width: 20px;
	text-align: center;
`;

const priceWrapCss = css`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;

const btnWrapCss = css`
	display: flex;
	justify-content: flex-end;
	gap: 10px;
`;

const giftBtnCss = css`
	padding-top: 3px;
	border: 1px solid #ccc;
`;

const purchaseBtnCss = css`
	width: 120px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	font-size: 14px;
	color: #fff;
	background-color: #201f1f;
	border: 1px solid #201f1f;
	transition: all 0.3s;

	&:hover {
		color: #201f1f;
		background-color: #fff;
	}
`;

const priceInfoWrapCss = css`
	width: 300px;
	padding: 26px;
	border: 1px solid #ccc;
`;

const priceInfoItemListCss = css`
	display: flex;
	flex-direction: column;
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
	margin-top: 40px;
	padding-bottom: 30px;
	border-bottom: 1px solid #201f1f;
`;

const orderCss = css`
	width: 240px;
	height: 50px;
	font-size: 16px;
	line-height: 50px;
	color: #fff;
	background-color: #201f1f;
	border: 1px solid #201f1f;
	transition: all 0.3s;

	&:hover {
		color: #201f1f;
		background-color: #fff;
	}
`;
