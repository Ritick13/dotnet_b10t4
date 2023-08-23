import React, { useEffect, useState } from 'react';
import {
  Center,
  Container, Paper, Tabs, Title
} from '@mantine/core';
import '@lottiefiles/lottie-player';
import { CustomTable } from './CustomTable';
import { useLoading } from '../../hooks/useLoading';
import { getUser } from '../../utils/requests';

export function Homepage() {
  const { request } = useLoading();

  const [loans, setLoans] = useState([]);
  const [items, setItems] = useState([]);

  const getData = async () => {
    const response = await request(getUser);
    if (response.status === 200) {
      // if (response.data.loanTable.length !== 0) {
      setLoans(response.data.loanTable);
      // }
      // if (response.data.itemTable.length !== 0) {
      setItems(response.data.itemTable);
      // }
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
            {loans.length ? (
              <CustomTable data={loans} />
            ) : null}
          </Paper>
        </Tabs.Panel>
        <Tabs.Panel value="Items Purchased" pt="xs">
          <Paper shadow="xl" p={20}>
            {items.length ? (<CustomTable data={items} />) : null}
          </Paper>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
