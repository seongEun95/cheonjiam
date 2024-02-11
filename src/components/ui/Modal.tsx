/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import ButtonChallenge from './Button';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { showModal } from '../../redux/slice/modalSlice';

export function Modal() {
	const dispatch = useDispatch();
	const { isShow, title, content, onConfirm } = useSelector((state: RootState) => state.modal.modal);
	const handleClickPopupClose = () => dispatch(showModal(false));

	return (
		<React.Fragment>
			{isShow && (
				<div css={modalWrapCss}>
					<h1 css={titleCss}>{title}</h1>
					<button onClick={handleClickPopupClose} css={closeBtn}>
						<AiOutlineClose />
					</button>
					<div css={contentCss}>{content}</div>
					<ul css={btnWrapCss}>
						<li css={btnLiCss}>
							<ButtonChallenge onClick={onConfirm} kind="primary">
								확인
							</ButtonChallenge>
						</li>
						<li css={btnLiCss}>
							<ButtonChallenge onClick={handleClickPopupClose} kind="secondary">
								취소
							</ButtonChallenge>
						</li>
					</ul>
				</div>
			)}
		</React.Fragment>
	);
}

const modalWrapCss = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	max-width: 300px;
	padding: 30px 20px;
	background: #222;
	color: #fff;
	border: 1px solid #ccc;
	border-radius: 10px;
`;

const titleCss = css`
	font-size: 24px;
	margin-bottom: 14px;
	padding-bottom: 10px;
	border-bottom: 1px solid #999;
`;

const closeBtn = css`
	position: absolute;
	top: 25px;
	right: 20px;
	font-size: 20px;
	color: #fff;
	cursor: pointer;
`;

const contentCss = css`
	font-size: 16px;
	min-height: 150px;
`;

const btnWrapCss = css`
	display: flex;
	justify-content: space-between;
`;

const btnLiCss = css`
	flex: 1;
`;
