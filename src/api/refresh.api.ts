import axios from 'axios';

export const refreshTokens = (cb: Function) => {
	const rt = localStorage.getItem('rt');

	axios
		.get('http://localhost:8000/auth/refresh', {
			headers: { Authorization: `Bearer ${rt}` },
		})
		.then(res => {
			// localStorage.setItem('at', res.data.at);
			localStorage.setItem('rt', res.data.rt);

			cb();
		})
		.catch(console.error);
};
