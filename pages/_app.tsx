import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { compose } from '@reduxjs/toolkit';
import { wrapper } from '../src/store/store';
import NoSsr from '../src/shared/NoSsr';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NoSsr>
      <Component {...pageProps} />
    </NoSsr>
  );
}
export default compose(wrapper.withRedux)(MyApp);
