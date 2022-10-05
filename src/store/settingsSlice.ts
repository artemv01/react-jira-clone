import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { HYDRATE } from 'next-redux-wrapper';

export interface ProjectSettings {
  issueIdPrefix: string;
}
const initialState: ProjectSettings = {
  issueIdPrefix: 'RJC',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return { ...state, ...action.payload.app };
    },
  },
  reducers: {},
});

export const selectSettings = (state: RootState): ProjectSettings => state.settings;

export default settingsSlice.reducer;
