import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialLight,
  materialOceanic,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useSettingsStore } from "@/store/useSettingsStore";
import Check from "@/components/svg/icons/Check";
import Clipboard from "@/components/svg/icons/Clipboard";

const CodeBlock = ({ children, match, ...props }) => {
  // hooks
  const [darkMode] = useSettingsStore(useShallow((state) => [state.darkMode]));

  // state
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyCode = async (code) => {
    const { sleep } = await import("../../../lib/generateTime");
    const { copyToClipboard } = await import("../../../lib/myUtils");
    copyToClipboard(code);
    setIsCopied(true);
    await sleep(3000);
    setIsCopied(false);
  };

  return (
    <div className="relative">
      <SyntaxHighlighter
        style={darkMode ? materialOceanic : materialLight}
        PreTag="div"
        language={match[1]}
        {...props}
        className="rounded-md"
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
      <button
        className={`absolute right-0 top-0 m-3 cursor-pointer bg-[#FAFAFA] px-1 dark:bg-[#263238]`}
        onClick={() => {
          handleCopyCode(children);
        }}
      >
        {isCopied ? (
          <Check
            className={`h-6 w-6 fill-current text-xl text-stone-400 dark:text-stone-500`}
          ></Check>
        ) : (
          <Clipboard
            className={`h-6 w-6 fill-current text-xl text-stone-400 dark:text-stone-500`}
          ></Clipboard>
        )}
      </button>
    </div>
  );
};

export default CodeBlock;
