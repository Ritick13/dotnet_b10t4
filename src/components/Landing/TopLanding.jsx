import React from 'react';
import {
  createStyles,
  Container,
  Title,
  Button,
  Group,
  Text
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0
    }
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28
    }
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1
    }
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none'
    }
  },

  highlight: {
    position: 'relative',
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor
    }).background,
    borderRadius: theme.radius.sm,
    padding: '4px 12px'
  },

  dots: {
    position: 'absolute',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    '@media (max-width: 755px)': {
      display: 'none'
    }
  }
}));

export function TopLanding() {
  const navigate = useNavigate();
  const { classes } = useStyles();
  return (
    <div>
      <Container my={50}>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Transforming paper-based
              {' '}
              <span className={classes.highlight}>Loans</span>
              {' '}
              into digital
              solutions.
            </Title>
            <Text color="dimmed" mt="md">
              Loan Management is a digital solution that streamlines loans
              management, simplifying administrative tasks, and ensuring
              accountability. It provides real-time data analysis, incident
              reporting, and communication tools, promoting safety and security
              for communities and organizations.
            </Text>
            <Group mt={30}>
              <Button
                radius="xl"
                size="md"
                className={classes.control}
                onClick={() => navigate('/auth')}
              >
                Login to get started
              </Button>
            </Group>
          </div>
          <div className={classes.image}>
            <lottie-player
              autoplay
              loop
              mode="normal"
              src="https://lottie.host/27edb860-1b9d-4d31-bb76-7f4a4305410f/xEBgvs8oDA.json"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
