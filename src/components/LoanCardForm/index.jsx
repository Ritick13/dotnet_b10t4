import React from 'react';
import {
  Stack, Container, SimpleGrid,
  Title, Center, Button, NumberInput, Select
} from '@mantine/core';
import { useForm } from '@mantine/form';
// import { notifications } from '@mantine/notifications';
// import { useLoading } from '../../hooks/useLoading';

export function LoanCardForm() {
//   const [data, setData] = React.useState([]);

  const form = useForm({
    initialValues: {
      loanId: '',
      loanType: '',
      duration: 0
    }
  });

  //   const { request } = useLoading();

  //   const handleSubmit = async () => {
  //     try {
  //       const response = await request(() => addStaff({
  //         staffId: data.filter((staff) => staff.value === form.values.staff)[0].id,
  //         isActive: form.values.isActive
  //       }));
  //       if (response.status === 200) {
  //         notifications.show({
  //           title: 'Success',
  //           color: 'teal',
  //           message: 'Staff added successfully'
  //         });
  //       }
  //     } catch (error) {
  //     //   console.log(error);
  //     }
  //   };

  return (
    <Container>
      <Center>
        <Title order={2}>Loans Cards Master Data Details</Title>
      </Center>
      <SimpleGrid cols={1}>
        <Stack spacing="md" py={20} style={{ flex: 1 }}>
          <NumberInput
            placeholder="Enter Loan Id"
            label="Loan Id"
            {...form.getInputProps('loanId')}
            withAsterisk
          />

          <Select
            label="Loan Type"
            placeholder="Enter Loan Type"
            {...form.getInputProps('loandType')}
            data={[
              'Wooden',
              'Plastic'
            ]}
          />

          <NumberInput
            placeholder="Enter Duration"
            label="Duration"
            {...form.getInputProps('duration')}
            withAsterisk
          />
        </Stack>

      </SimpleGrid>
      <Center>
        <Button
          type="submit"
        //   onClick={handleSubmit}
        >
          Apply Loan
        </Button>
      </Center>
    </Container>
  );
}
