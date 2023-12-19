/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState } from 'react';
import menuData from '../data/menuData.json';
import { Link } from 'react-router-dom';

export default function NavBarMenu() {
	const [menuList, setMenuList] = useState(menuData);

	const subMenuOpen = (id: number) => {
		console.log('클릭한 메뉴 : ' + id);
		setMenuList(prev => prev.map(menu => ({ ...menu, isOpen: menu.id === id ? !menu.isOpen : false })));
	};

	return (
		<nav>
			<ul>
				{menuList &&
					menuList.map((menu, index) => (
						<li key={menu.id} css={menuListCss}>
							<span onClick={() => subMenuOpen(menu.id)} css={menuTitleCss}>
								{menu.label}
							</span>

							{menu.isOpen && (
								<ul css={subMenuWrapCss}>
									{menu.submenu.map((subMenu, subIndex) => (
										<li key={subMenu.label}>
											<Link css={subMenuCss} to={subMenu.url}>
												{subMenu.label}
											</Link>
										</li>
									))}
								</ul>
							)}
						</li>
					))}
			</ul>
		</nav>
	);
}

const menuTitleCss = css`
	display: inline-block;
	font-size: 16px;
	font-weight: 700;
	color: #221e1f;
	cursor: pointer;
`;

const menuListCss = css`
	margin-bottom: 20px;
`;

const subMenuWrapCss = css`
	margin-top: 10px;
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
