import { styled } from '@mui/material/styles';
import React, { FC, useEffect, useState } from 'react';
import { issueTypes } from '../../../shared/IssueTypes';
import { IssueType } from '../../../shared/model/common';

interface Props {
  id: number;
}
const Wrapper = styled('div')(() => ({
  height: '24px',
}));
export const IssueTypeBadge: FC<Props> = (props) => {
  const [issue, setIssue] = useState<IssueType>({} as IssueType);
  useEffect(() => {
    const type = issueTypes.find(({ id }) => props.id);
    if (type) {
      setIssue(type);
    }
  }, [props.id]);

  return <Wrapper>{issue.img}</Wrapper>;
};
