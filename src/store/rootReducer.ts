import { combineReducers } from '@reduxjs/toolkit';

import issuesSlice from './issuesSlice';
import settingsSlice from './settingsSlice';

export default combineReducers({
  issues: issuesSlice,
  settings: settingsSlice,
});
