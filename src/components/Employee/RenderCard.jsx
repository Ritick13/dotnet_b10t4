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
  employee
}) {
  const { request } = useLoading();
  const navigate = useNavigate();

  return (
    <Card withBorder padding="lg" radius="md">
      <Group position="apart">
        <Badge color="blue">
          EmpMasters
        </Badge>
        <Badge color="orange">
          {
            new Date().getDate() - new Date(employee.doj).getDate()
          }
          days at Org
        </Badge>
      </Group>

      <Text fz="lg" fw={900} mt="md" color="blue">
        {employee.empName}
      </Text>
      <Text fz="sm" color="primary">
        {employee.empId}
      </Text>

      <Text fz="sm" c="dimmed">
        {employee.desgn}
      </Text>

      <Group position="right" mt="xl">

        <Tooltip label="Edit Employee Details">
          <ActionIcon
            variant="outline"
            color="yellow"
            onClick={() => navigate(`/edit/employee/${employee.empId}`)}
          >
            <IconEdit size="1.1rem" />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Delete Employee">
          <ActionIcon
            variant="outline"
            color="red"
            onClick={async () => {
              const response = await request(() => deleteEmpMasters(employee.empId));
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
  employee: PropTypes.shape({
    empId: PropTypes.string.isRequired,
    empName: PropTypes.string.isRequired,
    desgn: PropTypes.string.isRequired,
    doj: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired
};
