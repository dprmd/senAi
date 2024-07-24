import { useShallow } from "zustand/react/shallow";
import { useAppStore } from "../../../store/appStore";

const normalPP =
  "w-10 h-10 rounded-full overflow-hidden border border-slate-600";
const showPPStyle =
  "disable-zoom fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-slate-100 dark:bg-slate-800 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm";

const ProfilePhoto = () => {
  // hooks
  const [showPP, setShowPP] = useAppStore(
    useShallow((state) => [state.showPP, state.setShowPP]),
  );

  const handlePPClick = () => {
    setShowPP(!showPP);
  };

  return (
    <>
      <button className={normalPP} onClick={handlePPClick}>
        <img src="img/sen.jpg" alt="sen ai" loading="lazy" />
      </button>
      <button
        className={showPP ? showPPStyle : "hidden"}
        onClick={handlePPClick}
      >
        <img
          src="img/sen.jpg"
          alt="sen ai"
          loading="lazy"
          className={
            showPP ? "h-fit w-[70%] rounded-full sm:w-[60%] md:w-[30%]" : ""
          }
        />
      </button>
    </>
  );
};

export default ProfilePhoto;
