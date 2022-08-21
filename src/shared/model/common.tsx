export interface Priority {
  id: string;
  name: string;
  title: string;
  img: React.ReactNode;
}
export interface IssueType {
  id: string;
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
  publicId: string;
  title: string;
  assignee: string[];
  reporter: string;
  priority: string;
  type: string;
  text: string;
}
export interface User {
    id:string;
    avatarUrl:string;
    name: string;
}
export type Assignee = Record<any, any>;
export type IssueTypeId = 'bug' | 'task' | 'story';
