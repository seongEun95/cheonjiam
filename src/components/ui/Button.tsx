/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react'; // 이모션 사용

// 버튼 타입 별도 선언
export type ButtonType = 'primary' | 'secondary';

// 버튼 사이즈 별도 선언
export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge';

type ButtonProps = {
	children: React.ReactNode;
	kind?: ButtonType;
	size?: ButtonSize;
	disabled?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
	children,
	kind = 'primary',
	size = 'medium',
	disabled = false,
	onClick,
}: ButtonProps) {
	return (
		<button onClick={onClick} disabled={disabled} css={[commonCss, getCssKind(kind), getCssSize(size)]}>
			{children}
		</button>
	);
}
// switch 문을 활용한 버튼 종류 조건부 렌더링
const getCssKind = (kind: ButtonType) => {
	switch (kind) {
		case 'primary':
			return primaryCss;
		case 'secondary':
			return secondaryCss;
	}
};

const primaryCss = css`
	color: #fff;
	background-color: #201f1f;
	border: 1px solid #201f1f;
	transition: 0.3s;

	&:hover {
		color: #201f1f;
		background-color: #fff;
		border: 1px solid #201f1f;
	}
`;

const secondaryCss = css`
	background-color: #fff;
	color: #201f1f;
	border: 1px solid #201f1f;
	transition: 0.3s;

	&:hover {
		box-shadow: 3px 3px 10px #201f1f39;
	}
`;

// 버튼 사이즈 조건부 렌더링
const getCssSize = (size: ButtonSize) => {
	switch (size) {
		case 'small':
			return smallCss;
		case 'medium':
			return mediumCss;
		case 'large':
			return largeCss;
		case 'xlarge':
			return xlargeCss;
	}
};

const smallCss = css`
	font-size: 14px;
	max-width: 110px;
	padding: 10px 0;
`;

const mediumCss = css`
	padding: 14px 0;
	max-width: 213px;
`;

const largeCss = css`
	padding: 18px 0;
	max-width: 270px;
`;

const xlargeCss = css`
	padding: 18px 0;
`;

const commonCss = () => css`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	width: 100%;
	font-size: 16px;
	border: none;
	cursor: pointer;

	&:disabled {
		background-color: #ddd;
		color: #aaa;
		border: 1px solid #ddd;
		cursor: not-allowed;

		&:hover {
			background-color: #ddd;
			color: #aaa;
			border: 1px solid #ddd;
		}
	}
`;
