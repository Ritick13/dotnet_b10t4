import React, { useEffect } from 'react';
import {
  Stack, Container, SimpleGrid,
  Title, Center, Button, TextInput, NumberInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoading } from '../../hooks/useLoading';
import { getSingleLoanCardMasters, postLoanCardMasters, putLoanCardMasters } from '../../utils/requests';

export function LoanCardForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      loanId: '',
      loanType: '',
      durationYears: 0
    },
    validate: {
      loanId: (val) => (val.length === 6 ? null : 'Invalid Loan ID')
    }
  });

  const { request } = useLoading();

  const handleSubmit = async () => {
    try {
      if (!id) {
        const response = await request(() => postLoanCardMasters({
          ...form.values
        }));
        if (response.status === 201) {
          notifications.show({
            title: 'Success',
            color: 'teal',
            message: 'Loan added successfully'
          });

          navigate('/loans');
        }
      } else {
        const response = await request(() => putLoanCardMasters(id, {
          ...form.values
        }));
        if (response.status === 204) {
          notifications.show({
            title: 'Success',
            color: 'teal',
            message: 'Loan updated successfully'
          });
          navigate('/loans');
        }
      }
    } catch (error) {
      //   console.log(error);
    }
  };

  const getData = async () => {
    const response = await request(() => getSingleLoanCardMasters(id));
    if (response.status === 200) {
      form.setValues({
        ...response.data
      });
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  return (
    <Container>
      <Center>
        <Title order={2}>Loans Cards Master Data Details</Title>
      </Center>
      <SimpleGrid cols={1}>
        <Stack spacing="md" py={20} style={{ flex: 1 }}>
          <TextInput
            placeholder="Enter Loan Id"
            label="Loan Id"
            {...form.getInputProps('loanId')}
            withAsterisk
          />

          <TextInput
            label="Loan Type"
            placeholder="Enter Loan Type"
            {...form.getInputProps('loanType')}
            withAsterisk
          />

          <NumberInput
            placeholder="Enter Duration in Years"
            label="Duration"
            {...form.getInputProps('durationYears')}
            withAsterisk
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
          Loan
        </Button>
      </Center>
    </Container>
  );
}
