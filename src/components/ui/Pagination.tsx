/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

type PaginationProps = {
	page: number;
	onClick: (num: number) => void;
	totalPage: number;
};

export default function Pagination({ page, onClick, totalPage }: PaginationProps) {
	return (
		<div css={paginationWrapCss}>
			<ul css={pageNumWrapCss}>
				{Array(totalPage)
					.fill(null)
					.map((_, i) => (
						<li key={i} css={pageListCss(page)}>
							<button css={pageNumCss} onClick={() => onClick(i + 1)}>
								{i + 1}
							</button>
						</li>
					))}
			</ul>
		</div>
	);
}

const paginationWrapCss = css`
	display: flex;
	justify-content: center;
	margin: 50px 0;
`;

const pageNumWrapCss = css`
	display: flex;
`;

const pageListCss = (page: number) => css`
	&:nth-of-type(${page}) button {
		padding: 5px 10px;
		background-color: #000;
		color: #fff;
	}
`;
const pageNumCss = css`
	font-size: 16px;
	font-weight: 500;
	padding: 5px;
	margin: 0 10px;
	cursor: pointer;
`;
