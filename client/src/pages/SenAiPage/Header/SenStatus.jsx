import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import { useAppStore, useSettingsStore } from "@/store/appStore";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import { getAge } from "@/lib/generateTime";
import senAi from "@/../package.json";

const infoStyle =
  "disable-zoom fixed top-0 bottom-0 left-0 right-0 bg-slate-100 dark:bg-slate-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm md:flex md:items-center";
const upperStyle = "font-poppins block my-[2px] text-center text-lg font-bold";
const lowerStyle =
  "font-poppins block my-[2px] text-center mb-2 text-sm text-slate-700 dark:text-slate-400";

const SenStatus = () => {
  // hooks
  const [senTyping, showSenInfo, setShowSenInfo] = useAppStore(
    useShallow((state) => [
      state.senTyping,
      state.showSenInfo,
      state.setShowSenInfo,
    ]),
  );
  const [model] = useSettingsStore(useShallow((state) => [state.model]));
  const online = useOnlineStatus();
  const { t } = useTranslation();

  const handleSenClick = () => {
    setShowSenInfo(!showSenInfo);
  };

  return (
    <>
      <button
        className="ml-3 flex flex-col justify-center pr-10"
        onClick={handleSenClick}
      >
        <h1 className="font-bold">Sen</h1>
        {senTyping ? (
          <span className="font-poppins text-sm duration-500">
            {t("typing")}
          </span>
        ) : (
          <span className="font-poppins text-sm duration-500">
            {online ? "online" : "offline"}
          </span>
        )}
      </button>
      {showSenInfo && (
        <button className={infoStyle} onClick={handleSenClick}>
          <div className="flex flex-col items-center justify-center md:flex-1 md:flex-row md:justify-start md:px-20">
            <img
              loading="lazy"
              src="img/sen.jpg"
              alt="sen ai"
              className={
                "my-5 h-fit w-[40%] rounded-full sm:w-[30%] md:w-[30%]"
              }
            />
            <ul className="md:ml-20">
              <li>
                <span className={upperStyle}>{t("senAi_name")}</span>
                <span className={lowerStyle}>Sen Ai</span>
              </li>
              <li>
                <span className={upperStyle}>{t("senAi_age")}</span>
                <span className={lowerStyle}>
                  {getAge("July", 27, 2006, 6, 6, 6)} {t("senAi_age_format")}
                </span>
              </li>
              <li>
                <span className={upperStyle}>{t("senAi_personality")}</span>
                <span className={lowerStyle}>Polontong</span>
              </li>
              <li>
                <span className={upperStyle}>{t("senAi_ai_source")}</span>
                <span className={lowerStyle}>Groq Ai</span>
              </li>
              <li>
                <span className={upperStyle}>{t("senAi_model")}</span>
                <span className={lowerStyle}>{model}</span>
              </li>
              <li>
                <span className={upperStyle}>{t("senAi_version")}</span>
                <span className={lowerStyle}>{senAi.version}</span>
              </li>
            </ul>
          </div>
        </button>
      )}
    </>
  );
};

export default SenStatus;
