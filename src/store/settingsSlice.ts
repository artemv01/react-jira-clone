import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { ColumnType, Issue, IssueColumn } from '../shared/model/common';
import { RootState } from './store';
import { HYDRATE } from 'next-redux-wrapper';

interface ProjectSettings {
  lastUsedIssueId: number;
  issueIdPrefix: string;
}
const initialState: ProjectSettings = {
  lastUsedIssueId: 1,
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
  reducers: {
    incrementLastUsedId(state) {
        state.lastUsedIssueId =+ 1
    }
  },
});

export const selectSettings = (state: RootState): ProjectSettings => state.settings;
export const { incrementLastUsedId } = settingsSlice.actions;

export default settingsSlice.reducer;
