import React from 'react';
import {
  Stack, Container, SimpleGrid,
  Title, Center, Button, NumberInput, TextInput, Select
} from '@mantine/core';
import { useForm } from '@mantine/form';
// import { notifications } from '@mantine/notifications';
// import { useLoading } from '../../hooks/useLoading';

export function ApplyLoan() {
//   const [data, setData] = React.useState([]);

  const form = useForm({
    initialValues: {
      employeeid: '',
      itemCategory: '',
      itemDescription: '',
      itemValue: 0,
      itemMake: ''
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
        <Title order={2}>Apply Loans</Title>
      </Center>
      <SimpleGrid cols={2}>
        <Stack spacing="md" py={20} style={{ flex: 1 }}>
          <NumberInput
            placeholder="Enter Employee Id"
            label="Employee Id"
            {...form.getInputProps('employeeid')}
            withAsterisk
          />
          <TextInput
            placeholder="Enter Item Description"
            label="Item Description"
            {...form.getInputProps('itemDescription')}
            withAsterisk
          />
          <Select
            label="Item Make"
            placeholder="Enter Item Make"
            {...form.getInputProps('itemMake')}
            data={[
              'Wooden',
              'Plastic'
            ]}
          />
        </Stack>
        <Stack spacing="md" py={20} style={{ flex: 1 }}>
          <Select
            label="Item Category"
            placeholder="Enter Item category"
            {...form.getInputProps('itemCategory')}
            data={[
              'Furniture',
              'House'
            ]}
          />
          <NumberInput
            placeholder="Enter Item Value"
            label="Item Value"
            {...form.getInputProps('itemValue')}
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
