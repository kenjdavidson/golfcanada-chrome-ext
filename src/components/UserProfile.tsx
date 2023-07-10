import { Stack, Typography } from '@mui/material';
import React from 'react';
import { User } from '../golfcanada/model/User';

export interface UserProfileProps {
  user: User
}

export const UserProfile = ({
  user
}: UserProfileProps): React.ReactElement => {
  return (
    <Stack
      direction='column'
      spacing={2}>
        { user.username }
        { `${user.firstName} ${user.lastName}` }
    </Stack>
  );
}