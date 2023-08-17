import React, { useEffect } from 'react';
import {
  Stack, Container, SimpleGrid, useMantineTheme, Switch,
  Title, Center, Button, TextInput, Select, Text, Flex
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconGenderFemale, IconGenderMale } from '@tabler/icons-react';
import { DateInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoading } from '../../hooks/useLoading';
import { getSingleEmpMasters, postEmpMasters, putEmpMasters } from '../../utils/requests';

export function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();

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
      if (!id) {
        const response = await request(() => postEmpMasters({
          ...form.values,
          dob: new Date(form.values.dob.setDate(form.values.dob.getDate() + 1)),
          doj: new Date(form.values.doj.setDate(form.values.doj.getDate() + 1))
        }));
        if (response.status === 201) {
          notifications.show({
            title: 'Success',
            color: 'teal',
            message: 'Staff added successfully'
          });

          navigate('/employees');
        }
      } else {
        const response = await request(() => putEmpMasters(id, {
          ...form.values,
          dob: new Date(form.values.dob.setDate(form.values.dob.getDate() + 1)),
          doj: new Date(form.values.doj.setDate(form.values.doj.getDate() + 1))
        }));
        if (response.status === 204) {
          notifications.show({
            title: 'Success',
            color: 'teal',
            message: 'Staff updated successfully'
          });
          navigate('/employees');
        }
      }
    } catch (error) {
      //   console.log(error);
    }
  };

  const getData = async () => {
    const response = await request(() => getSingleEmpMasters(id));
    if (response.status === 200) {
      form.setValues({
        ...response.data,
        dob: new Date(response.data.dob),
        doj: new Date(response.data.doj)
      });
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

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
            valueFormat="DD/MM/YYYY"
            placeholder="Enter Date of Birth"
            label="Date of Birth"
            withAsterisk
            {...form.getInputProps('dob')}
          />
          <DateInput
            valueFormat="DD/MM/YYYY"
            placeholder="Enter Date of Joining"
            label="Date of Joining"
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
          {id ? 'Update' : 'Create'}
          {' '}
          Employee
        </Button>
      </Center>
    </Container>
  );
}
