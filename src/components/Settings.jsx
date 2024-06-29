import { useShallow } from "zustand/react/shallow";
import { useAppStore } from "../store/appStore";
import AskBox from "./AskBox/AskBox";

export default function Settings() {
  // zustand appStore
  const [
    model,
    setModel,
    role,
    setRole,
    showSettings,
    setShowSettings,
    showAskBoxWhenApiKeyChanged,
    setShowAskBoxWhenApiKeyChanged,
  ] = useAppStore(
    useShallow((state) => [
      state.model,
      state.setModel,
      state.role,
      state.setRole,
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

      <form className="flex flex-col gap-y-3 w-full min-h-[75vh] px-6 py-4">
        {/* User */}
        <div className="flex flex-col items-start gap-y-2">
          <label htmlFor="user" className="font-bold">
            User
          </label>
          <select
            name="user"
            id="user"
            className={selectStyles}
            onChange={(e) => {
              localStorage.setItem("senAi-user", e.target.value);
              setShowAskBoxWhenApiKeyChanged(true);
            }}
            defaultValue={localStorage.getItem("senAi-user")}
          >
            <option value="0">User 0</option>
            <option value="1">User 1</option>
            <option value="2">User 2</option>
            <option value="3">User 3</option>
            <option value="4">User 4</option>
          </select>
        </div>

        {/* Role */}
        <div className="flex flex-col items-start gap-y-2">
          <label htmlFor="role" className="font-bold">
            Role
          </label>
          <select
            name="role"
            id="role"
            className={selectStyles}
            onChange={(e) => {
              localStorage.setItem("senAi-role", e.target.value);
              setRole(e.target.value);
            }}
            defaultValue={role}
          >
            <option value="user">User</option>
            <option value="system">System</option>
            <option value="assistant">Assistant</option>
          </select>
        </div>

        {/* Model  */}
        <div className="flex flex-col items-start gap-y-2">
          <label htmlFor="model" className="font-bold">
            Model
          </label>
          <select
            name="model"
            id="model"
            className={selectStyles}
            onChange={(e) => {
              localStorage.setItem("senAi-model", e.target.value);
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

const selectStyles =
  "bg-stone-100 dark:bg-stone-700 px-4 py-1 outline-none border border-slate-400 dark:border-slate-600 text-sm";
