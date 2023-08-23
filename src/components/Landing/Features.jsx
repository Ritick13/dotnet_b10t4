import React from 'react';
import {
  ThemeIcon,
  Text,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles
} from '@mantine/core';
import {
  IconCertificate, IconInfoCircle, IconReportAnalytics, IconDeviceMobileMessage
} from '@tabler/icons-react';
import PropTypes from 'prop-types';

export const FEATURES = [
  {
    icon: IconReportAnalytics,
    title: 'Real-time Data Analysis',
    description:
        'Loan Management allows users to analyze real-time data on incidents, and responses, enabling quick decision-making and resource allocation.'
  },
  {
    icon: IconInfoCircle,
    title: 'Incident Reporting',
    description:
        'The system provides a simple and efficient way to report incidents, including location, details, and multimedia evidence, ensuring accurate documentation for future reference.'
  },
  {
    icon: IconDeviceMobileMessage,
    title: 'Mobile App',
    description:
        'The mobile app enables users to receive real-time assignments, report incidents, and access critical information on-the-go, increasing efficiency and flexibility.'
  },
  {
    icon: IconCertificate,
    title: 'Customizable Reports',
    description:
      ' Loan Management allows administrators to generate customized reports on patrol activities, incidents, and responses, providing valuable insights and facilitating data-driven decision-making.'
  }
];

export function Feature({ icon: Icon, title, description }) {
  const theme = useMantineTheme();
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon size={20} stroke={1.5} />
      </ThemeIcon>
      <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>{title}</Text>
      <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
        {description}
      </Text>
    </div>
  );
}

Feature.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingBottom: theme.spacing.xl * 4
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: 28,
      textAlign: 'left'
    }
  },

  description: {
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      textAlign: 'left'
    }
  }
}));

export function FeaturesGrid() {
  const { theme } = useStyles();
  const features = FEATURES.map((feature) => <Feature {...feature} key={feature.title} />);

  return (
    <Container>
      {/* <Title className={classes.title}>

        Integrate effortlessly with any technology stack
      </Title> */}

      {/* <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          Every once in a while, you’ll see a Golbat that’s missing some fangs.
          This happens when hunger drives it to try biting a Steel-type Pokémon.
        </Text>
      </Container> */}

      <SimpleGrid
        mt={60}
        cols={2}
        spacing={theme.spacing.xl * 2}
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'xl' },
          { maxWidth: 755, cols: 1, spacing: 'xl' }
        ]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}
