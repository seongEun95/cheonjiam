/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductLabel from '../components/horizontalCardUi/ProductLabel';
import Button from '../components/ui/Button';
import GiftBtn from '../components/ui/GiftBtn';
import { useDispatch } from 'react-redux';
import { Cart, addItems } from '../redux/slice/cartSlice';
import ProductCount from '../components/ui/ProductCount';
import axios from 'axios';
import { ProductHorizontalList } from '../types/ProductHorizontal.type';

export default function DetailPage() {
	const { id } = useParams();

	const dispatch = useDispatch();
	const [productCount, setproductCount] = useState(1);
	const [newData, setNewData] = useState<ProductHorizontalList>([]);
	const detailData = newData.filter(item => item.productVersionGroupSeq === Number(id))[0];

	const [load, setLoad] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setError(false);
		setLoad(true);
		const at = localStorage.getItem('at');
		axios
			.get(`http://localhost:8000/hongsam`, {
				headers: { Authorization: `Bearer ${at}` },
			})
			.then(res => {
				setNewData(res.data);
				setLoad(false);
			})
			.catch(err => {
				console.error(err);
				setError(true);
			});
	}, []);

	const handleClickAddCart = () => {
		const cartData: Cart = {
			id: detailData.productVersionGroupSeq,
			isChecked: false,
			product: detailData,
			productCount,
		};
		dispatch(addItems(cartData));
	};

	const handleClickMinusProductCount = () => {
		setproductCount(prev => (prev > 1 ? prev - 1 : prev));
	};

	const handleClickPlusProductCount = () => {
		setproductCount(prev => prev + 1);
	};

	return (
		<div>
			{error ? <div>Error</div> : load && <div css={loadingCss}>loading</div>}

			{detailData && (
				<div>
					<div css={detailPageWrapCss} key={detailData.productVersionGroupSeq}>
						<div>
							<img
								src={`https://www.cheonjiyang.co.kr/api/attach/view/product/${detailData.productSeq}/image/1`}
								alt={detailData.name}
								css={detailImgCss}
							/>
						</div>
						<div>
							<div>
								<div>
									<ProductLabel label={detailData.iconClsf} />
								</div>
								<div css={brandNameCss}>{detailData.brandName}</div>
								<div css={productNameCss}>{detailData.name}</div>
								<div css={normalPriceWrapCss}>
									<span>비회원가</span>
									<span css={normalPriceCss}>{detailData.normalPrice.toLocaleString()}원</span>
								</div>
								<div css={memberPriceWrapCss}>
									<p>회원가</p>
									<span css={discountRateCss}>{detailData.memberDcRate}%</span>
									<span>
										<span css={memberPriceCss}>{detailData.memberPrice.toLocaleString()}</span>원
									</span>
								</div>
							</div>
							<div css={infoCss}>
								<div>
									<span css={[infoSubTxtCss, benefitCss]}>적립혜택</span> <span>회원가입 시 0원 적립!</span>
								</div>
								<div>
									<span css={infoSubTxtCss}>배송비</span> <span>3,500원 (30,000원이상 무료배송)</span>
								</div>
							</div>
							<div css={productCountWrapCss}>
								<ProductCount
									productCount={productCount}
									onClickLeft={handleClickMinusProductCount}
									onClickRight={handleClickPlusProductCount}
								/>
								<div>
									<span css={finalPriceCss}>{(detailData.normalPrice * productCount).toLocaleString()}</span>
									<span>원</span>
								</div>
							</div>
							<div css={buttonWrapCss}>
								<Button size="large">바로구매</Button>
								<div css={bottomBtnCss}>
									<Button onClick={handleClickAddCart} size="medium" kind="secondary">
										장바구니
									</Button>
									<GiftBtn size="large" />
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

const detailPageWrapCss = css`
	display: flex;
	gap: 60px;
`;

const detailImgCss = css`
	width: 750px;
	height: 750px;
`;

const brandNameCss = css`
	font-weight: 500;
	margin-top: 40px;
`;

const productNameCss = css`
	font-size: 24px;
	font-weight: 400;
	line-height: 1.3;
	margin: 10px 0 30px;
`;

const normalPriceWrapCss = css`
	font-size: 14px;
	color: #959595;
`;

const normalPriceCss = css`
	display: inline-block;
	margin-left: 20px;
	text-decoration: line-through;
`;

const memberPriceWrapCss = css`
	margin: 20px 0;
	padding-bottom: 20px;
	border-bottom: 1px solid #eaeaea;
`;

const discountRateCss = css`
	display: inline-block;
	font-size: 28px;
	color: #d53147;
	font-weight: 400;
	margin: 10px 14px 0 0;
`;

const memberPriceCss = css`
	font-size: 28px;
	color: #221e1f;
`;

const infoCss = css`
	font-size: 14px;
	margin-bottom: 30px;
`;

const infoSubTxtCss = css`
	margin-right: 30px;
	color: #959595;
`;

const productCountWrapCss = css`
	display: flex;
	align-items: center;
	gap: 40px;
`;

const benefitCss = css`
	display: inline-block;
	margin: 0px 17px 10px 0;
`;

const finalPriceCss = css`
	font-size: 32px;
	font-weight: 400;
`;

const buttonWrapCss = css`
	margin-top: 60px;
`;

const bottomBtnCss = css`
	display: flex;
	align-items: center;
	gap: 7px;
	margin-top: 7px;
`;

const loadingCss = css`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 200px;
	height: 200px;
	line-height: 200px;
	color: #fff;
	border-radius: 100%;
	background-color: #d53147;
	z-index: 10;
	text-align: center;
	animation: opacity 0.4s infinite alternate;

	@keyframes opacity {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`;
