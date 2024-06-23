const normalPP =
  "w-10 h-10 rounded-full overflow-hidden border border-slate-600 cursor-pointer";
const showPPStyle =
  "disable-zoom fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-stone-100 dark:bg-stone-800 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm";

export default function ProfilePhoto({ showPP, setShowPP }) {
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
            showPP ? "w-[70%] sm:w-[60%] md:w-[30%] h-fit rounded-full" : ""
          }
        />
      </div>
    </>
  );
}
