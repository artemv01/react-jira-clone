import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import issuesReducer from './issuesSlice';
import settingsReducer from './settingsSlice';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './rootReducer';
const store = configureStore({
  reducer: {
    issues: issuesReducer,
  },
});
const createStore = () => {
  return configureStore({
    reducer: {
      issues: issuesReducer,
      settings: settingsReducer,
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export const wrapper = createWrapper(createStore, { debug: true });
export type AppDispatch = typeof store.dispatch;
