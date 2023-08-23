/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState, forwardRef } from 'react';
import {
  Stack, Container, SimpleGrid, Group, Text,
  Title, Center, Button, NumberInput, TextInput, Select
} from '@mantine/core';
import { useForm } from '@mantine/form';

import { notifications } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoading } from '../../hooks/useLoading';
import {
  getLoanCardMasters, getSingleItemCardMasters, postItemCardMasters, putItemCardMasters
} from '../../utils/requests';

export function ItemForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      itemId: '',
      itemCategory: '',
      itemDescp: '',
      itemValuation: 0,
      itemMake: '',
      itemStatus: 'Y'
    },
    validate: {
      itemId: (val) => (val.length === 6 ? null : 'Invalid Item ID')
    }
  });

  const { request } = useLoading();

  const handleSubmit = async () => {
    try {
      if (!id) {
        const response = await request(() => postItemCardMasters({
          ...form.values
        }));
        if (response.status === 201) {
          notifications.show({
            title: 'Success',
            color: 'teal',
            message: 'Item added successfully'
          });

          navigate('/items');
        }
      } else {
        const response = await request(() => putItemCardMasters(id, {
          ...form.values
        }));
        if (response.status === 204) {
          notifications.show({
            title: 'Success',
            color: 'teal',
            message: 'Item updated successfully'
          });
          navigate('/items');
        }
      }
    } catch (error) {
      //   console.log(error);
    }
  };

  const getData = async () => {
    const response = await request(() => getSingleItemCardMasters(id));
    if (response.status === 200) {
      form.setValues(
        response.data
      );
    }
  };

  const [loans, setLoans] = useState([]);

  const getAllLoans = async () => {
    const response = await request(getLoanCardMasters);
    if (response.status === 200) {
      setLoans(response.data.map((l) => ({
        ...l,
        value: l.loanType,
        label: l.loanType,
        group: `${l.durationYears} year period`
      })));
    }
  };

  const SelectItem = forwardRef(
    ({
      image, label, loanId, ...others
    }, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>

          <div>
            <Text size="sm">{label}</Text>
            <Text size="xs" opacity={0.65}>
              {loanId}
            </Text>
          </div>
        </Group>
      </div>
    )
  );

  useEffect(() => {
    if (id) {
      getData();
    }
    getAllLoans();
  }, [id]);

  return (
    <Container>
      <Center>
        <Title order={2}>Item Master Data Details</Title>
      </Center>
      <SimpleGrid cols={2}>
        <Stack spacing="md" py={20} style={{ flex: 1 }}>
          <TextInput
            placeholder="Enter Item Id"
            label="Item Id"
            {...form.getInputProps('itemId')}
            withAsterisk
          />
          <TextInput
            placeholder="Enter Item Description"
            label="Item Description"
            {...form.getInputProps('itemDescp')}
            withAsterisk
          />
          <Select
            label="Issue Status"
            placeholder="Enter Issue Status"
            {...form.getInputProps('itemStatus')}
            data={[
              'Y',
              'N'
            ]}
          />

        </Stack>
        <Stack spacing="md" py={20} style={{ flex: 1 }}>
          <Select
            label="Item Category"
            placeholder="Enter Item category"
            {...form.getInputProps('itemCategory')}
            itemComponent={SelectItem}
            data={
              loans
            }
          />
          <NumberInput
            placeholder="Enter Item Value"
            label="Item Value"
            {...form.getInputProps('itemValuation')}
            withAsterisk
          />
          <Select
            label="Item Make"
            placeholder="Enter Item Make"
            {...form.getInputProps('itemMake')}
            data={[
              'Company Swags',
              'From Vendors'
            ]}
          />
        </Stack>
      </SimpleGrid>
      <Center>
        <Button
          type="submit"
          onClick={handleSubmit}
        >
          {id ? 'Update' : 'Add'}
          {' '}
          Item
        </Button>
      </Center>
    </Container>
  );
}
