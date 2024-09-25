import { fireEvent, render, screen } from '@testing-library/react';
import { getPartObjModel, getPartName, getSocketTransforms, getPartPreviewUrl } from "../features/domain/selectors";
import { isPartSelected, isSocketUsed } from "../features/view/selectors";
import { domain } from '../features/domain';
import { scene } from '../features/scene';
import { useDispatch } from '../features';
import PartCard from './PartCard';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: (selector: any) => selector(),
}));

jest.mock('../features', () => ({
    useDispatch: jest.fn(),
}));

jest.mock('../features/domain/selectors', () => ({
    getPartObjModel: jest.fn(),
    getPartName: jest.fn(),
    getSocketTransforms: jest.fn(),
    getPartPreviewUrl: jest.fn(),
}));

jest.mock('../features/view/selectors', () => ({
    isPartSelected: jest.fn(),
    isSocketUsed: jest.fn(),
}));

jest.mock('../features/domain', () => ({
    domain: {
        selectPart: ({partId, socketId}: {partId: number; socketId: number}) => `select part ${partId} ${socketId}`,
        deselectPart: ({partId, socketId}: {partId: number; socketId: number}) => `deselect part ${partId} ${socketId}`,
    }
}));

test('renders a name of the part', () => {
    const name = 'name of the part';

    (getPartName as jest.Mock).mockReturnValue(() => name);
    (getPartObjModel as jest.Mock).mockReturnValue(() => '');
    (getPartPreviewUrl as jest.Mock).mockReturnValue(() => '');
    (getSocketTransforms as jest.Mock).mockReturnValue(() => [{}]);
    (isPartSelected as jest.Mock).mockReturnValue(() => false);
    (isSocketUsed as jest.Mock).mockReturnValue(() => false);

    render(<PartCard partId={1} socketId={1} />);

    const div = screen.getByText(name);

    expect(div).toBeInTheDocument();
});

test('renders a non-selected and non-disabled card', () => {
    const name = 'name of the part';

    (getPartName as jest.Mock).mockReturnValue(() => name);
    (getPartObjModel as jest.Mock).mockReturnValue(() => '');
    (getPartPreviewUrl as jest.Mock).mockReturnValue(() => '');
    (getSocketTransforms as jest.Mock).mockReturnValue(() => [{}]);
    (isPartSelected as jest.Mock).mockReturnValue(() => false);
    (isSocketUsed as jest.Mock).mockReturnValue(() => false);

    const {container} = render(<PartCard partId={1} socketId={1} />);

    const div = container.querySelector('div');

    expect(div).toHaveClass('bg-gray-400 cursor-pointer hover:bg-yellow-600 hover:shadow-xl rounded-lg overflow-hidden shadow-lg transition-shadow transition-colors duration-300');
});

test('renders a selected card', () => {
    const name = 'name of the part';

    (getPartName as jest.Mock).mockReturnValue(() => name);
    (getPartObjModel as jest.Mock).mockReturnValue(() => '');
    (getPartPreviewUrl as jest.Mock).mockReturnValue(() => '');
    (getSocketTransforms as jest.Mock).mockReturnValue(() => [{}]);
    (isPartSelected as jest.Mock).mockReturnValue(() => true);
    (isSocketUsed as jest.Mock).mockReturnValue(() => false);

    const {container} = render(<PartCard partId={1} socketId={1} />);

    const div = container.querySelector('div');

    expect(div).toHaveClass('bg-yellow-500 cursor-pointer hover:bg-yellow-600 hover:shadow-xl rounded-lg overflow-hidden shadow-lg transition-shadow transition-colors duration-300');
});

test('renders a disabled card', () => {
    const name = 'name of the part';

    (getPartName as jest.Mock).mockReturnValue(() => name);
    (getPartObjModel as jest.Mock).mockReturnValue(() => '');
    (getPartPreviewUrl as jest.Mock).mockReturnValue(() => '');
    (getSocketTransforms as jest.Mock).mockReturnValue(() => [{}]);
    (isPartSelected as jest.Mock).mockReturnValue(() => false);
    (isSocketUsed as jest.Mock).mockReturnValue(() => true);

    const {container} = render(<PartCard partId={1} socketId={1} />);

    const div = container.querySelector('div');

    expect(div).toHaveClass('bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-shadow transition-colors duration-300');
});

test('renders card preview image', () => {
    const name = 'name of the part';
    const previewUrl = 'preview image url';

    (getPartName as jest.Mock).mockReturnValue(() => name);
    (getPartObjModel as jest.Mock).mockReturnValue(() => '');
    (getPartPreviewUrl as jest.Mock).mockReturnValue(() => previewUrl);
    (getSocketTransforms as jest.Mock).mockReturnValue(() => [{}]);
    (isPartSelected as jest.Mock).mockReturnValue(() => false);
    (isSocketUsed as jest.Mock).mockReturnValue(() => true);

    const {container} = render(<PartCard partId={1} socketId={1} />);

    const img = container.querySelector('img');

    expect(img).toHaveAttribute('src', previewUrl);
});

