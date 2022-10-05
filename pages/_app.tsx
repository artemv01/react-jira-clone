import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { compose } from '@reduxjs/toolkit';
import { wrapper } from '../src/store/store';
import NoSsr from '../src/shared/NoSsr';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { DefaultSeo } from 'next-seo';
import SEO from './next-seo.config';
function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore();
  return (
    <>
      <DefaultSeo {...SEO} />
      <NoSsr>
        <PersistGate persistor={(store as any).__persistor} loading={<div>Loading</div>}>
          <Component {...pageProps} />
        </PersistGate>
      </NoSsr>
    </>
  );
}
export default compose(wrapper.withRedux)(MyApp);
