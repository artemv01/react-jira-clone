import {IssueFilters} from "../model/common";

export const defaultIssueFilters: IssueFilters = {
  search: '',
  assignees: [],
  onlyCurrentUserIssues: false,
  ignoreResolved: false,
};
