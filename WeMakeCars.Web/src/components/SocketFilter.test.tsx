import { render, screen } from '@testing-library/react';
import { listSockets } from '../features/view/selectors';
import SocketFilter from './SocketFilter';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector: any) => selector(),
}));

jest.mock('../features/view/selectors', () => ({
  listSockets: jest.fn(),
}));

jest.mock('./SocketButton', () => ({socketId}: {socketId: number}) => (
  <button data-testid="SocketButton">Socket {socketId}</button>
));

test('renders correctly when there are no sockets', () => {
  (listSockets as jest.Mock).mockReturnValue([]);

  const { container } = render(<SocketFilter />);

  const div = container.querySelector('div');

  expect(div).toBeEmptyDOMElement();
});

test('renders with correct classes', () => {
  (listSockets as jest.Mock).mockReturnValue([]);

  const { container } = render(<SocketFilter />);

  const div = container.querySelector('div');

  expect(div).toHaveClass('fixed w-full flex justify-center space-x-4 mb-8');
});

test('renders correctly when there are sockets', () => {
  (listSockets as jest.Mock).mockReturnValue([1, 2]);

  render(<SocketFilter />);

  const buttons = screen.getAllByTestId('SocketButton');

  expect(buttons.length).toBe(2);
  expect(buttons[0].textContent).toContain('Socket 1');
  expect(buttons[1].textContent).toContain('Socket 2');
});
