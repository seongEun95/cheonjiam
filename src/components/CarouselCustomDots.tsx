/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

const CustomDot = ({ onClick, active }: any) => {
	return (
		<li>
			<button css={dotsCss(active)} onClick={onClick} />
		</li>
	);
};

const dotsCss = (active: string) => css`
	width: 10px;
	height: 2px;
	background-color: ${active ? '#000' : '#fff'};
`;

export default CustomDot;
