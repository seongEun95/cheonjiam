export type ProductHorizontal = {
	productVersionGroupSeq: number;
	productSeq: number;
	name: string;
	normalPrice: number;
	memberPrice: number;
	reviewAvgRating: number;
	reviewCount: number;
	memberDcRate: number;
	soldOutYn: string;
	iconClsf: string;
	brandName: string;
};

export type ProductHorizontalList = ProductHorizontal[];
