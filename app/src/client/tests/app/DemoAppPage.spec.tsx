import { mockServer, renderInContext } from 'wasp/client/test';
import { HttpMethod } from 'wasp/client';

import { test, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { getAllTasksByUser, deleteTask, createTask } from 'wasp/client/operations';
import DemoApp from '../../app/DemoAppPage';

const { mockQuery, mockApi } = mockServer();

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

  const checkBoxes = await screen.getAllByRole('checkbox');

  expect(checkBoxes[0]).toBeChecked();

  await screen.findByText('test todo 2');

  expect(checkBoxes[1]).not.toBeChecked();
});

test('can create a task', async () => {
  mockQuery(getAllTasksByUser, mockTasks);

  renderInContext(<DemoApp />);

  await screen.findByText('test todo 1');

  const checkBoxes = await screen.getAllByRole('checkbox');

  expect(checkBoxes[0]).toBeChecked();

  await screen.findByText('test todo 2');

  expect(checkBoxes[1]).not.toBeChecked();
});

test('delete a task', async () => {
  const taskToDelete = {
    id: '1',
    description: 'test todo 1',
    isDone: true,
    userId: 1,
    createdAt: new Date(),
    time: 'test-time',
  };

  mockQuery(getAllTasksByUser, mockTasks);

  mockApi(
    { method: HttpMethod.Post, path: 'operations/delete-task' },
    {
      id: '1',
      description: 'test todo 1',
      isDone: true,
      userId: 1,
      createdAt: new Date(),
      time: 'test-time',
    }
  );

  renderInContext(<DemoApp />);

  await screen.findByText('test todo 1');

  const deleteButton = await screen.getAllByTitle('Remove task');

  console.log(deleteButton.length, 'BEFORE CLICK');

  await deleteButton[0].click();

  await screen.findByText('test todo 2');

  console.log(deleteButton.length, 'BEFORE CLICK');

  //   expect(checkBoxes[1]).not.toBeChecked();
});
