import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, Issue, IssueColumn, IssueType, Priority, User } from '../shared/model/common';
import { RootState } from './store';
import { HYDRATE } from 'next-redux-wrapper';
import { users } from '../shared/stubs/users';
import { priorityTypes } from '../shared/PriorityTypes';
import { issueTypes } from '../shared/IssueTypes';
import { issuesMock } from './storeMocks';
// import mockStore from './mock.json'
const initialState: IssueColumn[] = JSON.parse(issuesMock);
export interface AddIssueParams {
  issue: Issue;
  columnId: string;
}
export interface DeleteIssueParams {
  issue: Issue;
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
        const newIssue = {
          ...action.payload.issue,
          createdAt: date,
          updatedAt: date,
          comments: [],
          status: action.payload.columnId,
        };

        column.items.push(newIssue);
      }
    },
    deleteIssue(state, action: PayloadAction<DeleteIssueParams>) {
      const column = state.find(({ id }) => id === action.payload.issue.status) as IssueColumn;
      const issueIdx = column.items.findIndex(({ id }) => id === action.payload.issue.id);
      if (column) {
        column.items.splice(issueIdx, 1);
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

export const selectIssueColumns = (state: RootState): IssueColumn[] => state.issues;
export const selectMergedIssues = (state: RootState): IssueRenderData[] =>
  state.issues
    .map((col) => col.items)
    .flat()
    .map((item) => joinIssueRelations(item));
export const selectIssueById =
  (issueId: string) =>
    (state: RootState): Issue =>
    state.issues
      .map((col) => col.items)
      .flat()
      .find((item) => item.id === issueId) as Issue;
export const selectIssueByPublicId =
  (issueId: string) =>
    (state: RootState): Issue =>
    state.issues
      .map((col) => col.items)
      .flat()
      .find((item) => item.publicId === issueId) as Issue;

export const { addIssue, addComment, moveIssue, updateIssue, deleteIssue } = issuesSlice.actions;
export default issuesSlice.reducer;

export interface IssueRenderData {
  text: string;
  assigned: User[];
  issueId: string;
  type: IssueType;
  priority: Priority;
  publicId: string;
  title: string;
}
export const joinIssueRelations = (issue: Issue): IssueRenderData => {
  const assigned = users.filter((item) => {
    if (Array.isArray(issue.assignee) && issue.assignee.includes(item.id)) {
      return item;
    }

    return undefined;
  });
  const priority = priorityTypes.find((item) => {
    if (issue.priority === item.id) {
      return item;
    }

    return undefined;
  }) as Priority;
  const type = issueTypes.find((item) => {
    if (issue.type === item.id) {
      return item;
    }

    return undefined;
  }) as IssueType;

  return {
    publicId: issue.publicId,
    text: issue.text,
    title: issue.title,
    assigned,
    issueId: issue.id as string,
    type,
    priority,
  };
};
