import Box from '@mui/material/Box';
import { FC } from 'react';
import Breadcrumbs from '../../../shared/components/Breadcrumbs';
import IssueCard from '../../issue-card/IssueCard';


interface Props {
  id: string;
}
export const SingleIssuePage: FC<Props> = ({ id }) => {
const breadcrumbs = ['Projects', 'React Jira Clone', 'Issues', id];

  return (
    <Box>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Box sx={{ mt: 2 }}>
        <IssueCard singlePage={true} publicId={id} />
      </Box>
    </Box>
  );
};
