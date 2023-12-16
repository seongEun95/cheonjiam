/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useParams } from 'react-router-dom';

export default function DetailPage() {
	const { id } = useParams();

	return <div>상세페이지 id : {id}</div>;
}
