export type Product = {
	productVersionGroupSeq: number;
	name: string;
	normalPrice: number;
	memberPrice: number;
	brandName: string;
	reviewCount: number;
	reviewAvgRating: number;
	iconClsf: string;
	soldOutYn: string;
	productSeq: number;
	memberDcRate: number;
};

export type ProductList = Product[];
