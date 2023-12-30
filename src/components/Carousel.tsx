/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState } from 'react';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { CustomLeftArrow, CustomRightArrow } from './CarouselCustomArrow';
import { FaPlay } from 'react-icons/fa';
import { HiOutlinePause } from 'react-icons/hi2';
import CustomDot from './CarouselCustomDots';

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 1,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 1,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};

export default function CarouselSlide() {
	const [isHover, setIsHover] = useState(false);
	const [isPlay, setIsPlay] = useState(true);

	const handleClickPlayPause = () => {
		setIsPlay(prev => !prev);
	};

	const handleImgEnter = () => {
		setIsHover(true);
	};

	const handleImgLeave = () => {
		setIsHover(false);
	};

	return (
		<div css={carouselWrapCss}>
			<Carousel
				autoPlay={isPlay}
				customTransition="all 0.5s"
				swipeable
				draggable
				showDots
				infinite
				responsive={responsive}
				customRightArrow={<CustomLeftArrow />}
				customLeftArrow={<CustomRightArrow />}
				customDot={<CustomDot />}
			>
				<div css={imgWrapCss}>
					<div css={txtWrapCss}>
						<h2 css={titleCss}>
							환절기 건강을 지켜주는 <br />
							자연의 선물, 도라지청
						</h2>
						<p css={subTxtCss}>
							#간절기면역력UP
							<br />
							#에너지UP
						</p>
						<div onMouseEnter={handleImgEnter} onMouseLeave={handleImgLeave}>
							<Link to={'#'}>
								<img
									src={`https://www.cheonjiyang.co.kr/assets/img/common/arrow-detail${isHover ? '-on' : ''}.png`}
									alt="arrow"
								/>
							</Link>
						</div>
					</div>
					<img css={imgCss} src="https://www.cheonjiyang.co.kr/api/attach/view/main_banner/238/pc/1" alt="slide img" />
				</div>
				<div css={imgWrapCss}>
					<div css={txtWrapCss}>
						<h2 css={titleCss}>
							간절기 건강은 <br /> 헬스밸런스와 함께!
						</h2>
						<p css={subTxtCss}>
							#간절기면역력UP
							<br />
							#에너지UP
						</p>
						<div onMouseEnter={handleImgEnter} onMouseLeave={handleImgLeave}>
							<Link to={'#'}>
								<img
									src={`https://www.cheonjiyang.co.kr/assets/img/common/arrow-detail${isHover ? '-on' : ''}.png`}
									alt="arrow"
								/>
							</Link>
						</div>
					</div>
					<img css={imgCss} src="https://www.cheonjiyang.co.kr/api/attach/view/main_banner/233/pc/1" alt="slide img" />
				</div>
				<div css={imgWrapCss}>
					<div css={txtWrapCss}>
						<h2 css={titleCss}>
							매 순간을 활력으로
							<br /> 가득 채우세요!
							<br />
							마시는 마그네슘 비플러스
						</h2>
						<p css={subTxtCss}>#마마비 #체리맛 #1일1포</p>
						<div onMouseEnter={handleImgEnter} onMouseLeave={handleImgLeave}>
							<Link to={'#'}>
								<img
									src={`https://www.cheonjiyang.co.kr/assets/img/common/arrow-detail${isHover ? '-on' : ''}.png`}
									alt="arrow"
								/>
							</Link>
						</div>
					</div>
					<img css={imgCss} src="https://www.cheonjiyang.co.kr/api/attach/view/main_banner/237/pc/1" alt="slide img" />
				</div>
				<div css={imgWrapCss}>
					<div css={txtWrapCss}>
						<h2 css={titleCss}>
							건강한 여성의 <br /> 필수 아이템! <br />
							베스처 철분스틱
						</h2>
						<p css={subTxtCss}>#1일1포 #자두맛 #비린맛NO</p>
						<div onMouseEnter={handleImgEnter} onMouseLeave={handleImgLeave}>
							<Link to={'#'}>
								<img
									src={`https://www.cheonjiyang.co.kr/assets/img/common/arrow-detail${isHover ? '-on' : ''}.png`}
									alt="arrow"
								/>
							</Link>
						</div>
					</div>
					<img css={imgCss} src="https://www.cheonjiyang.co.kr/api/attach/view/main_banner/235/pc/1" alt="slide img" />
				</div>
			</Carousel>
			<div css={playPauseCss} onClick={handleClickPlayPause}>
				{isPlay ? <HiOutlinePause size={16} /> : <FaPlay size={12} />}
			</div>
		</div>
	);
}

const carouselWrapCss = css`
	position: relative;
	width: 100%;
`;

const imgWrapCss = css`
	position: relative;
	width: 100%;
	height: calc(100vh - 82.5px);
`;

const txtWrapCss = css`
	position: absolute;
	top: 50%;
	right: 7%;
	transform: translateY(-50%);
`;

const titleCss = css`
	font-size: 60px;
	line-height: 1.4;
	margin-bottom: 15px;
`;

const subTxtCss = css`
	font-size: 20px;
	line-height: 1.5;
	margin-bottom: 40px;
	color: #656565;
`;

const imgCss = css`
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: right -340px top 0;
`;

const playPauseCss = css`
	position: absolute;
	bottom: 58px;
	right: 35%;
	cursor: pointer;
`;
