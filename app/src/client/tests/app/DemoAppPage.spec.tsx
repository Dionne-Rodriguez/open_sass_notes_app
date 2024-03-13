import { mockServer, renderInContext } from 'wasp/client/test';
import { test, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { getAllTasksByUser } from 'wasp/client/operations';
import DemoApp from '../../app/DemoAppPage';

const { mockQuery } = mockServer();

const mockTasks = [
  {
    id: '1',
    description: 'test todo 1',
    isDone: true,
    userId: 1,
    createdAt: new Date(),
    time: 'test-time',
  },
  {
    id: '2',
    description: 'test todo 2',
    isDone: false,
    userId: 1,
    createdAt: new Date(),
    time: 'test-time',
  },
];

test('renders all the tasks', async () => {
  mockQuery(getAllTasksByUser, mockTasks);

  renderInContext(<DemoApp />);

  await screen.findByText('test todo 1');

  expect(screen.getByRole('checkbox')).toBeChecked();

  await screen.findByText('test todo 2');

  await screen.getAllByRole();

  expect(screen.getByRole('checkbox')).toBeChecked();

  screen.debug();
});
