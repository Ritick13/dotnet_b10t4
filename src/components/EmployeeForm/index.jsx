import React from 'react';
import {
  Stack, Container, SimpleGrid, useMantineTheme, Switch,
  Title, Center, Button, TextInput, Select, Text, Flex
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconGenderFemale, IconGenderMale } from '@tabler/icons-react';
import { DateInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { useLoading } from '../../hooks/useLoading';
import { postEmpMasters } from '../../utils/requests';

export function EmployeeForm() {
//   const [data, setData] = React.useState([]);

  const form = useForm({
    initialValues: {
      empId: '',
      desgn: '',
      empName: '',
      dob: '',
      dept: '',
      doj: '',
      gender: 'M'
    }
  });

  const { request } = useLoading();

  const handleSubmit = async () => {
    try {
      const response = await request(() => postEmpMasters(form.values));
      if (response.status === 200) {
        notifications.show({
          title: 'Success',
          color: 'teal',
          message: 'Staff added successfully'
        });
      }
    } catch (error) {
      //   console.log(error);
    }
  };

  const theme = useMantineTheme();

  return (
    <Container>
      <Center>
        <Title order={2}>Customer Master Data Details</Title>
      </Center>
      <SimpleGrid cols={2}>
        <Stack spacing="md" py={20} style={{ flex: 1 }}>
          <TextInput
            placeholder="Enter Employee Id"
            label="Employee Id"
            {...form.getInputProps('empId')}
            withAsterisk
          />
          <TextInput
            placeholder="Enter Employee Name"
            label="Employee Name"
            {...form.getInputProps('empName')}
            withAsterisk
          />
          <Select
            label="Department"
            placeholder="Enter Department"
            {...form.getInputProps('dept')}
            data={[
              'HR',
              'Finance',
              'Technology'
            ]}
          />

        </Stack>
        <Stack spacing="md" py={20} style={{ flex: 1 }}>
          <Select
            label="Designation"
            placeholder="Enter Designation"
            {...form.getInputProps('desgn')}
            data={[
              'Manager',
              'SDE1',
              'SDE2'
            ]}
          />
          <DateInput
            placeholder="Enter Date of Birth"
            label="Date of Birth"
            withAsterisk
            {...form.getInputProps('dob')}
          />
          <DateInput
            placeholder="Enter Date of Joining"
            label="Date of Birth"
            withAsterisk
            {...form.getInputProps('doj')}
          />
        </Stack>
      </SimpleGrid>
      <Flex
        mih={50}
        justify="flex-start"
        align="center"
        direction="column"
        wrap="wrap"
      >

        <Text fz="mf" fw={500}>
          Gender
        </Text>
        <Switch
          checked={form.values.gender === 'M'}
          onChange={() => form.setFieldValue('gender', form.values.gender === 'F' ? 'M' : 'F')}
          size="lg"
          thumbIcon={
            form.values.gender === 'M' ? (<IconGenderMale color={theme.colors.dark[3]} size="1.25rem" stroke={1.5} />) : (<IconGenderFemale color={theme.colors.pink[3]} size="1.25rem" stroke={1.5} />)
          }
          onLabel={(
            <Text fw={700} fz="md">
              Male
            </Text>
          )}
          offLabel={(
            <Text fw={700} fz="md">
              Female
            </Text>
          )}
        />
      </Flex>
      <Center my="md">
        <Button
          type="submit"
          onClick={handleSubmit}
        >
          Create Employee
        </Button>
      </Center>
    </Container>
  );
}
