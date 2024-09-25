import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "../features";
import { useSelector } from "react-redux";
import { scene } from "../features/scene";
import { domain } from "../features/domain";
import { getPartObjModel, getPartName, getSocketTransforms, getPartPreviewUrl } from "../features/domain/selectors";
import { isPartSelected, isSocketUsed } from "../features/view/selectors";

interface Props {
    partId: number;
    socketId: number;
}

function PartCard({partId, socketId}: Props) {
    const [isHovering, setIsHovering] = useState(false);
    const name = useSelector(getPartName(partId))!;
    const objModel = useSelector(getPartObjModel(partId));
    const previewUrl = useSelector(getPartPreviewUrl(partId))!;
    const transforms = useSelector(getSocketTransforms(socketId));
    const selected = useSelector(isPartSelected(partId));
    const disabled = useSelector(isSocketUsed(socketId));
    const dispatch = useDispatch();

    const onMouseEnter = useCallback(() => setIsHovering(true), [setIsHovering]);
    const onMouseLeave = useCallback(() => setIsHovering(false), [setIsHovering]);
    const onClick = useCallback(() => {
        if (selected)
            dispatch(domain.deselectPart({partId, socketId}));
        else
            dispatch(domain.selectPart({partId, socketId}));
    }, [dispatch, partId, socketId, selected]);

    useEffect(() => {
        if (!objModel || selected)
            return;

        // Temporarly add model to scene when hovering
        if (isHovering)
            dispatch(scene.addObjModel({model: objModel, transforms}));
        else
            dispatch(scene.removeObjModel(objModel));
    }, [dispatch, objModel, transforms, selected, isHovering]);

    let classes;
    let listeners;

    if (selected) {
        classes = 'bg-yellow-500 cursor-pointer hover:bg-yellow-600 hover:shadow-xl';
        listeners = {onClick};
    }
    else if (disabled) {
        classes = 'bg-gray-800';
        listeners = {};
    }
    else {
        classes = 'bg-gray-400 cursor-pointer hover:bg-yellow-600 hover:shadow-xl';
        listeners = {onMouseEnter, onMouseLeave, onClick};
    }

    return (
        <div className={`${classes} rounded-lg overflow-hidden shadow-lg transition-shadow transition-colors duration-300`} {...listeners}>
            <img src={previewUrl} alt={`Preview image of ${name} 3D model.`} className="w-full h-48 object-cover" />
            <div className="p-4 text-center">
                <h3 className="text-lg font-bold mb-2">
                    {name}
                </h3>
            </div>
        </div>
    );
}

export default PartCard;
