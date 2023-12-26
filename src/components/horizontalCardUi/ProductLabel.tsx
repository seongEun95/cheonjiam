/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState } from 'react';

type ProductLabelProps = {
	label?: string;
};

export default function ProductLabel({ label }: ProductLabelProps) {
	const labels = label?.split(',');
	const labelTxt = ['BEST', 'GIFT', 'NEW'];
	const hasLabel = (targetLabel: string) => label?.includes(targetLabel);

	return (
		<div css={labelWrapCss}>
			{labels?.map((label, index) => {
				return (
					hasLabel(label) && (
						<span css={[labelCommonCss, productLabelCss(label)]} key={index}>
							{labelTxt[index]}
						</span>
					)
				);
			})}
		</div>
	);
}

const productLabelCss = (label: string) => {
	switch (label) {
		case '사은품':
			return freebieLabelCss;
		case '베스트':
			return bestLabelCss;
		case '신제품':
			return newProductLabelCss;
	}
};

const labelWrapCss = css`
	display: flex;
	gap: 5px;
`;

const labelCommonCss = css`
	display: inline-block;
	font-size: 12px;
	font-weight: 600;
	margin-bottom: 16px;
	padding: 4px 6px 3px;
`;

const freebieLabelCss = css`
	color: #fff;
	background-color: #a69471;
`;

const bestLabelCss = css`
	color: #fff;
	background-color: #201f1f;
`;

const newProductLabelCss = css`
	border: 1px solid #ccc;
`;
