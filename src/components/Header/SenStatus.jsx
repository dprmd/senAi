import { useAppStore } from "../../Store/appStore";
import useOnlineStatus from "../../hooks/getOnlineStatus";

const infoStyle =
  "disable-zoom fixed top-0 bottom-0 left-0 right-0 bg-stone-100 dark:bg-stone-800 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm md:flex md:items-center";
const upperStyle = "font-inter block my-[2px] text-center text-lg font-bold";
const lowerStyle = "font-inter block my-[2px] text-center font-thin mb-2";

export default function SenStatus() {
  const [senTyping, showSenInfo, setShowSenInfo] = useAppStore((state) => [
    state.senTyping,
    state.showSenInfo,
    state.setShowSenInfo,
  ]);
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
        className="flex flex-col justify-center ml-3 pr-10 cursor-pointer"
        onClick={handleSenClick}
      >
        <span className="font-bold">Sen</span>
        {senTyping ? (
          <span className="text-sm duration-300 font-poppins">typing...</span>
        ) : (
          <span className="text-sm duration-300 font-poppins">{status}</span>
        )}
      </div>
      {showSenInfo && (
        <div className={infoStyle} onClick={handleSenClick}>
          <div className="flex flex-col justify-center items-center md:flex-row md:justify-start md:flex-1 md:px-20">
            <img
              src="img/sen.jpg"
              className={
                "w-[40%] sm:w-[30%] md:w-[30%] rounded-full h-fit my-10"
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
