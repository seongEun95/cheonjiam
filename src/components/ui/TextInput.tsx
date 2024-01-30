/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

export type InputType = 'text' | 'password';

type TextInputProps = {
	id: string;
	name: string;
	value: string;
	type: InputType;
	label: string;
	placeHolder: string;
	message: string;
	onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export default function TextInput({
	id,
	name,
	value,
	type,
	label,
	placeHolder,
	message,
	onKeyDown,
	onChange,
}: TextInputProps) {
	return (
		<div>
			<label css={labelCss} htmlFor={id}>
				{label}
			</label>
			<input
				css={inputCss}
				id={id}
				type={type}
				placeholder={placeHolder}
				name={name}
				value={value}
				onKeyDown={onKeyDown}
				onChange={onChange}
			/>
			{message && <div css={messageCss}>{message}</div>}
		</div>
	);
}

const labelCss = css`
	display: block;
	font-size: 13px;
	margin-bottom: 10px;
	color: #656565;
`;

const inputCss = css`
	width: 100%;
	height: 45px;
	line-height: 45px;
	font-size: 16px;
	border: none;
	outline: none;
	border-bottom: 1px solid #e5e5e5;
	transition: 0.3s;

	&:focus,
	&:hover {
		border-bottom: 1px solid #666;
		box-shadow: 0px 8px 6px -6px #00000035;
	}
`;

const messageCss = css`
	margin: 10px 0;
	font-size: 13px;
`;
