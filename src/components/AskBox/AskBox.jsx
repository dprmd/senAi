import { useEffect } from "react";

export default function AskBox({ message, setShowAskBox, whenOkClicked }) {
  const onAnswer = async (answer) => {
    if (answer) {
      await whenOkClicked();
      setShowAskBox(false);
    } else {
      setShowAskBox(false);
    }
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-stone-300 dark:bg-stone-500 bg-opacity-90 dark:bg-opacity-90 flex justify-center items-center z-100">
      <div className="bg-stone-400 dark:bg-stone-600 flex flex-col justify-between items-center px-4 py-3 rounded min-h-[150px]">
        <span className="px-4 py-3 flex justify-center items-center flex-1">
          {message}
        </span>
        <div className="flex justify-end gap-x-4 w-full">
          <button
            className="px-4 py-1 text-sm bg-red-500 rounded-md"
            onClick={() => onAnswer(false)}
          >
            No
          </button>
          <button
            className="px-4 py-1 text-sm bg-green-500 rounded-md"
            onClick={() => onAnswer(true)}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
