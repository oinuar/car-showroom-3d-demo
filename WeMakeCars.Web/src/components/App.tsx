import { useEffect } from "react";
import SocketFilter from "./SocketFilter";
import PartList from "./PartList";
import SceneView from "./SceneView";
import { useDispatch } from "../features";
import { domain } from "../features/domain";
import { useSelector } from "react-redux";
import { getActiveSocketId, getShouldStart } from "../features/view/selectors";

function App() {
  const shouldStart = useSelector(getShouldStart);
  const activeSocketId = useSelector(getActiveSocketId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldStart)
      dispatch(domain.start());

    if (activeSocketId >= 0)
      dispatch(domain.listParts({socketId: activeSocketId}));
  }, [dispatch, shouldStart, activeSocketId]);

  return (
    <div className="overflow-hidden">
      <section className="fixed w-full h-full">
        <SceneView resolutionX={1000} resolutionY={1000} enableZoom={activeSocketId < 0} />
      </section>

      <nav className="fixed top-0 w-full bg-transparent z-10">
        <div className="mx-auto text-gray-700 flex justify-between items-center py-4 px-6">
          <a href="#" className="text-2xl font-bold">
            <span className="text-yellow-500">We Make Cars!</span>
          </a>
          {/*<ul className="md:flex space-x-8 text-lg">
            <li><a href="#models" className="hover:text-yellow-500 transition-colors duration-300">Models</a></li>
            <li><a href="#about" className="hover:text-yellow-500 transition-colors duration-300">About</a></li>
            <li><a href="#contact" className="hover:text-yellow-500 transition-colors duration-300">Contact</a></li>
          </ul>*/}
        </div>
      </nav>

      <section className="py-12">
        <div className="mx-auto px-6">
          <SocketFilter />
          <PartList />
        </div>
      </section>
    </div>
  );
}

export default App;
