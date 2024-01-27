/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import TextInput from '../components/ui/TextInput';
import Button from '../components/ui/Button';
import { useState } from 'react';
import axios from 'axios';
import { SHA256 } from 'crypto-js';
import { useNavigate } from 'react-router-dom';

export default function SigninPage() {
	const navigate = useNavigate();
	const [signinInput, setSigninInput] = useState({
		email: '',
		password: '',
	});

	const handleChangeSigninInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setSigninInput(prev => ({
			...prev,
			[name]: value,
		}));
		console.log(signinInput);
	};

	const handleClickLogin = () => {
		axios
			.post('http://localhost:8000/auth/signin', {
				email: signinInput.email,
				password: signinInput.password,
			})
			.then(res => {
				localStorage.setItem('ac', res.data.at);
				navigate('/');
			})
			.catch(err => console.log(err));
	};

	return (
		<div css={signWrapCss}>
			<div>
				<h2 css={loginTxtCss}>로그인</h2>
			</div>
			<div>
				<TextInput
					id="sign_in_id"
					name="email"
					label="아이디(이메일)"
					placeHolder="아이디(이메일) 입력"
					type="text"
					value={signinInput.email}
					onChange={handleChangeSigninInput}
				/>
				<TextInput
					id="sign_in_pw"
					name="password"
					label="비밀번호"
					placeHolder="비밀번호 입력"
					type="password"
					value={signinInput.password}
					onChange={handleChangeSigninInput}
				/>
				<div css={btnCss}>
					<Button onClick={handleClickLogin}>로그인</Button>
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
