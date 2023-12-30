/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import { MdStar } from 'react-icons/md';
import { MdStarBorder } from 'react-icons/md';

type ProductStarRateProps = {
	reviewStarRating: number;
};

export default function ProductStarRate({ reviewStarRating }: ProductStarRateProps) {
	return (
		<div>
			{new Array(reviewStarRating).fill(null).map((_, index) => {
				return <MdStar size={14} key={index} />;
			})}
			{new Array(5 - reviewStarRating).fill(null).map((_, index) => {
				return <MdStarBorder size={14} key={index} />;
			})}
		</div>
	);
}
