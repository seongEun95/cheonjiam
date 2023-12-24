/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { IoMdStar } from 'react-icons/io';
import { IoStarOutline } from 'react-icons/io5';

type RateStarProps = {
	reviewAvgRating: number;
};

export default function RateStar({ reviewAvgRating }: RateStarProps) {
	return (
		<div>
			{new Array(reviewAvgRating).fill(null).map((_, idx) => (
				<IoMdStar key={idx} size={12} />
			))}
			{new Array(5 - reviewAvgRating).fill(null).map((_, idx) => (
				<IoStarOutline key={idx} size={12} />
			))}
		</div>
	);
}
