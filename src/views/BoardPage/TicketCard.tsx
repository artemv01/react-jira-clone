import {FC} from 'react';
import {Box} from '@mui/material';

export const TicketCard: FC = ({children}) => {
    return (
        <Box
            sx={(theme) => ({
                backgroundColor: theme.board.ticketBg,
                width: '100%',
                height: 'auto',
                p: 1,
                minHeight: '80px',
            })}
        >
            {children}
        </Box>
    );
};
