import { Provider } from 'react-redux';
import Router from './Router';
import store from './redux/store';
import './style/reset.css';
import './style/global.css';

function App() {
	return (
		<>
			<Provider store={store}>
				<Router />
			</Provider>
		</>
	);
}

export default App;
