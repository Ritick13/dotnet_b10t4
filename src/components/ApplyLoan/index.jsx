/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState, forwardRef } from 'react';
import {
  Stack, Container, Group, Text,
  Title, Center, Button, NumberInput, TextInput, Select
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLoading } from '../../hooks/useLoading';
import { getItemCardMastersForLoanType, getLoanCardMasters, postUser } from '../../utils/requests';

export function ApplyLoan() {
  const { user } = useAuth();
  const [employeeId, setEmployeeId] = useState(user.name);
  const [loanId, setLoanId] = useState('');
  const [itemId, setItemId] = useState('');
  const [itemValue, setItemValue] = useState(0);
  const [items, setItems] = useState([]);

  const { request } = useLoading();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await request(() => postUser({
      employeeId,
      loanId,
      itemId
    }));
    if (response.status === 201) {
      notifications.show({
        message: 'Loan Request sent and approved'
      });
      navigate('/home');
    } else if (response.status === 409) {
      notifications.show({
        message: 'Loan already taken'
      });
    }
  };

  const [loans, setLoans] = useState([]);

  const getAllLoans = async () => {
    const response = await request(getLoanCardMasters);
    if (response.status === 200) {
      setLoans(response.data.map((l) => ({
        ...l,
        value: l.loanId,
        label: l.loanType,
        group: `${l.durationYears} year period`
      })));
    }
  };

  const SelectItem = forwardRef(
    ({
      label, value, ...others
    }, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>

          <div>
            <Text size="sm">{label}</Text>
            <Text size="xs" opacity={0.65}>
              {value}
            </Text>
          </div>
        </Group>
      </div>
    )
  );

  useEffect(() => {
    getAllLoans();
  }, []);

  return (
    <Container>
      <Center>
        <Title order={2}>Apply Loans</Title>
      </Center>
      <Stack spacing="md" py={20} style={{ flex: 1 }}>
        <TextInput
          disabled
          placeholder="Enter Employee Id"
          label="Employee Id"
          value={employeeId}
          onChange={setEmployeeId}
        />

        <Select
          label="Item Category"
          placeholder="Enter Item category"
          value={loanId}
          withAsterisk
          onChange={async (event) => {
            const response = await request(
              () => getItemCardMastersForLoanType(loans.find((e) => e.loanId === event).label)
            );
            if (response.status === 200) {
              setItems(response.data.map((i) => ({
                value: i.itemId,
                ...i,
                label: i.itemDescp
              })));
            }
            setLoanId(event);
          }}
          itemComponent={SelectItem}
          data={
            loans
          }
        />
        {items.length ? (
          <>
            <Select
              label="Item Make"
              placeholder="Enter Item Make"
              value={itemId}
              itemComponent={SelectItem}
              onChange={(e) => {
                setItemId(e);
                setItemValue(items.filter((i) => i.itemId === e)[0].itemValuation);
              }}
              withAsterisk
              data={items}
            />

            <NumberInput
              disabled
              placeholder="Enter Item Value"
              label="Item Value"
              value={itemValue}
            />
          </>
        ) : null}
      </Stack>
      <Center>
        <Button
          type="submit"
          disabled={!itemValue}
          onClick={handleSubmit}
        >
          Apply Loan
        </Button>
      </Center>
    </Container>
  );
}
