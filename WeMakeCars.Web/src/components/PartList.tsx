import { useSelector } from "react-redux";
import PartCard from "./PartCard";
import { getActiveSocketId, listParts } from "../features/view/selectors";

function PartList() {
    const parts = useSelector(listParts);
    const socketId = useSelector(getActiveSocketId);
    const cards = parts.map(x => <PartCard key={x} partId={x} socketId={socketId} />);

    return (
        <div className="flex flex-col items-end overflow-y-scroll">
            <div className="grid grid-cols-1 gap-8 w-96 mt-24 z-10">
                {cards}
            </div>
        </div>
    );
}

export default PartList;
