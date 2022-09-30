import { nanoid } from '@reduxjs/toolkit';
import { IssueStatus, IssueType } from './model/common';

export const issueStatuses: IssueStatus[] = [
  {
    id: 'vci9HBnJNbRSFqlG--p1h',
    title: 'Backlog',
  },
  {
    id: 'lbQ8GDV5FZMiVj683qPFs',
    title: 'Selected for development',
  },
  {
    id: 'jHOCi3qLjyAEd8YsvBMOt',
    title: 'In progress',
  },
  {
    id: 'GRIplrMH9dFzijq6UTq2t',
    title: 'Done',
  },
];
