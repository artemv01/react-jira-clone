import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { ColumnType, Issue, IssueColumn } from '../shared/model/common';
import { RootState } from './store';
import { HYDRATE } from 'next-redux-wrapper';

const initialState: IssueColumn[] = [
  {
    id: '1',
    publicId: 'BUG-001',
    group: 'backlog',
    title: 'Backlog',
    items: [],
  },
  {
    id: '2',
    group: 'selected_for_dev',
    publicId: 'BUG-001',
    title: 'Selected for development',
    items: [],
  },
  {
    id: '3',
    group: 'in_progress',
    publicId: 'BUG-001',
    title: 'in progress',
    items: [],
  },
  {
    id: '4',
    group: 'done',
    title: 'done',
    publicId: 'BUG-001',
    items: [
      {
        id: nanoid(),
        title: 'Behind the 900 stars - Update 08/2020',
        assignee: 'Thor',
        priority: 'Highest',
        type: '',
      },
    ],
  },
];

interface CreateIssueParams {
  issue: Issue;
  columnType: ColumnType;
}
interface MoveIssueParams {
  sourceGroupId: string;
  destGroupId: string;
  destIdx: number;
  issueId: string;
}

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return { ...state, ...action.payload.app };
    },
  },
  reducers: {
    issueAdded(state, action: PayloadAction<CreateIssueParams>) {
      const column = state.find(({ group }) => group === action.payload.columnType);
      if (column) {
        column.items.push(action.payload.issue);
      }
    },
    moveIssue(state, { payload }: PayloadAction<MoveIssueParams>) {
      const source = state.find(({ id }) => id === payload.sourceGroupId);
      const dest = state.find(({ id }) => id === payload.destGroupId);
      const issueIdx = source?.items.findIndex(({ id }) => id === payload.issueId);
      if (source && dest && issueIdx !== undefined && issueIdx !== -1) {
        const issue = { ...source?.items[issueIdx] };
        const destList = [...dest.items, issue];
        const sourceList = [...source.items];
        sourceList.splice(issueIdx, 1);
        dest.items = [...destList];
        source.items = [...sourceList];
      }
    },
  },
});

export const selectIssues = (state: RootState): IssueColumn[] => state.issues;
export const { issueAdded, moveIssue } = issuesSlice.actions;
export default issuesSlice.reducer;
