import { useSelector } from "react-redux";
import { listSockets } from '../features/view/selectors';
import SocketButton from "./SocketButton";

function SocketFilter() {
    const sockets = useSelector(listSockets);
    const buttons = sockets.map(x => <SocketButton key={x} socketId={x} />);

    return (
        <div className="fixed w-full flex justify-center space-x-4 mb-8">
            {buttons}
        </div>
    );
}

export default SocketFilter;
