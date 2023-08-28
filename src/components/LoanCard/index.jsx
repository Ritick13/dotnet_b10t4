import React, { useState, useEffect } from 'react';
import {
  createStyles,
  Table,
  Title,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  Container,
  useMantineTheme,
  ActionIcon,
  ScrollArea
} from '@mantine/core';
import { keys } from '@mantine/utils';
import PropTypes from 'prop-types';
import {
  IconSelector, IconChevronDown, IconChevronUp, IconSearch, IconEye, IconPlus
} from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { useNavigate } from 'react-router-dom';
import { getLoanCardMasters } from '../../utils/requests';
import { useLoading } from '../../hooks/useLoading';
import { RenderCard } from './RenderCard';

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[4]
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21)
  }
}));

function Th({
  children, reversed, sorted, onSort
}) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton
        onClick={onSort}
        className={classes.control}
      >
        <Group position="apart">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size="0.9rem" stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

Th.propTypes = {
  children: PropTypes.node.isRequired,
  reversed: PropTypes.bool.isRequired,
  sorted: PropTypes.bool.isRequired,
  onSort: PropTypes.func.isRequired
};

function filterData(data, search) {
  const query = search.toLowerCase().trim();
  return data.filter((item) => keys(data[0]).some(
    (key) => {
      if (typeof item[key] === 'string') {
        return item[key].toLowerCase().includes(query);
      }
      return false;
    }
  ));
}

function sortData(
  data,
  payload
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export function Loans() {
  const [search, setSearch] = useState('');

  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const { request } = useLoading();

  const getAllLoans = async () => {
    const response = await request(getLoanCardMasters);
    if (response.status === 200) {
      setData(response.data);
      setSortedData(response.data);
    }
  };

  useEffect(() => {
    getAllLoans();
  }, []);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const displayModel = (row) => {
    modals.open({
      centered: true,
      withCloseButton: false,
      children: <RenderCard loan={row} />
    });
  };

  const rows = sortedData.map((row) => (
    <tr key={row.loanId}>
      <td>
        <UnstyledButton onClick={() => displayModel(row)}>
          <IconEye size="1.2rem" />
        </UnstyledButton>
      </td>
      <td style={{
        wordWrap: 'break-word',
        maxWidth: '100px',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
      >

        {row.loanId}
      </td>
      <td style={{
        wordWrap: 'break-word',
        maxWidth: '100px',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
      >
        {row.loanType}
      </td>
      <td style={{
        wordWrap: 'break-word',
        maxWidth: '100px',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
      >
        {row.durationYears}
      </td>
    </tr>
  ));

  const navigate = useNavigate();

  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <Container>
      <Center my="md">
        <Title order={2}>
          Loan Card Master Data Details
        </Title>
      </Center>
      <ScrollArea>
        <TextInput
          placeholder="Search by any field"
          mb="md"
          icon={<IconSearch size="0.9rem" stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
        <Table
          miw={700}
          horizontalSpacing="md"
          verticalSpacing="xs"
          withColumnBorders
          withBorder
          striped
          highlightOnHover
          sx={{ tableLayout: 'fixed', wordWrap: 'break-word' }}
        >
          <thead style={{
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1]
          }}
          >
            <tr>
              <th
                style={{ width: rem(50) }}
                className={
                  classes.th
                }
              >
                {' '}
              </th>
              <Th
                sorted={sortBy === 'loanId'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('loanId')}
              >
                Loan ID
              </Th>
              <Th
                sorted={sortBy === 'loanType'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('loanType')}
              >
                Loan Type
              </Th>
              <Th
                sorted={sortBy === 'durationYears'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('durationYears')}
              >
                Duration Years
              </Th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={4}>
                  <Text weight={500} align="center">
                    Nothing found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
      <ActionIcon
        onClick={() => navigate('/add/loan')}
        radius="xl"
        color="teal"
        size="xl"
        variant="filled"
        sx={{ position: 'fixed', bottom: 40, right: 40 }}
      >
        <IconPlus size={40} />
      </ActionIcon>
    </Container>
  );
}
