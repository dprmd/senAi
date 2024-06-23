import ProfilePhoto from "./ProfilePhoto";
import SenStatus from "./SenStatus";

export default function Header({
  senTyping,
  handleClearMessages,
  showSenInfo,
  setShowSenInfo,
  showPP,
  setShowPP,
  handleGearMenuClicked,
}) {
  return (
    <header className="flex items-center justify-between simetris border-b border-b-slate-600 sticky top-0 bg-colorLight text-slate-900 dark:bg-colorDark dark:text-slate-100">
      <div className="flex items-center flex-1">
        <ProfilePhoto showPP={showPP} setShowPP={setShowPP} />
        <SenStatus
          senTyping={senTyping}
          showSenInfo={showSenInfo}
          setShowSenInfo={setShowSenInfo}
        />
      </div>
      <div>
        <button
          className="bi bi-trash3-fill px-3 py-1 text-slate-900 fill-current dark:text-slate-300"
          onClick={handleClearMessages}
        ></button>
        <button
          className="  bi bi-gear-fill px-3 py-1 text-slate-900 fill-current dark:text-slate-300"
          onClick={handleGearMenuClicked}
        ></button>
      </div>
    </header>
  );
}
