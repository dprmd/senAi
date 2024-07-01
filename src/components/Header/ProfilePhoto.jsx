import { useAppStore } from "../../store/appStore";
import { useShallow } from "zustand/react/shallow";

const normalPP =
  "w-10 h-10 rounded-full overflow-hidden border border-slate-600 cursor-pointer";
const showPPStyle =
  "disable-zoom fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-slate-100 dark:bg-slate-800 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm";

export default function ProfilePhoto() {
  // zustand appStore
  const [showPP, setShowPP] = useAppStore(
    useShallow((state) => [state.showPP, state.setShowPP]),
  );

  const handlePPClick = () => {
    setShowPP(!showPP);
  };

  return (
    <>
      <div className={normalPP} onClick={handlePPClick}>
        <img src="img/sen.jpg" />
      </div>
      <div className={showPP ? showPPStyle : "hidden"} onClick={handlePPClick}>
        <img
          src="img/sen.jpg"
          className={
            showPP ? "h-fit w-[70%] rounded-full sm:w-[60%] md:w-[30%]" : ""
          }
        />
      </div>
    </>
  );
}
