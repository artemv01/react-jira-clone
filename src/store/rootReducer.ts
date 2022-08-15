import { combineReducers } from '@reduxjs/toolkit';

import issuesSlice from './issuesSlice';

export default combineReducers({
  issues: issuesSlice,
});
