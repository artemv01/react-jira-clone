import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { compose } from '@reduxjs/toolkit';
import { wrapper } from '../src/store/store';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default compose(wrapper.withRedux)(MyApp);
