/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useRef, useState } from 'react';
import menuData from '../data/menuData.json';
import { Link } from 'react-router-dom';

export default function NavBarMenu() {
	const [menuList, setMenuList] = useState(menuData);
	const subMenuRefs = useRef<Record<number, HTMLUListElement | null>>({});
	const [subMenuHeight, setSubMenuHeight] = useState(0);

	const subMenuOpen = (id: number) => {
		console.log('클릭한 메뉴 : ' + id);

		const subMenuHeight = subMenuRefs.current[id]?.clientHeight || 0;
		setSubMenuHeight(subMenuHeight);

		setMenuList(prev =>
			prev.map(menu => ({
				...menu,
				isOpen: menu.id === id ? !menu.isOpen : false,
			})),
		);
	};

	return (
		<nav>
			<ul>
				{menuList.map(menu => (
					<li key={menu.id} css={menuListCss(menu.isOpen, subMenuHeight)}>
						<span onClick={() => subMenuOpen(menu.id)} css={menuTitleCss}>
							{menu.label}
						</span>

						<SubMenu menu={menu} subMenuRefs={subMenuRefs} />
					</li>
				))}
			</ul>
		</nav>
	);
}

type SubMenuProps = {
	menu: {
		id: number;
		isOpen: boolean;
		label: string;
		submenu: {
			label: string;
			url: string;
		}[];
	};
	subMenuRefs: React.MutableRefObject<Record<number, HTMLUListElement | null>>;
};

function SubMenu({ menu, subMenuRefs }: SubMenuProps) {
	return (
		<ul css={subMenuWrapCss} ref={el => (subMenuRefs.current[menu.id] = el)}>
			{menu.submenu.map((subMenu, subIndex) => (
				<li key={subIndex}>
					<Link css={subMenuCss} to={subMenu.url}>
						{subMenu.label}
					</Link>
				</li>
			))}
		</ul>
	);
}

const menuTitleCss = css`
	display: inline-block;
	font-size: 16px;
	font-weight: 700;
	color: #221e1f;
	cursor: pointer;
`;

const menuListCss = (isOpen: boolean, subMenuHeight: number) => css`
	overflow: hidden;
	height: ${isOpen ? subMenuHeight + 26 : 16}px;
	margin-bottom: 20px;
	transition: height 0.3s;
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
