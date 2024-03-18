import { renderInContext } from 'wasp/client/test';
import { test, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { deleteTask, useQuery, getAllTasksByUser, createTask } from 'wasp/client/operations';
import DemoApp from '../../app/DemoAppPage';

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
vi.mock('wasp/client/operations', () => ({
  deleteTask: vi.fn(),
  getAllTasksByUser: vi.fn(() => [
    {
      id: '1',
      description: 'test todo 1',
      isDone: true,
      userId: 1,
      createdAt: new Date(),
      time: 'test-time',
    },
  ]),
  updateTask: vi.fn(),
  createTask: vi.fn(),
  useQuery: vi.fn(() => vi.fn(() => mockTasks)),
  generateGptResponse: vi.fn(),
}));

beforeEach(() => {
  vi.mocked(useQuery).mockImplementation(
    () =>
      ({
        data: mockTasks,
      }) as any
  );
});

test('delete a task', async () => {
  renderInContext(<DemoApp />);

  await screen.findByText('test todo 1');

  await screen.findByText('test todo 2');

  const deleteButton = await screen.getAllByTitle('Remove task');

  await deleteButton[0].click();

  expect(deleteTask).toHaveBeenCalledWith({ id: '1' });
});

test('renders all the tasks', async () => {
  renderInContext(<DemoApp />);

  expect(useQuery).toHaveBeenCalled();

  await screen.findByText('test todo 1');

  const checkBoxes = await screen.getAllByRole('checkbox');

  expect(checkBoxes[0]).toBeChecked();

  await screen.findByText('test todo 2');

  expect(checkBoxes[1]).not.toBeChecked();
});

test('can create a task', async () => {
  renderInContext(<DemoApp />);
  const input = await screen.findByPlaceholderText('Enter note description');
  const submitBtn = await screen.findByTitle('submitBtn');

  await fireEvent.change(input, { target: { value: 'walk the dog' } });
  await fireEvent.click(submitBtn);
  expect(createTask).toHaveBeenCalledWith({ description: 'walk the dog' });
});
