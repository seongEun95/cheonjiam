/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import TextInput from '../components/ui/TextInput';
import Button from '../components/ui/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SHA256 } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { rEmail, rPassword } from '../util/regexp';
import { useDispatch } from 'react-redux';
import { allChangeModal, showModal } from '../redux/slice/modalSlice';

export default function SigninPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [signinInput, setSigninInput] = useState({
		email: { value: '', message: '' },
		password: { value: '', message: '' },
	});

	// 입력 시 메시지 초기화
	useEffect(() => {
		if (signinInput.email.value.length === 0) {
			setSigninInput(prev => ({
				...prev,
				email: { ...prev.email, message: '' },
			}));
		}

		if (signinInput.password.value.length === 0) {
			setSigninInput(prev => ({
				...prev,
				password: { ...prev.password, message: '' },
			}));
		}
	}, [signinInput.email.value, signinInput.password.value]);

	// 글 입력 시 상태 변경
	const handleChangeSigninInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setSigninInput(prev => ({ ...prev, [name]: { ...prev[name as 'email' | 'password'], value } }));
	};

	// 로그인 버튼 클릭 시  발생하는 이벤트
	const handleClickLogin = () => {
		if (!rEmail.test(signinInput.email.value)) {
			return setSigninInput(prev => ({
				...prev,
				email: { ...prev.email, message: '올바른 이메일 형식이 아닙니다.' },
			}));
		}

		if (!rPassword.test(signinInput.password.value)) {
			return setSigninInput(prev => ({
				...prev,
				password: {
					...prev.password,
					message: '비밀번호는 영문, 숫자, 특수기호 조합 8자리 이상 15자리 이하로 작성해주세요.',
				},
			}));
		}

		axios
			.post('http://localhost:8000/auth/signin', {
				email: signinInput.email.value,
				password: SHA256(signinInput.password.value).toString(),
			})
			.then(res => {
				localStorage.setItem('at', res.data.at);
				localStorage.setItem('rt', res.data.rt);

				dispatch(
					allChangeModal({
						isShow: true,
						title: '로그인 완료',
						content: '메인페이지로 이동합니다.',
						confirm: () => {
							navigate('/');
							dispatch(showModal(false));
						},
					}),
				);
			})
			.catch(err => {
				if (err.response.data.message === 'Internal server error') {
					dispatch(
						allChangeModal({
							isShow: true,
							title: '서버에러 발생',
							content: '다시 로그인 해주세요.',
							confirm: () => {
								dispatch(showModal(false));
							},
						}),
					);
				}

				if (err.response.data.message === 'Invalid credentials') {
					dispatch(
						allChangeModal({
							isShow: true,
							title: '로그인 오류',
							content: '아이디 또는 비밀번호가 틀렸습니다.',
							confirm: () => {
								dispatch(showModal(false));
							},
						}),
					);
				}

				console.log(err);
			});
	};

	return (
		<div css={signWrapCss}>
			<div>
				<h2 css={loginTxtCss}>로그인</h2>
			</div>
			<div>
				<div css={firstInputCss}>
					<TextInput
						id="sign_in_id"
						name="email"
						label="아이디(이메일)"
						placeHolder="아이디(이메일) 입력"
						type="text"
						value={signinInput.email.value}
						onChange={handleChangeSigninInput}
						message={signinInput.email.message}
					/>
				</div>
				<TextInput
					id="sign_in_pw"
					name="password"
					label="비밀번호 (영문, 숫자, 특수기호 조합 8자리 이상 15자리 이하)"
					placeHolder="비밀번호 입력"
					type="password"
					value={signinInput.password.value}
					onChange={handleChangeSigninInput}
					message={signinInput.password.message}
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

const firstInputCss = css`
	margin-bottom: 40px;
`;

const btnCss = css`
	margin-top: 30px;
	text-align: center;
`;
