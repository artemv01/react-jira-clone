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

export type Assignee = Record<any, any>;
export type IssueTypeId = 'bug' | 'task' | 'story';
