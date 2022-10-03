import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { compose } from '@reduxjs/toolkit';
import { wrapper } from '../src/store/store';
import NoSsr from '../src/shared/NoSsr';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore();
  return (
    <NoSsr>
      <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
        <Component {...pageProps} />
      </PersistGate>
    </NoSsr>
  );
}
export default compose(wrapper.withRedux)(MyApp);
