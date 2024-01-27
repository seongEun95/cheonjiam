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
	onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export default function TextInput({ id, name, value, type, label, placeHolder, onKeyDown, onChange }: TextInputProps) {
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
				defaultValue={value}
				onKeyDown={onKeyDown}
				onChange={onChange}
			/>
		</div>
	);
}

const labelCss = css`
	display: block;
	font-size: 13px;
	color: #656565;
`;

const inputCss = css`
	width: 100%;
	height: 50px;
	line-height: 50px;
	border: none;
	outline: none;
	border-bottom: 1px solid #e5e5e5;
`;
