/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { IoMdArrowDropright } from 'react-icons/io';
import SelectBox from './ui/SelectBox';

export default function Footer() {
	return (
		<footer css={footerWrapCss}>
			<div css={footerTopCss}>
				<ul css={footerTopListCss}>
					<li>
						<Link css={footerTopListTxtCss} to={'#'}>
							이용약관
						</Link>
					</li>
					<li>
						<Link css={footerTopListTxtCss} to={'#'}>
							개인정보처리방침
						</Link>
					</li>
					<li>
						<Link css={footerTopListTxtCss} to={'#'}>
							이용안내
						</Link>
					</li>
					<li>
						<Link css={footerTopListTxtCss} to={'#'}>
							광고제휴문의
						</Link>
					</li>
				</ul>
				<SelectBox size="medium" title="FAMILY SITE" optionArray={['스키니랩', '피트니스 스토어', '천지양']} />
			</div>

			<div css={footerBottomCss}>
				<div>
					<div css={footerLogoWrapCss}>
						<h2>
							<img css={footerLogoImgCss} src="/img/logo-footer.png" alt="HEALTH BALANCE" />
						</h2>
					</div>
					<div>
						<ul css={companyInfoCss}>
							<li css={companyInfoListCss}>
								<span css={companyInfoListTxtCss}>상호명 : 헬스밸런스(주)</span>{' '}
								<span>서울특별시 강남구 영동대로 551 (트레이드타워) 2104</span>
							</li>
							<li css={companyInfoListCss}>
								<span css={companyInfoListTxtCss}>대표자 : 조원희</span>
								<span css={companyInfoListTxtCss}>개인정보관리책임자 : 박웅</span>
								<span css={companyInfoListTxtCss}>사업자등록번호 : 314-81-84285</span>{' '}
								<Link css={businessInfoCheckCss} to={'#'}>
									사업자정보확인
									<IoMdArrowDropright css={iconCss} size={24} />
								</Link>
							</li>
							<li css={companyInfoListCss}>
								<span css={companyInfoListTxtCss}>통신판매업 : 2016-서울강남-02455</span>
								<span css={companyInfoListTxtCss}>대표전화 : 070-8233-2213</span>
								<span>FAX : 02-2071-3699</span>
							</li>
							<li css={companyInfoListCss}>
								<span>E-mail : wpark@hbalance.co.kr</span>
							</li>
						</ul>
					</div>

					<div css={inipayInfoCss}>
						<div>
							<Link to={'#'}>
								<img src="/img/logo-inipay.png" alt="이니페이" />
							</Link>
						</div>
						<div>
							<Link to={'#'}>
								<img src="/img/logo-escrow.png" alt="에스크로" />
							</Link>
						</div>
						<div>
							<p css={inipayTxtCss}>
								KG이니시스가 제공하는 결제시스템을 사용하고 있는 쇼핑몰임을 확인하여 <br />
								소비자들은 안심하고 결제할 수 있습니다.
							</p>
						</div>
					</div>
				</div>

				<div>
					<h4 css={contactNumberCss}>070-8233-2213</h4>
					<ul>
						<li css={timeCss}>
							<span>평일(주말제외)</span> <span css={weekdayCss}>09:30 ~ 18:00</span>
						</li>
						<li css={timeCss}>
							<span>점심시간</span> <span css={lunchTimeCss}>12:30 ~ 13:30</span>
						</li>
					</ul>
					<p css={closedDayCss}>※ 토/일/공휴일 휴무</p>
				</div>
			</div>
		</footer>
	);
}

const footerWrapCss = css`
	width: 96%;
	max-width: 1100px;
	margin: 0 auto;
	padding: 30px 0 90px;
`;

const footerTopCss = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	min-height: 50px;
	margin-bottom: 60px;
	border-bottom: 1px solid #e5e5e5;
`;

const footerTopListCss = css`
	display: flex;
	gap: 40px;
`;

const footerTopListTxtCss = css`
	font-weight: 400;
	transition: all 0.5s;

	&:hover {
		font-weight: 500;
	}
`;

const footerBottomCss = css`
	display: flex;
	justify-content: space-between;
`;

const footerLogoWrapCss = css`
	margin-bottom: 30px;
`;

const footerLogoImgCss = css`
	width: 240px;
`;

const companyInfoCss = css`
	margin-bottom: 40px;
`;

const companyInfoListCss = css`
	font-size: 14px;
	color: #656565;
	margin-bottom: 12px;
`;

const companyInfoListTxtCss = css`
	margin-right: 12px;
`;

const businessInfoCheckCss = css`
	position: relative;
	color: #000;

	&:hover {
		font-weight: 500;
		text-decoration: underline;
	}
`;

const iconCss = css`
	position: absolute;
	top: -3px;
	right: -20px;
`;

const inipayInfoCss = css`
	display: flex;
	align-items: center;
	gap: 8px;
`;

const inipayTxtCss = css`
	font-size: 12px;
	line-height: 1.6;
	color: #959595;
	margin-left: 12px;
`;

const contactNumberCss = css`
	font-size: 32px;
	font-weight: 500;
	margin-top: 10px;
	margin-bottom: 40px;
`;

const timeCss = css`
	font-size: 15px;
	color: #656565;
	margin-bottom: 12px;
`;

const weekdayCss = css`
	font-family: 'Nanum Myeongjo';
	margin-left: 36px;
`;

const lunchTimeCss = css`
	font-family: 'Nanum Myeongjo';
	margin-left: 78px;
`;

const closedDayCss = css`
	font-size: 14px;
	color: #959595;
	margin-top: 18px;
`;
