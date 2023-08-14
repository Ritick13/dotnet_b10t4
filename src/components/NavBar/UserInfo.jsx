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
  name, role, dept
}) {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar src={`https://avatars.dicebear.com/api/initials/${name}.svg`} radius="xl" size={40} />

        <div style={{ flex: 1 }}>
          <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
            {dept}
          </Text>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {role}
          </Text>
        </div>

      </Group>
    </UnstyledButton>
  );
}

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  dept: PropTypes.string.isRequired
};
