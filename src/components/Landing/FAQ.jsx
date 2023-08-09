import React from 'react';
import {
  createStyles, Accordion, Grid, Col, Container, Title
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2
  },

  title: {
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`
  },

  item: {
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]
  }
}));

const FAQ = [
  {
    question: 'Can Loan Management integrate with our existing bank management system?',
    answer: 'Yes, Loan Management is designed to integrate seamlessly with existing bank management systems, allowing for a smooth transition to digital patrols.',
    value: 'what'
  },
  {
    question: 'Is Loan Management secure and compliant with data protection regulations?',
    answer: 'Yes, Loan Management is built with security and compliance in mind. The system uses encryption and access controls to protect sensitive data, and is fully compliant with data protection regulations.',
    value: 'how'
  },
  {
    question: 'How does Loan Management improve efficiency and response times?',
    answer: 'Loan Management improves efficiency and response times by streamlining administrative tasks, providing real-time data analysis and incident reporting, and facilitating communication between patrollers and administrators. This results in faster and more effective response to incidents and emergencies.',
    value: 'difference'
  }

];

export function Faq() {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Grid id="faq-grid" gutter={50}>
          <Col span={12} md={6}>
            <lottie-player
              autoplay
              loop
              mode="normal"
              src="https://assets10.lottiefiles.com/packages/lf20_bd8pdzay.json"
            />

          </Col>
          <Col span={12} md={6}>
            <Title order={2} align="left" className={classes.title}>
              Frequently Asked Questions
            </Title>

            <Accordion chevronPosition="right" defaultValue="what" variant="separated">

              {FAQ.map((item) => (
                <Accordion.Item key={item.value} value={item.value}>
                  <Accordion.Control>
                    {item.question}
                  </Accordion.Control>
                  <Accordion.Panel>
                    {item.answer}
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Grid>
      </Container>
    </div>
  );
}
