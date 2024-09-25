import { useCallback } from "react";
import { useSelector } from "react-redux";
import { view } from "../features/view";
import { useDispatch } from "../features";
import { getActiveSocketId } from "../features/view/selectors";
import { getSocketName } from "../features/domain/selectors";

interface Props {
    socketId: number;
}

function SocketButton({socketId}: Props) {
    const name = useSelector(getSocketName(socketId));
    const selected = useSelector(getActiveSocketId) === socketId;
    const dispatch = useDispatch();
    let classes = 'bg-gray-800 text-white hover:bg-yellow-500';

    if (selected)
        classes = 'bg-yellow-500 text-black hover:bg-yellow-600';

    const click = useCallback(() => {
        dispatch(view.toggleSocket(socketId));
    }, [dispatch, socketId]);

    return (
        <button className={`${classes} px-4 py-2 rounded-lg transition-colors duration-300`} onClick={click}>
            {name}
        </button>
    );
}

export default SocketButton;
