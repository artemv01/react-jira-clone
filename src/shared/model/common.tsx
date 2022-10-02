export interface Priority {
  id: string;
  title: string;
  img: string;
}
export interface IssueType {
  id: string;
  title: string;
  img: string;
}
export interface IssueStatus {
  id: string;
  title: string;
}
export interface Comment {
  text: string;
  user: User;
  createdAt: string;
}
export interface IssueColumn {
  id: string;
  title: string;
  items: Issue[];
  bgColor: string;
  textColor: string;
}
export interface IssueStatus {
  id: string;
  name: string;
  title: string;
  bgColor: string;
  textColor: string;
}
export type ColumnType = 'backlog' | 'selected_for_dev' | 'in_progress' | 'done';

export interface Issue {
  id: string | undefined;
  publicId: string;
  title: string;
  assignee: string[];
  reporter: string;
  priority: string;
  type: string;
  text: string;
  status: string;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}
export interface User {
  id: string;
  avatarUrl: string;
  name: string;
}
export type Assignee = Record<any, any>;
export type IssueTypeId = 'bug' | 'task' | 'story';
export interface Option {
  img?: string;
  value: string;
  name: string;
  bgColor?: string;
  textColor?: string;
}
