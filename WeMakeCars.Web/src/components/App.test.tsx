import { render, screen } from '@testing-library/react';
import { getActiveSocketId, getShouldStart } from "../features/view/selectors";
import { domain } from '../features/domain';
import { useDispatch } from '../features';
import App from './App';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: (selector: any) => selector(),
}));

jest.mock('../features', () => ({
    useDispatch: jest.fn(),
}));

jest.mock('../features/view/selectors', () => ({
    getShouldStart: jest.fn(),
    getActiveSocketId: jest.fn(),
}));

jest.mock('../features/domain', () => ({
    domain: {
        start: () => 'start',
        listParts: ({ socketId }: { socketId: number }) => `list parts ${socketId}`,
    }
}));

jest.mock('./SceneView', () => ({ resolutionX, resolutionY, enableZoom }: { resolutionX: number; resolutionY: number; enableZoom: boolean; }) => (
    <div data-testid="SceneView">X {resolutionX}, Y {resolutionY}, zoom enabled {enableZoom ? 'true' : 'false'}</div>
));

jest.mock('./SocketFilter', () => () => (
    <div data-testid="SocketFilter" />
));

jest.mock('./PartList', () => () => (
    <div data-testid="PartList" />
));

test('renders correctly', () => {
    (getShouldStart as jest.Mock).mockReturnValue(false);
    (getActiveSocketId as jest.Mock).mockReturnValue(-1);

    render(<App />);
    
    const sceneView = screen.getByTestId("SceneView");
    const socketFilter = screen.getByTestId("SocketFilter");
    const partList = screen.getByTestId("PartList");

    expect(sceneView).toBeInTheDocument();
    expect(socketFilter).toBeInTheDocument();
    expect(partList).toBeInTheDocument();
    expect(sceneView.textContent).toBe('X 1000, Y 1000, zoom enabled true');
});

test('starts', () => {
    const dispatch = jest.fn();

    (getShouldStart as jest.Mock).mockReturnValue(true);
    (getActiveSocketId as jest.Mock).mockReturnValue(-1);
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);

    render(<App />);

    expect(dispatch).toHaveBeenCalledWith(domain.start());
});

test('lists parts by socket', () => {
    const socketId = 1;
    const dispatch = jest.fn();

    (getShouldStart as jest.Mock).mockReturnValue(false);
    (getActiveSocketId as jest.Mock).mockReturnValue(socketId);
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);

    render(<App />);

    expect(dispatch).toHaveBeenCalledWith(domain.listParts({socketId}));
});

test('disables zoom when socket is active', () => {
    const socketId = 1;
    const dispatch = jest.fn();

    (getShouldStart as jest.Mock).mockReturnValue(false);
    (getActiveSocketId as jest.Mock).mockReturnValue(socketId);
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);

    render(<App />);

    const sceneView = screen.getByTestId('SceneView');

    expect(sceneView.textContent).toBe('X 1000, Y 1000, zoom enabled false');
});
