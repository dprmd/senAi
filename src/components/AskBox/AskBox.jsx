import { useEffect } from "react";

export default function AskBox({ message, setShowAskBox, whenTrue }) {
  const onAnswer = async (answer) => {
    if (answer) {
      await whenTrue();
      setShowAskBox(false);
    } else {
      setShowAskBox(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-stone-300 dark:bg-stone-500 bg-opacity-90 dark:bg-opacity-90 flex justify-center items-center z-100">
      <div className="bg-stone-300 dark:bg-stone-600 flex flex-col justify-center items-center px-4 py-3 rounded">
        <span className="px-4 py-3">{message}</span>
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
