import App from 'next/app';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '../lib/store';

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;

		return (
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		);
	}
}

export default createWrapper(() => store).withRedux(MyApp);
