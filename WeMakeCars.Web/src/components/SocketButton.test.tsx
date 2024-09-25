import { fireEvent, render, screen } from '@testing-library/react';
import { getSocketName } from '../features/domain/selectors';
import { useDispatch } from '../features';
import { view } from '../features/view';
import { getActiveSocketId } from '../features/view/selectors';
import SocketButton from './SocketButton';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector: any) => selector(),
}));

jest.mock('../features', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../features/domain/selectors', () => ({
  getSocketName: jest.fn(),
}));

jest.mock('../features/view/selectors', () => ({
  getActiveSocketId: jest.fn(),
}));

test('renders name of the socket', () => {
  const name = 'name of the socket';

  (getSocketName as jest.Mock).mockReturnValue(() => name);

  render(<SocketButton socketId={1} />);

  const button = screen.getByText(name);

  expect(button).toBeInTheDocument();
});

test('renders non-selected button', () => {
  const name = 'name of the socket';

  (getSocketName as jest.Mock).mockReturnValue(() => name);
  (getActiveSocketId as jest.Mock).mockReturnValue(2);

  render(<SocketButton socketId={1} />);

  const button = screen.getByText(name);

  expect(button).toHaveClass('bg-gray-800 text-white hover:bg-yellow-500');
});

test('renders selected button', () => {
  const name = 'name of the socket';

  (getSocketName as jest.Mock).mockReturnValue(() => name);
  (getActiveSocketId as jest.Mock).mockReturnValue(1);

  render(<SocketButton socketId={1} />);

  const button = screen.getByText(name);

  expect(button).toHaveClass('bg-yellow-500 text-black hover:bg-yellow-600 text-black');
});

test('toggles when clicked', () => {
  const name = 'name of the socket';
  const dispatch = jest.fn();

  (getSocketName as jest.Mock).mockReturnValue(() => name);
  (getActiveSocketId as jest.Mock).mockReturnValue(1);
  (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);

  render(<SocketButton socketId={1} />);

  const button = screen.getByText(name);

  fireEvent.click(button);

  expect(dispatch).toHaveBeenCalledWith(view.toggleSocket(1));
});
