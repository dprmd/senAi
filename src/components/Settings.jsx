export default function Settings({ model, setModel, handleGearMenuClicked }) {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-colorLight dark:bg-colorDark text-slate-900 dark:text-slate-100 z-10 simetris flex justify-center items-center">
      <i
        className="bi bi-x-lg absolute top-0 right-0 px-4 py-3 text-xl"
        onClick={handleGearMenuClicked}
      ></i>
      <form>
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
          </select>
        </div>
      </form>
    </div>
  );
}
