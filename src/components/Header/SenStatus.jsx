import { useShallow } from "zustand/react/shallow";
import { useAppStore } from "../../store/appStore";
import useOnlineStatus from "../../hooks/getOnlineStatus";

const infoStyle =
  "disable-zoom fixed top-0 bottom-0 left-0 right-0 bg-slate-100 dark:bg-slate-800 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm md:flex md:items-center";
const upperStyle = "font-inter block my-[2px] text-center text-lg font-bold";
const lowerStyle = "font-inter block my-[2px] text-center font-thin mb-2";

export default function SenStatus() {
  // zustand appStore
  const [senTyping, showSenInfo, setShowSenInfo] = useAppStore(
    useShallow((state) => [
      state.senTyping,
      state.showSenInfo,
      state.setShowSenInfo,
    ]),
  );
  const online = useOnlineStatus();
  const status = online ? "online" : "offline";

  const getAge = () => {
    const today = new Date();
    const birthDate = new Date(`July 27, 2006 00:00:00`);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSenClick = () => {
    setShowSenInfo(!showSenInfo);
  };

  return (
    <>
      <div
        className="ml-3 flex cursor-pointer flex-col justify-center pr-10"
        onClick={handleSenClick}
      >
        <span className="font-bold">Sen</span>
        {senTyping ? (
          <span className="font-poppins text-sm">typing...</span>
        ) : (
          <span className="font-poppins text-sm">{status}</span>
        )}
      </div>
      {showSenInfo && (
        <div className={infoStyle} onClick={handleSenClick}>
          <div className="flex flex-col items-center justify-center md:flex-1 md:flex-row md:justify-start md:px-20">
            <img
              src="img/sen.jpg"
              className={
                "my-10 h-fit w-[40%] rounded-full sm:w-[30%] md:w-[30%]"
              }
            />
            <ul className="md:ml-20">
              <li>
                <span className={upperStyle}>Name</span>
                <span className={lowerStyle}>Sen Ai</span>
              </li>
              <li>
                <span className={upperStyle}>Age</span>
                <span className={lowerStyle}>{getAge()} Yo</span>
              </li>
              <li>
                <span className={upperStyle}>Ai Source</span>
                <span className={lowerStyle}>Groq Ai</span>
              </li>
              <li>
                <span className={upperStyle}>Personality</span>
                <span className={lowerStyle}>Intelligent</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
