import { render, screen } from '@testing-library/react';
import { getActiveSocketId, listParts } from '../features/view/selectors';
import PartList from './PartList';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: (selector: any) => selector(),
}));

jest.mock('../features/view/selectors', () => ({
    listParts: jest.fn(),
    getActiveSocketId: jest.fn(),
}));

jest.mock('./PartCard', () => ({ partId, socketId }: { partId: number, socketId: number }) => (
    <div data-testid="PartCard">Part {partId} in socket {socketId}</div>
));

test('renders correctly when there are no parts', () => {
    (listParts as jest.Mock).mockReturnValue([]);

    const { container } = render(<PartList />);

    const div = container.querySelector('div > div > *');

    expect(div).toBeEmptyDOMElement();
});

test('renders with correct classes', () => {
    (listParts as jest.Mock).mockReturnValue([]);

    const { container } = render(<PartList />);

    const div = container.querySelector('div > div > *');

    expect(div?.parentElement).toHaveClass('flex flex-col items-end overflow-y-scroll');
    expect(div).toHaveClass('grid grid-cols-1 gap-8 w-96 mt-24 z-10');
});

test('renders correctly when there are parts', () => {
    (getActiveSocketId as jest.Mock).mockReturnValue(1);
    (listParts as jest.Mock).mockReturnValue([1, 2]);

    render(<PartList />);

    const divs = screen.getAllByTestId('PartCard');

    expect(divs.length).toBe(2);
    expect(divs[0].textContent).toContain('Part 1 in socket 1');
    expect(divs[1].textContent).toContain('Part 2 in socket 1');
});
