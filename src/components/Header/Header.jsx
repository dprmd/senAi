import ProfilePhoto from "./ProfilePhoto";
import SenStatus from "./SenStatus";

export default function Header({
  senTyping,
  handleClearMessages,
  showSenInfo,
  setShowSenInfo,
  showPP,
  setShowPP,
}) {
  return (
    <header className="flex items-center justify-between simetris border-b border-b-slate-600 sticky top-0">
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
          className="text-sm border border-slate-600 px-3 py-2 rounded-xl duration-1000 active:bg-slate-100 active:text-slate-900 cursor-pointer font-poppins"
          onClick={handleClearMessages}
        >
          Clear Chat
        </button>
      </div>
    </header>
  );
}
