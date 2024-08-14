import AudioChat from "@/components/composable/AudioChat";
import DynamicSvgComponent from "@/components/svg/DynamicSvg";
import { useLongPressChat } from "@/hooks/HoldChats/useLongPressChat";
import { useChatsStore } from "@/store/useChatsStore";
import { lazy, Suspense, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useShallow } from "zustand/react/shallow";
import CodeBlockSkeleton from "../../../components/Skeleton/CodeBlockSkeleton";
import { Skeleton } from "../../../components/ui/skeleton";
import useOnlineStatus from "../../../hooks/useOnlineStatus";
import { generateTimeNow } from "../../../lib/generateTime";
// React Markdown
const Markdown = lazy(() => import("react-markdown"));
const CodeBlock = lazy(() => import("./CodeBlock"));

const ChatBubble = ({ chat, isPreviousRight, isPreviousLeft, chatIndex }) => {
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
  const {
    handleHoldChatStart,
    handleHoldChatEnd,
    handleClickHoldChat,
    handleHoldMove,
  } = useLongPressChat({
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
      onTouchMove={handleHoldMove}
      onTouchStart={handleHoldChatStart}
      onTouchEnd={handleHoldChatEnd}
      onMouseDown={handleHoldChatStart}
      onMouseUp={handleHoldChatEnd}
      onClick={handleClickHoldChat}
      ref={ref}
    >
      <div
        className={`${chatBubbleStyle} ${
          chat.position === "left"
            ? `message-left ${isPreviousLeft && chatIndex !== 0 ? "rounded-tl-xl" : "message"} ${chat.type === "audio" ? "flex min-w-[300px] max-w-[300px] flex-col" : ""}`
            : `message-right ${isPreviousRight && chatIndex !== 0 ? "rounded-tr-xl" : "message"} ${chat.type === "audio" ? "flex min-w-[300px] max-w-[300px] flex-col" : ""}`
        }`}
      >
        <Suspense
          fallback={
            <Skeleton className="h-[36px] min-w-[50vh] bg-opacity-0 dark:bg-opacity-0"></Skeleton>
          }
        >
          {chat.type === "audio" && <AudioChat chat={chat} />}
          <Markdown
            className={`overflow-x-auto text-wrap`}
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
