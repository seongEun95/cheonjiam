/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { GoGift } from 'react-icons/go';

export type GiftBtnSize = 'small' | 'medium' | 'large';

type GiftBtnProps = {
	size?: GiftBtnSize;
};

export default function GiftBtn({ size = 'small' }: GiftBtnProps) {
	return (
		<button css={[giftCommonCss, getCssSize(size)]}>
			<GoGift size={22} />
		</button>
	);
}

const getCssSize = (size: GiftBtnSize) => {
	switch (size) {
		case 'small':
			return smallGiftBtnCss;
		case 'medium':
			return mediumGiftBtnCss;
		case 'large':
			return largeGiftBtnCss;
	}
};

const giftCommonCss = css`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const largeGiftBtnCss = css`
	width: 50px;
	height: 50px;
	border: 1px solid #ccc;
`;

const mediumGiftBtnCss = css`
	width: 44px;
	height: 44px;
	border: 1px solid #ccc;
`;

const smallGiftBtnCss = css`
	width: 38px;
	height: 38px;
	border: 1px solid #ccc;
`;
