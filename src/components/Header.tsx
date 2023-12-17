/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import menuData from '../data/menuData.json';

export default function Header() {
	const [isShow, setIsShow] = useState<number | null>(null);

	const handleMenuToggle = (index: number) => {
		console.log(index);
		setIsShow(prev => {
			console.log('이전 값 : ' + prev);
			return prev === index ? null : index;
		});
	};

	return (
		<header css={headerCss}>
			<div css={logoCss}>
				<h1>
					<a href="/">
						<img src={process.env.PUBLIC_URL + '/img/logo.png'} alt="천지암 로고" />
					</a>
				</h1>
			</div>
			<nav>
				<ul>
					{menuData.map((menu, index) => (
						<li css={menuListCss} key={index}>
							<span
								onClick={() => {
									console.log('클릭한 메뉴의 인덱스 번호 : ' + index);
									handleMenuToggle(index);
								}}
								css={titleMenuCss}
							>
								{menu.label}
							</span>

							{isShow === index && (
								<ul css={subMenuWrapCss}>
									{menu.submenu.map((submenuItem, subIndex) => (
										<li key={subIndex}>
											<Link css={subMenuCss} to={submenuItem.url}>
												{submenuItem.label}
											</Link>
										</li>
									))}
								</ul>
							)}
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}

const headerCss = css`
	position: fixed;
	top: 0;
	left: 0;
	width: 222px;
	padding: 40px 25px;
	box-sizing: border-box;
`;

const logoCss = css`
	margin-bottom: 80px;
	text-align: center;
`;

const menuListCss = css`
	margin-bottom: 20px;
`;

const titleMenuCss = css`
	display: inline-block;
	font-size: 16px;
	font-weight: 700;
	color: #221e1f;
	cursor: pointer;
`;

const subMenuWrapCss = css`
	margin-top: 7px;
`;

const subMenuCss = css`
	display: inline-block;
	font-size: 14px;
	font-weight: 500;
	color: #656565;
	letter-spacing: 0.02px;
	margin-top: 5px;
	margin-bottom: 5px;
`;
