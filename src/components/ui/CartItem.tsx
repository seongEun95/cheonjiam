/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import ProductLabel from '../horizontalCardUi/ProductLabel';
import { Cart, isCheckedChange, removeItems } from '../../redux/slice/cartSlice';
import { useDispatch } from 'react-redux';
import Button from './Button';
import ProductCount from './ProductCount';
import GiftBtn from './GiftBtn';

export default function CartItem({ id, isChecked, product, productCount }: Cart) {
	const [isLike, setIsLike] = useState(false);

	const dispatch = useDispatch();

	const handleClickLike = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setIsLike(prev => !prev);
	};

	const handleClickRemoveCart = () => {
		dispatch(removeItems(id));
	};

	const handleChangeChecked = () => {
		dispatch(isCheckedChange(id));
	};

	return (
		<div css={itemCss} key={id}>
			<div>
				<input onChange={handleChangeChecked} css={checkboxCss} type="checkbox" />
				<img
					css={imgCss}
					src={`https://www.cheonjiyang.co.kr/api/attach/view/product/${product.productSeq}/image/1`}
					alt={product.name}
				/>
			</div>
			<div>
				<div css={firstLineCss}>
					<ProductLabel label={product.iconClsf} />
					<div css={iconWrapCss}>
						<span css={iconCss} onClick={handleClickLike}>
							{isLike ? <FaHeart fill="#d53147" size={20} /> : <FaRegHeart size={20} />}
						</span>
						<span onClick={handleClickRemoveCart} css={iconCss}>
							<IoClose size={28} />
						</span>
					</div>
				</div>
				<div css={secondLineCss}>
					<div css={titleWrapCss}>
						<div>{product.brandName}</div>
						<div css={itemTitleCss}>
							{id}번 {product.name}
						</div>
					</div>
					<div css={priceWrapCss}>
						<div css={priceCss}>{(product.normalPrice * productCount).toLocaleString()}원</div>
						<ProductCount id={id} productCount={productCount} />
					</div>
				</div>

				<div css={btnWrapCss}>
					<GiftBtn />
					<Button size="small">바로구매</Button>
				</div>
			</div>
		</div>
	);
}

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
