import { useShallow } from "zustand/react/shallow";
import { useAppStore } from "../Store/appStore";
import AskBox from "./AskBox/AskBox";

export default function Settings() {
  // zustand appStore
  const [
    model,
    setModel,
    showSettings,
    setShowSettings,
    showAskBoxWhenApiKeyChanged,
    setShowAskBoxWhenApiKeyChanged,
  ] = useAppStore(
    useShallow((state) => [
      state.model,
      state.setModel,
      state.showSettings,
      state.setShowSettings,
      state.showAskBoxWhenApiKeyChanged,
      state.setShowAskBoxWhenApiKeyChanged,
    ])
  );

  const handleGearMenuClicked = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-colorLight dark:bg-colorDark text-slate-900 dark:text-slate-100 z-10 simetris flex justify-center items-center">
      {showAskBoxWhenApiKeyChanged && (
        <AskBox
          message={
            "To apply the changes, you must refresh the page. Do you want to refresh the page?"
          }
          whenOkClicked={() => {
            location.reload();
          }}
          setShowAskBox={setShowAskBoxWhenApiKeyChanged}
        />
      )}
      {!showAskBoxWhenApiKeyChanged && (
        <i
          className="bi bi-x-lg absolute top-0 right-0 px-4 py-3 text-xl cursor-pointer"
          onClick={handleGearMenuClicked}
        ></i>
      )}
      <form className="flex flex-col gap-y-3">
        {/* Api Key Selection */}
        <div className="flex flex-col items-center gap-y-2">
          <label htmlFor="apiKeyIndex" className="font-bold">
            Api Key
          </label>
          <select
            name="apiKeyIndex"
            id="apiKeyIndex"
            className="bg-stone-100 dark:bg-stone-700 px-4 py-2 outline-none border border-slate-400 rounded-md"
            onChange={(e) => {
              localStorage.setItem("apiKeyIndex", e.target.value);
              setShowAskBoxWhenApiKeyChanged(true);
            }}
            defaultValue={localStorage.getItem("apiKeyIndex")}
          >
            <option value="0">gsk_D8par</option>
            <option value="1">gsk_9XfDt</option>
            <option value="2">gsk_uU3ll</option>
            <option value="3">gsk_eTmNy</option>
            <option value="4">gsk_JIT4Z</option>
          </select>
        </div>

        {/* Model Selection */}
        <div className="flex flex-col items-center gap-y-2">
          <label htmlFor="model" className="font-bold">
            Model
          </label>
          <select
            name="model"
            id="model"
            className="bg-stone-100 dark:bg-stone-700 px-4 py-2 outline-none border border-slate-400 rounded-md"
            onChange={(e) => {
              localStorage.setItem("model", e.target.value);
              setModel(e.target.value);
            }}
            defaultValue={model}
          >
            <option value="gemma-7b-it">gemma-7b-it</option>
            <option value="llama3-70b-8192">llama3-70b-8192</option>
            <option value="llama3-8b-8192">llama3-8b-8192</option>
            <option value="mixtral-8x7b-32768">mixtral-8x7b-32768</option>
          </select>
        </div>
      </form>
    </div>
  );
}
