/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import ButtonChallenge from './Button';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface modalProps {
	isShow?: boolean;
	modalTitle?: string;
	children?: React.ReactNode;
	onConfirm?: () => void;
	onClose?: () => void;
}

export function Modal({ isShow, modalTitle, children, onConfirm, onClose }: modalProps) {
	return (
		<React.Fragment>
			{isShow && (
				<div css={modalWrap}>
					<h1 css={title}>{modalTitle}</h1>
					<button onClick={onClose} css={closeBtn}>
						<AiOutlineClose />
					</button>
					<div css={content}>{children}</div>
					<ul css={btnWrap}>
						<li css={btnLi}>
							<ButtonChallenge onClick={onConfirm} kind="primary">
								확인
							</ButtonChallenge>
						</li>
						<li css={btnLi}>
							<ButtonChallenge onClick={onClose} kind="secondary">
								취소
							</ButtonChallenge>
						</li>
					</ul>
				</div>
			)}
		</React.Fragment>
	);
}

const modalWrap = css`
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

const title = css`
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

const content = css`
	font-size: 16px;
	min-height: 150px;
`;

const btnWrap = css`
	display: flex;
	justify-content: space-between;
`;

const btnLi = css`
	flex: 1;
`;
