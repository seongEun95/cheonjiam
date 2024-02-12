/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Button from '../components/ui/Button';
import { useDispatch } from 'react-redux';
import { resetUser } from '../redux/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function ProfilePage() {
	const userInfo = useSelector((state: RootState) => state.user.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClickLogout = () => {
		dispatch(resetUser());
		localStorage.removeItem('at');
		localStorage.removeItem('rt');
		navigate('/auth/signin');
	};

	return (
		<div css={profileWrapCss}>
			<div>
				<h2 css={profileTxtCss}>회원정보</h2>
			</div>
			<div>
				<div css={userInfoWrapCss}>
					<div>
						<span css={userInfoTitCss}>아이디</span>
						<span>{userInfo.id}</span>
					</div>
					<div>
						<span css={userInfoTitCss}>이메일</span>
						<span>{userInfo.email}</span>
					</div>
					<div>
						<span css={userInfoTitCss}>생성날짜</span>
						<span>{moment(userInfo.createdAt).format('YYYY년 MM월 DD일')}</span>
					</div>
					<div>
						<span css={userInfoTitCss}>수정날짜</span>
						<span>{moment(userInfo.updatedAt).format('YYYY년 MM월 DD일')}</span>
					</div>
				</div>
				<div css={btnCss}>
					<Button onClick={handleClickLogout}>로그아웃</Button>
				</div>
			</div>
		</div>
	);
}

const profileWrapCss = css`
	width: 100%;
	max-width: 440px;
	margin: 0 auto;
`;

const profileTxtCss = css`
	font-size: 40px;
	text-align: center;
	margin-bottom: 80px;
`;

const userInfoWrapCss = css`
	margin-bottom: 40px;
`;

const userInfoTitCss = css`
	display: inline-block;
	font-size: 18px;
	font-weight: 700;
	margin: 0px 10px 20px 0;
`;

const btnCss = css`
	margin-top: 30px;
	text-align: center;
`;