test('selects a non-selected card when clicked', () => {
    const name = 'name of the part';
    const partId = 1;
    const socketId = 1;
    const dispatch = jest.fn();

    (getPartName as jest.Mock).mockReturnValue(() => name);
    (getPartObjModel as jest.Mock).mockReturnValue(() => '');
    (getPartPreviewUrl as jest.Mock).mockReturnValue(() => '');
    (getSocketTransforms as jest.Mock).mockReturnValue(() => [{}]);
    (isPartSelected as jest.Mock).mockReturnValue(() => false);
    (isSocketUsed as jest.Mock).mockReturnValue(() => false);
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);

    render(<PartCard partId={partId} socketId={socketId} />);

    const div = screen.getByText(name);

    fireEvent.click(div);

    expect(dispatch).toHaveBeenCalledWith(domain.selectPart({partId, socketId}));
});

test('deselects a selected card when clicked', () => {
    const name = 'name of the part';
    const partId = 1;
    const socketId = 1;
    const dispatch = jest.fn();

    (getPartName as jest.Mock).mockReturnValue(() => name);
    (getPartObjModel as jest.Mock).mockReturnValue(() => '');
    (getPartPreviewUrl as jest.Mock).mockReturnValue(() => '');
    (getSocketTransforms as jest.Mock).mockReturnValue(() => [{}]);
    (isPartSelected as jest.Mock).mockReturnValue(() => true);
    (isSocketUsed as jest.Mock).mockReturnValue(() => false);
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);

    render(<PartCard partId={partId} socketId={socketId} />);

    const div = screen.getByText(name);

    fireEvent.click(div);

    expect(dispatch).toHaveBeenCalledWith(domain.deselectPart({partId, socketId}));
});

test('adds a part model to scene when hovering', () => {
    const name = 'name of the part';
    const model = 'obj model';
    const transforms = [{}];
    const dispatch = jest.fn();

    (getPartName as jest.Mock).mockReturnValue(() => name);
    (getPartObjModel as jest.Mock).mockReturnValue(() => model);
    (getPartPreviewUrl as jest.Mock).mockReturnValue(() => '');
    (getSocketTransforms as jest.Mock).mockReturnValue(() => transforms);
    (isPartSelected as jest.Mock).mockReturnValue(() => false);
    (isSocketUsed as jest.Mock).mockReturnValue(() => false);
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);

    render(<PartCard partId={1} socketId={1} />);

    const div = screen.getByText(name);

    fireEvent.mouseEnter(div);

    expect(dispatch).toHaveBeenCalledWith(scene.addObjModel({model, transforms}));
});

test('removes a part model from scene when not hovering', () => {
    const name = 'name of the part';
    const model = 'obj model';
    const transforms = [{}];
    const dispatch = jest.fn();

    (getPartName as jest.Mock).mockReturnValue(() => name);
    (getPartObjModel as jest.Mock).mockReturnValue(() => model);
    (getPartPreviewUrl as jest.Mock).mockReturnValue(() => '');
    (getSocketTransforms as jest.Mock).mockReturnValue(() => transforms);
    (isPartSelected as jest.Mock).mockReturnValue(() => false);
    (isSocketUsed as jest.Mock).mockReturnValue(() => false);
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);

    render(<PartCard partId={1} socketId={1} />);

    const div = screen.getByText(name);

    fireEvent.mouseLeave(div);

    expect(dispatch).toHaveBeenCalledWith(scene.removeObjModel(model));
});

test('disables hovering if part is selected', () => {
    const name = 'name of the part';
    const dispatch = jest.fn();

    (getPartName as jest.Mock).mockReturnValue(() => name);
    (getPartObjModel as jest.Mock).mockReturnValue(() => '');
    (getPartPreviewUrl as jest.Mock).mockReturnValue(() => '');
    (getSocketTransforms as jest.Mock).mockReturnValue(() => [{}]);
    (isPartSelected as jest.Mock).mockReturnValue(() => true);
    (isSocketUsed as jest.Mock).mockReturnValue(() => false);
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);

    render(<PartCard partId={1} socketId={1} />);

    const div = screen.getByText(name);

    fireEvent.mouseEnter(div);

    expect(dispatch).toHaveBeenCalledTimes(0);
});

test('disables clicking when part is disabled', () => {
    const name = 'name of the part';
    const dispatch = jest.fn();

    (getPartName as jest.Mock).mockReturnValue(() => name);
    (getPartObjModel as jest.Mock).mockReturnValue(() => '');
    (getPartPreviewUrl as jest.Mock).mockReturnValue(() => '');
    (getSocketTransforms as jest.Mock).mockReturnValue(() => [{}]);
    (isPartSelected as jest.Mock).mockReturnValue(() => false);
    (isSocketUsed as jest.Mock).mockReturnValue(() => true);
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);

    render(<PartCard partId={1} socketId={1} />);

    const div = screen.getByText(name);

    fireEvent.click(div);

    expect(dispatch).toHaveBeenCalledTimes(0);
});
