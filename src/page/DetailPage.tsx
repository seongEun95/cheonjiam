/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { ProductList } from '../types/Product.type';
import { PRODUCT_DATA } from '../data/productSample';
import { useState } from 'react';
import ProductLabel from '../components/horizontalCardUi/ProductLabel';
import ProductCount from '../components/ui/ProductCount';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import Button from '../components/ui/Button';
import GiftBtn from '../components/ui/GiftBtn';
import { useDispatch } from 'react-redux';
import { addItems } from '../redux/slice/cartSlice';

export default function DetailPage() {
	const { id } = useParams();

	const dispatch = useDispatch();
	const [cartCount, setCartCount] = useState(1);
	const [data] = useState<any>(PRODUCT_DATA.filter(item => item.productVersionGroupSeq === Number(id)));

	console.log(data);

	const cartData = {
		id: id,
		isChecked: false,
		product: {
			name: data[0].name,
			normalPrice: data[0].normalPrice,
			memberPrice: data[0].memberPrice,
			iconClsf: data[0].iconClsf,
			brandName: data[0].brandName,
			productSeq: data[0].productSeq,
		},
		productCount: cartCount,
	};

	const handleClickAddCart = () => {
		dispatch(addItems(cartData));
	};

	const handleClickMinusProductCount = () => {
		setCartCount(prev => (prev > 1 ? prev - 1 : prev));
	};

	const handleClickPlusProductCount = () => {
		setCartCount(prev => prev + 1);
	};

	return (
		<div>
			{data.map((data: any) => (
				<div css={detailPageWrapCss} key={data.productVersionGroupSeq}>
					<div>
						<img
							src={`https://www.cheonjiyang.co.kr/api/attach/view/product/${data.productSeq}/image/1`}
							alt={data.name}
						/>
					</div>
					<div>
						<div>
							<div>
								<ProductLabel label={data.iconClsf} />
							</div>
							<div css={brandNameCss}>{data.brandName}</div>
							<div css={productNameCss}>{data.name}</div>
							<div css={normalPriceWrapCss}>
								<span>비회원가</span>
								<span css={normalPriceCss}>{data.normalPrice.toLocaleString()}원</span>
							</div>
							<div css={memberPriceWrapCss}>
								<p>회원가</p>
								<span css={discountRateCss}>{data.memberDcRate}%</span>
								<span>
									<span css={memberPriceCss}>{data.memberPrice.toLocaleString()}</span>원
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
							<div css={plusMinusBtnWrapCss}>
								<span onClick={handleClickMinusProductCount} css={plusMinusBtnCss}>
									<CiCircleMinus size={26} />
								</span>
								<span css={productCountCss}>{cartCount}</span>
								<span onClick={handleClickPlusProductCount} css={plusMinusBtnCss}>
									<CiCirclePlus size={26} />
								</span>
							</div>
							<div>
								<span css={finalPriceCss}>{(data.normalPrice * cartCount).toLocaleString()}</span>
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
			))}
		</div>
	);
}

const detailPageWrapCss = css`
	display: flex;
	gap: 60px;
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

const plusMinusBtnWrapCss = css`
	display: flex;
	align-items: center;
	gap: 14px;
`;

const plusMinusBtnCss = css`
	cursor: pointer;
`;

const productCountCss = css`
	width: 20px;
	text-align: center;
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
