import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { ColumnType, Comment, Issue, IssueColumn } from '../shared/model/common';
import { RootState } from './store';
import { HYDRATE } from 'next-redux-wrapper';
import { users } from '../shared/stubs/users';

const initialState: IssueColumn[] = [
  {
    id: '7oG7i6UbQGttwjJn2K8iO',
    title: 'Backlog',
    bgColor: '#f4f5f7',
    textColor: '#42526E',
    items: [
      {
        type: 'PkNnJEJXUrfJ94uX8haZC',
        priority: 'kUvro59zCQQRgz4DCiDjs',
        assignee: ['85hO6aeMSpjVxT3iwdhiP', 'IEJ3QQNbTBVjvw_4gvd5D'],
        reporter: '85hO6aeMSpjVxT3iwdhiP',
        title: 'dwqdwqdqwdq',
        text: '<p>ddwdqdwqdwqdwq</p>',
        id: 'i9E3gvSNrd7b1a4rttl3t',
        publicId: 'RJC-1',
        status: '7oG7i6UbQGttwjJn2K8iO',
        comments: [],
        createdAt: '2022-10-02T09:54:25.415Z',
        updatedAt: '2022-10-02T09:54:25.415Z',
      },
      {
        type: 'PkNnJEJXUrfJ94uX8haZC',
        priority: 'kUvro59zCQQRgz4DCiDjs',
        assignee: ['85hO6aeMSpjVxT3iwdhiP', 'IEJ3QQNbTBVjvw_4gvd5D'],
        reporter: '85hO6aeMSpjVxT3iwdhiP',
        title: 'aaa',
        text: 'aaa',
        id: 'i9E1gvzNrd7b1a4rttl3t',
        publicId: 'RJC-2',
        status: '7oG7i6UbQGttwjJn2K8iO',
        comments: [],
        createdAt: '2022-10-02T09:54:25.415Z',
        updatedAt: '2022-10-02T09:54:25.415Z',
      },
    ],
  },
  {
    id: 'XXUEBDiCrhJAml7ya3yeS',
    title: 'Selected for development',
    bgColor: '#f4f5f7',
    textColor: '#42526E',
    items: [],
  },
  {
    id: 'ogAkq0W6PtnOUXhdn7KtZ',
    title: 'in progress',
    bgColor: '#0067ff',
    textColor: '#ffffff',
    items: [],
  },
  {
    id: 'hyHjZ_SbAXqW6KwLdAp_l',
    bgColor: '#0b875b',
    textColor: '#ffffff',
    title: 'done',
    items: [],
  },
];

export interface AddIssueParams {
  issue: Issue;
  columnId: string;
}
export interface AddCommentParams {
  issueId: string;
  commentText: string;
  commentUserId: string;
}

export interface UpdateIssueParams {
  issueId: string;
  issue: Partial<Issue>;
  columnId: string;
}
interface MoveIssueParams {
  sourceGroupId: string;
  destGroupId: string;
  destIdx?: number;
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
    addIssue(state, action: PayloadAction<AddIssueParams>) {
      const column = state.find(({ id }) => id === action.payload.columnId);
      if (column) {
        const date = new Date().toISOString();
        const newIssue = { ...action.payload.issue, createdAt: date, updatedAt: date };

        column.items.unshift(newIssue);
      }
    },
    addComment(state, action: PayloadAction<AddCommentParams>) {
      const issue = state
        .map((col) => col.items)
        .flat()
        .find((item) => item.id === action.payload.issueId);
      const user = users.find((item) => item.id === action.payload.commentUserId);
      const commentData = { user, text: action.payload.commentText, createdAt: new Date().toISOString() };
      if (issue) {
        issue.comments.push(commentData as Comment);
      }
    },
    updateIssue(state, action: PayloadAction<UpdateIssueParams>) {
      const column = state.find(({ id }) => id === action.payload.columnId);
      if (!column) {
        return;
      }
      const issueIdx = column.items.findIndex(({ id }) => id === action.payload.issueId);
      const updatedIssue = { ...column.items[issueIdx], ...action.payload.issue, updatedAt: new Date().toISOString() };
      column.items.splice(issueIdx, 1);
      column.items.splice(issueIdx, 0, updatedIssue);
    },
    moveIssue(state, { payload }: PayloadAction<MoveIssueParams>) {
      const source = state.find(({ id }) => id === payload.sourceGroupId);
      const dest = state.find(({ id }) => id === payload.destGroupId);
      const issueIdx = source?.items.findIndex(({ id }) => id === payload.issueId);

      if (source && dest && issueIdx !== undefined && issueIdx !== -1) {
        const issue: Issue = { ...source?.items[issueIdx], status: payload.destGroupId };
        const sourceList = [...source.items];
        sourceList.splice(issueIdx, 1);
        source.items = [...sourceList];

        const destList = [...dest.items];
        if (payload.destIdx !== undefined) {
          destList.splice(payload.destIdx, 0, issue);
        } else {
          destList.splice(0, 0, issue);
        }
        dest.items = [...destList];
      }
    },
  },
});

const defaultIssue = {
  type: '',
  priority: '',
  assignee: [],
  reporter: '',
  title: '',
  text: '',
  id: undefined,
  publicId: '',
  status: '',
};
export const selectIssues = (state: RootState): IssueColumn[] => state.issues;
export const selectIssueById =
  (issueId: string) =>
  (state: RootState): Issue =>
    state.issues
      .map((col) => col.items)
      .flat()
      .find((item) => item.id === issueId) || defaultIssue;
export const { addIssue, addComment, moveIssue, updateIssue } = issuesSlice.actions;
export default issuesSlice.reducer;
