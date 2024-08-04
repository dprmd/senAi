import { useState, useEffect, lazy, Suspense } from "react";
import { generateTimeNow } from "../../../lib/generateTime";
import useOnlineStatus from "../../../hooks/useOnlineStatus";
import { useChatsStore } from "@/store/useChatsStore";
import { useShallow } from "zustand/react/shallow";
import CodeBlockSkeleton from "../../../components/Skeleton/CodeBlockSkeleton";
import DynamicSvgComponent from "@/components/svg/DynamicSvg";
import { useLongPressChat } from "@/hooks/useUtils";
import { useInView } from "react-intersection-observer";
// React Markdown
const Markdown = lazy(() => import("react-markdown"));
const CodeBlock = lazy(() => import("./CodeBlock"));
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Skeleton } from "../../../components/ui/skeleton";

const ChatBubble = ({ chat }) => {
  // hooks
  const [stillHold, triggerClearHolding] = useChatsStore(
    useShallow((state) => [state.stillHold, state.triggerClearHolding]),
  );
  const online = useOnlineStatus();
  const { ref } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  // Holding Operation
  const [holding, setHolding] = useState(false);
  const { handleHoldChatStart, handleHoldChatEnd, handleClickHoldChat } =
    useLongPressChat({
      chat,
      holding,
      setHolding,
    });

  useEffect(() => {
    setHolding(false);
  }, [triggerClearHolding]);

  return (
    <li
      aria-hidden={true}
      className={`simetris flex w-screen flex-col py-0 ${stillHold && holding ? "bg-green-800 bg-opacity-50" : ""}`}
      onTouchStart={() => {
        handleHoldChatStart();
      }}
      onTouchEnd={() => {
        handleHoldChatEnd();
      }}
      onMouseDown={handleHoldChatStart}
      onMouseUp={handleHoldChatEnd}
      onClick={handleClickHoldChat}
      ref={ref}
    >
      <div
        className={`${chatBubbleStyle} ${
          chat.position === "left"
            ? "message message-left select-none"
            : "message message-right select-none"
        }`}
      >
        <Suspense
          fallback={
            <Skeleton className="h-[36px] min-w-[50vh] bg-opacity-0 dark:bg-opacity-0"></Skeleton>
          }
        >
          <Markdown
            className="overflow-x-auto text-wrap"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                if (!inline && match) {
                  return (
                    <Suspense
                      fallback={<CodeBlockSkeleton></CodeBlockSkeleton>}
                    >
                      <CodeBlock match={match} {...props}>
                        {children}
                      </CodeBlock>
                    </Suspense>
                  );
                } else {
                  return (
                    <code
                      className={
                        className +
                        "overflow-x-scroll text-wrap font-bold text-slate-900 dark:text-white"
                      }
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }
              },
            }}
          >
            {chat.message}
          </Markdown>
        </Suspense>
        {/* {chat.message} */}
        <span className="relative -top-6 float-right -mb-6 ml-1 inline-flex flex-1 items-end justify-end">
          <span className="text-[11px] text-slate-600 dark:text-slate-300">
            {generateTimeNow(chat.time).hour}:
            {generateTimeNow(chat.time).minute}
          </span>
          {chat.position === "right" && (
            <DynamicSvgComponent
              name={"Check2All"}
              className={`mb-1 ml-[2px] fill-current text-[12px] ${online ? "text-sky-500" : "text-slate-300"} duration-1000`}
            />
          )}
        </span>
      </div>
    </li>
  );
};

const chatBubbleStyle =
  "flex flex-wrap font-inter leading-loose text-sm h-fit px-2 py-1 my-1 inline-block rounded-bl-xl rounded-br-xl max-w-[90vw] text-wrap";

export default ChatBubble;
