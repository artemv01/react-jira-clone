export interface Priority {
  id: number;
  name: string;
  title: string;
  img: React.ReactNode;
}
export interface IssueType {
  id: number;
  name: string;
  title: string;
  img: React.ReactNode;
}

export interface IssueColumn {
  id: string;
  publicId: string;
  group: ColumnType;
  title: string;
  items: Issue[];
}

export type ColumnType = 'backlog' | 'selected_for_dev' | 'in_progress' | 'done';

export interface Issue {
  id: string;
  title: string;
  assignee: string;
  priority: string;
  type: string;
}

export type Assignee = Record<any, any>;
export type IssueTypeId = 'bug' | 'task' | 'story';
