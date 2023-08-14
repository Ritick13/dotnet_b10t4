import React from 'react';
import {
  Center,
  Container, Paper, Tabs, Title
} from '@mantine/core';
import '@lottiefiles/lottie-player';
import { CustomTable } from './CustomTable';
// import { useAuth } from '../../hooks/useAuth';

export function Homepage() {
  // const { user } = useAuth();

  return (
    <Container>
      <Center>
        <Title>
          View Products and Loans
        </Title>
      </Center>
      <Tabs defaultValue="Loans Availed" mt={10}>
        <Tabs.List grow>
          <Tabs.Tab value="Loans Availed">Loans Availed</Tabs.Tab>
          <Tabs.Tab value="Items Purchased">Items Purchased</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="Loans Availed" pt="xs">
          <Paper shadow="xl" p={20}>
            <CustomTable data={[{
              'Loan Id': 'L0001',
              'Loan Type': 'Furniture',
              Duration: '5',
              'Card Issue Date': '01-02-2002'
            }]}
            />
          </Paper>
        </Tabs.Panel>
        <Tabs.Panel value="Items Purchased" pt="xs">
          <Paper shadow="xl" p={20}>
            <CustomTable data={[{
              'Item Id': '10001',
              Description: 'Tea table',
              'Item Make': 'Wooden',
              'Item Category': 'Furniture',
              Valuation: '1000'
            }]}
            />
          </Paper>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
