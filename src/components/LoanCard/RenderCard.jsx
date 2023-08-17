import React from 'react';
import {
  Card, Text, Badge, Group, ActionIcon, Tooltip
} from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../hooks/useLoading';
import {
  deleteEmpMasters
} from '../../utils/requests';

export function RenderCard({
  loan
}) {
  const { request } = useLoading();
  const navigate = useNavigate();

  return (
    <Card withBorder padding="lg" radius="md">
      <Group position="apart">
        <Badge color="blue">
          Loan Card
        </Badge>

      </Group>

      <Text fz="lg" fw={900} mt="md" color="blue">
        {loan.loanId}
      </Text>
      <Text fz="sm" color="primary">
        {loan.loanType}
      </Text>

      <Text fz="sm" c="dimmed">
        {loan.duration}
      </Text>

      <Group position="right" mt="xl">

        <Tooltip label="Edit Employee Details">
          <ActionIcon
            variant="outline"
            color="yellow"
            onClick={() => navigate(`/edit/employee/${loan.loanId}`)}
          >
            <IconEdit size="1.1rem" />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Delete Employee">
          <ActionIcon
            variant="outline"
            color="red"
            onClick={async () => {
              const response = await request(() => deleteEmpMasters(loan.loanId));
              if (response.status === 200) {
                window.location.reload();
              }
            }}
          >
            <IconTrash size="1.1rem" />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Card>
  );
}

RenderCard.propTypes = {
  loan: PropTypes.shape({
    loanId: PropTypes.string.isRequired,
    loanType: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired
  }).isRequired
};
