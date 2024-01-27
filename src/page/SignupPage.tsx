/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState } from 'react';
import TextInput from '../components/ui/TextInput';
import Button from '../components/ui/Button';
import axios from 'axios';

export default function SignupPage() {
	const [signupInput, setSignupInput] = useState({
		email: '',
		password: '',
	});

	const handleChangeSigninInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setSignupInput(prev => ({
			...prev,
			[name]: value,
		}));
		console.log(signupInput);
	};

	const handleClickSignup = () => {
		axios
			.post('http://localhost:8000/auth/signup', {
				email: signupInput.email,
				password: signupInput.password,
			})
			.then(res => {
				if (res.data === 'ok') console.log('회원가입 완료');
			})
			.catch(err => console.log(err));
	};

	return (
		<div css={signWrapCss}>
			<div>
				<h2 css={loginTxtCss}>회원가입</h2>
			</div>
			<div>
				<TextInput
					id="sign_in_id"
					name="email"
					label="아이디(이메일)"
					placeHolder="아이디(이메일) 입력"
					type="text"
					value={signupInput.email}
					onChange={handleChangeSigninInput}
				/>
				<TextInput
					id="sign_in_pw"
					name="password"
					label="비밀번호"
					placeHolder="비밀번호 입력"
					type="password"
					value={signupInput.password}
					onChange={handleChangeSigninInput}
				/>
				<div css={btnCss}>
					<Button onClick={handleClickSignup}>회원가입</Button>
				</div>
			</div>
		</div>
	);
}

const signWrapCss = css`
	width: 100%;
	max-width: 440px;
	margin: 0 auto;
`;

const loginTxtCss = css`
	font-size: 40px;
	text-align: center;
	margin-bottom: 80px;
`;

const btnCss = css`
	margin-top: 30px;
	text-align: center;
`;
