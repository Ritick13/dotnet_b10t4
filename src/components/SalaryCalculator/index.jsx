import React from 'react';
import {
  Stack, Container, SimpleGrid,
  Title, Center, NumberInput, Kbd
} from '@mantine/core';
import { useForm } from '@mantine/form';

export function SalaryForm() {
  const form = useForm({
    initialValues: {
      basic: 0,
      hra: 0,
      da: 0,
      gross: 0
    }
  });

  const applyFormula = (value) => {
    form.setValues({
      basic: value,
      hra: value * 0.2,
      da: value * 0.05,
      gross: value * 1.25
    });
  };

  return (
    <Container my="xl">
      <Center>
        <Title order={2}>Salary Form</Title>
      </Center>
      <SimpleGrid cols={1}>
        <Stack spacing="md" py={40} style={{ flex: 1 }}>
          <NumberInput
            placeholder="Enter Basic Salary"
            label="Basic Salary"
            {...form.getInputProps('basic')}
            onChange={(e) => applyFormula(e)}
            withAsterisk
            hideControls
            parser={(value) => value.replace(/\$\s?|(,*)/g, '') || ''}
            formatter={(value) => (!Number.isNaN(parseFloat(value || ''))
              ? `${value}`.replace(
                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                ','
              )
              : '')}
            iconWidth={
              40
            }
            icon={(
              <Kbd>
                $
              </Kbd>
            )}
          />

          <NumberInput
            label="Your HRA"
            disabled
            {...form.getInputProps('hra')}
            hideControls
            parser={(value) => value.replace(/\$\s?|(,*)/g, '') || ''}
            formatter={(value) => (!Number.isNaN(parseFloat(value || ''))
              ? `${value}`.replace(
                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                ','
              )
              : '')}
            iconWidth={
              40
            }
            icon={(
              <Kbd>
                $
              </Kbd>
            )}

          />

          <NumberInput
            disabled
            label="Your DA"
            {...form.getInputProps('da')}
            hideControls
            parser={(value) => value.replace(/\$\s?|(,*)/g, '') || ''}
            formatter={(value) => (!Number.isNaN(parseFloat(value || ''))
              ? `${value}`.replace(
                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                ','
              )
              : '')}
            iconWidth={
              40
            }
            icon={(
              <Kbd>
                $
              </Kbd>
            )}
          />

          <NumberInput
            disabled
            label="Your Gross Salary"
            {...form.getInputProps('gross')}
            hideControls
            parser={(value) => value.replace(/\$\s?|(,*)/g, '') || ''}
            formatter={(value) => (!Number.isNaN(parseFloat(value || ''))
              ? `${value}`.replace(
                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                ','
              )
              : '')}
            iconWidth={
              40
            }
            icon={(
              <Kbd>
                $
              </Kbd>
            )}
          />
        </Stack>

      </SimpleGrid>

    </Container>
  );
}
