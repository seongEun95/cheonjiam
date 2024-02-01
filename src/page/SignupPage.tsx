/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useEffect, useState } from 'react';
import TextInput from '../components/ui/TextInput';
import Button from '../components/ui/Button';
import axios from 'axios';
import { rEmail, rPassword } from '../util/regexp';
import { useNavigate } from 'react-router-dom';
import { SHA256 } from 'crypto-js';
import { useDispatch } from 'react-redux';
import { allChangeModal, showModal } from '../redux/slice/modalSlice';

export default function SignupPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [signupInput, setSignupInput] = useState({
		email: { value: '', message: '' },
		password: { value: '', message: '' },
	});

	useEffect(() => {
		if (signupInput.email.value.length > 0 || signupInput.password.value.length > 0) {
			setSignupInput(prev => ({
				...prev,
				email: { ...prev.email, message: '' },
				password: { ...prev.password, message: '' },
			}));
		}
	}, [signupInput.email.value, signupInput.password.value]);

	const handleChangeSignupInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setSignupInput(prev => ({ ...prev, [name]: { ...prev[name as 'email' | 'password'], value } }));

		console.log(signupInput);
	};

	const handleClickSignup = () => {
		if (!rEmail.test(signupInput.email.value)) {
			return setSignupInput(prev => ({
				...prev,
				email: { ...prev.email, message: '올바른 이메일 형식이 아닙니다.' },
			}));
		}

		if (!rPassword.test(signupInput.password.value)) {
			return setSignupInput(prev => ({
				...prev,
				password: {
					...prev.password,
					message: '비밀번호는 영문, 숫자, 특수기호 조합 8자리 이상 15자리 이하로 작성해주세요.',
				},
			}));
		}

		axios
			.post('http://localhost:8000/auth/signup', {
				email: signupInput.email.value,
				password: SHA256(signupInput.password.value).toString(),
			})
			.then(res => {
				if (res.data === 'ok') {
					dispatch(
						allChangeModal({
							isShow: true,
							title: '회원가입 완료',
							content: '로그인 페이지로 이동합니다.',
							confirm: () => {
								navigate('/auth/signin');
								dispatch(showModal(false));
							},
						}),
					);
				}
			})
			.catch(err => {
				if (err.response.data.message === `${signupInput.email.value} already exists`) {
					return setSignupInput(prev => ({
						...prev,
						email: { ...prev.email, message: '이미 존재하는 이메일 입니다.' },
					}));
				}

				console.log(err);
			});
	};

	return (
		<div css={signWrapCss}>
			<div>
				<h2 css={loginTxtCss}>회원가입</h2>
			</div>
			<div>
				<div css={firstInputCss}>
					<TextInput
						id="sign_in_id"
						name="email"
						value={signupInput.email.value}
						label="아이디(이메일)"
						placeHolder="아이디(이메일) 입력"
						type="text"
						onChange={handleChangeSignupInput}
						message={signupInput.email.message}
					/>
				</div>
				<TextInput
					id="sign_in_pw"
					name="password"
					value={signupInput.password.value}
					label="비밀번호 (영문, 숫자, 특수기호 조합 8자리 이상 15자리 이하)"
					placeHolder="비밀번호 입력"
					type="password"
					onChange={handleChangeSignupInput}
					message={signupInput.password.message}
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

const firstInputCss = css`
	margin-bottom: 40px;
`;

const btnCss = css`
	margin-top: 30px;
	text-align: center;
`;
