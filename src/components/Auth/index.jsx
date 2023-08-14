import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import React, { useEffect } from 'react';
import {
  TextInput,
  Title,
  Paper,
  Group,
  Button,
  Anchor,
  Stack,
  Container,
  Center,
  PasswordInput
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { registerRequest } from '../../utils/requests';
import { useAuth } from '../../hooks/useAuth';
import { HeaderNav } from '../Header';
import { useLoading } from '../../hooks/useLoading';

export function Auth() {
  const [type, toggle] = useToggle(['login', 'register']);
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const { request } = useLoading();

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
    if (type === 'login') {
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
    } else {
      try {
        const response = await request(() => registerRequest(
          form.values
        ));
        if (response.status === 201) {
          notifications.show({
            type: 'success',
            message: 'Registration successful'
          });
        } else {
          notifications.show({
            color: 'red',
            title: 'Registration failed',
            message: response.data ? response.data.message : response.message
          });
        }
      } catch (error) {
        notifications.show({
          color: 'red',
          title: 'Registration failed',
          message: error.response.data
            && error.response.data.message ? error.response.data.message : error.message
        });
      }
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
            {type.toLocaleUpperCase()}
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
              {type === 'register' && (
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  value={form.values.name}
                  onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                />
              )}

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
                value={form.values.password}
                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                error={form.errors.password && 'Password should include at least 6 characters'}
              />

            </Stack>

            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                color="dimmed"
                onClick={() => toggle()}
                size="xs"
              >
                {type === 'register'
                  ? 'Already have an account? Login'
                  : 'Don\'t have an account? Register'}
              </Anchor>
              <Button type="submit">{upperFirst(type)}</Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </>
  );
}
