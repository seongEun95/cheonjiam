/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { plusCount } from '../redux/slice/countSlice';
import ProductCard from '../components/ProductCardVertical';

export default function MainPage() {
	const dispatch = useDispatch();
	const count = useSelector((state: RootState) => state.count);

	return (
		<div css={mainWrapCss}>
			메인페이지
			<div>
				<span>{count.count}</span>
				<button
					onClick={() => {
						dispatch(plusCount(count.count));
					}}
				>
					+
				</button>
			</div>
			<div>{/* <ProductCard /> */}</div>
		</div>
	);
}

const mainWrapCss = css`
	min-height: 1000px;
	background-color: #f9f9f9;
`;
