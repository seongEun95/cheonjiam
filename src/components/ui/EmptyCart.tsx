/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { BsCartX } from 'react-icons/bs';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

export default function EmptyCart() {
	const navigate = useNavigate();

	return (
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
					<Button
						onClick={() => {
							navigate('/auth/signin');
						}}
						size="medium"
						kind="secondary"
					>
						로그인 하기
					</Button>
				</div>
			</div>
		</div>
	);
}

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
