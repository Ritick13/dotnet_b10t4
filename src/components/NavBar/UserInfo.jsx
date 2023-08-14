import React from 'react';
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  createStyles
} from '@mantine/core';
import PropTypes from 'prop-types';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
    }
  }
}));

export function UserInfo({
  employeeId, designation, department
}) {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar src={`https://avatars.dicebear.com/api/initials/${employeeId}.svg`} radius="xl" size={40} />

        <div style={{ flex: 1 }}>
          <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
            {department}
          </Text>
          <Text size="sm" weight={500}>
            {employeeId}
          </Text>

          <Text color="dimmed" size="xs">
            {designation}
          </Text>
        </div>

      </Group>
    </UnstyledButton>
  );
}

UserInfo.propTypes = {
  employeeId: PropTypes.string.isRequired,
  designation: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired
};
