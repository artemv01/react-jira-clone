import { AnyAction, configureStore, EnhancedStore } from '@reduxjs/toolkit';
import issuesReducer from './issuesSlice';
import settingsReducer, { ProjectSettings } from './settingsSlice';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { IssueColumn } from '../shared/model/common';
const STORE_VERSION = '0.0.5';

const makeStore = () => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    const store = configureStore({
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
    const store = configureStore({ reducer: persistedReducer });
    (store as any).__persistor = persistStore(store);
    return store;
  }
};

export type RootState = ReturnType<typeof rootReducer>;
export const wrapper = createWrapper(makeStore, { debug: true });

const typeStore = configureStore({
  reducer: {
    issues: issuesReducer,
    settings: settingsReducer,
  },
});
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
