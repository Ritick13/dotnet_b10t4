import { useForm } from '@mantine/form';
import React, { useEffect } from 'react';
import {
  TextInput,
  Title,
  Paper,
  Group,
  Button,
  Stack,
  Container,
  Center,
  PasswordInput
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { HeaderNav } from '../Header';

export function Auth() {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const form = useForm({
    initialValues: {
      employeeId: '',
      name: '',
      password: '',
      terms: true
    },

    validate: {
      employeeId: (val) => (val.length === 6 ? null : 'Invalid Employee ID'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null)
    }
  });

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const submitForm = async () => {
    try {
      login(form.values);
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Login failed',
        message: error.response.data
            && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };

  return (
    <>
      <HeaderNav opened={false} setOpened={() => { }} />
      <Container my={150}>
        <Paper radius="md" shadow="md" p="xl" withBorder>
          <Title
            align="center"
            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
          >
            LOGIN
          </Title>

          <Center>
            <lottie-player
              autoplay
              loop
              mode="normal"
              src="https://assets1.lottiefiles.com/packages/lf20_nc1bp7st.json"
              style={{ width: 200 }}
            />
          </Center>

          <form onSubmit={form.onSubmit(() => submitForm())}>
            <Stack>

              <TextInput
                required
                label="Employee Id"
                placeholder="EM1011"
                value={form.values.email}
                onChange={(event) => form.setFieldValue('employeeId', event.currentTarget.value)}
                error={form.errors.email && 'Invalid Employee Id'}
              />

              <PasswordInput
                required
                label="Password"
                placeholder="********"
                description="For employees type in Date of Birth in DD-MM-YYYY format"
                value={form.values.password}
                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                error={form.errors.password && 'Password should include at least 6 characters'}
              />

            </Stack>

            <Group position="center" mt="xl">

              <Button type="submit">Login</Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </>
  );
}
