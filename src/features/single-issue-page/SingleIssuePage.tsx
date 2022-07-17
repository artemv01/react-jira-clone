import Box from '@mui/material/Box';
import { FC } from 'react';
import Breadcrumbs from '../../shared/components/Breadcrumbs';
import IssueCard from '../issue-card/IssueCard';

const breadcrumbs = ['Projects', 'React Jira Clone', 'Issues', '2022'];

interface Props {
  id: string;
}
export const SingleIssuePage: FC<Props> = ({ id }) => {
  console.log(`Page id: ${id}`);
  return (
    <Box>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Box sx={{mt: 2}}>
          <IssueCard onSinglePage={true} issueId={id} />
      </Box>
    </Box>
  );
};
