import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import issuesReducer from './issuesSlice';
import settingsReducer from './settingsSlice';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const STORE_VERSION = '0.0.1'
let store: EnhancedStore;
const makeStore = () => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    store = configureStore({
      reducer: {
        issues: issuesReducer,
        settings: settingsReducer,
      },
    });
    return store;
  } else {
    const persistConfig = {
      key: `react_jira_clone-${STORE_VERSION}`,
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    store = configureStore({ reducer: persistedReducer });
    (store as any).__persistor = persistStore(store);
    return store;
  }
};

export type RootState = ReturnType<typeof rootReducer>;
export const wrapper = createWrapper(makeStore, { debug: true });
export type AppDispatch = typeof store.dispatch;
