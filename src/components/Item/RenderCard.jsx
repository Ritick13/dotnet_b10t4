import React from 'react';
import {
  Card, Text, Badge, Group, ActionIcon, Tooltip
} from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { modals } from '@mantine/modals';
import { useLoading } from '../../hooks/useLoading';
import {
  deleteItemCardMasters
} from '../../utils/requests';

export function RenderCard({
  item
}) {
  const { request } = useLoading();
  const navigate = useNavigate();

  return (
    <Card withBorder padding="lg" radius="md">
      <Group position="apart">
        <Badge color="blue">
          Item Card
        </Badge>
      </Group>

      <Text fz="lg" fw={900} mt="md" color="blue">
        {item.itemDescp}
      </Text>
      <Text fz="sm" color="primary">
        {item.itemId}
      </Text>

      <Text fz="sm" c="dimmed">
        {item.itemValuation}
      </Text>

      <Group position="right" mt="xl">

        <Tooltip label="Edit Item Card Details">
          <ActionIcon
            variant="outline"
            color="yellow"
            onClick={() => { navigate(`/edit/item/${item.itemId}`); modals.closeAll(); }}
          >
            <IconEdit size="1.1rem" />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Delete Item Card">
          <ActionIcon
            variant="outline"
            color="red"
            onClick={async () => {
              const response = await request(() => deleteItemCardMasters(item.itemId));
              if (response.status === 204) {
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
  item: PropTypes.shape({
    itemId: PropTypes.string.isRequired,
    itemDescp: PropTypes.string.isRequired,
    itemValuation: PropTypes.number.isRequired
  }).isRequired
};
