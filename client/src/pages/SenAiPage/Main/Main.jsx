import { useEffect, lazy, Suspense, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import { useChatsStore, useAppStore } from "@/store/appStore";
import { useEscClicked, useSenAiPageFetch } from "@/hooks/useUtils";
import ChatBubbleSkeleton from "@/components/Skeleton/ChatBubbleSkeleton";
import { useLocation } from "react-router-dom";
const ChatBubble = lazy(() => import("./ChatBubble"));

const Main = () => {
  // hooks
  const [chats] = useChatsStore((state) => [state.chats]);
  const [loadingMessages, bodyComponentDidFetch, setBodyComponentDidFetch] =
    useAppStore(
      useShallow((state) => [
        state.loadingMessages,
        state.bodyComponentDidFetch,
        state.setBodyComponentDidFetch,
      ]),
    );
  const { t } = useTranslation();
  const initFetch = useSenAiPageFetch();
  const handleEscClick = useEscClicked();
  const [location] = useState(useLocation().pathname);

  useEffect(() => {
    if (!bodyComponentDidFetch) {
      setBodyComponentDidFetch(true);
      initFetch();
    }

    document.addEventListener("keydown", handleEscClick);
    return () => {
      document.removeEventListener("keydown", handleEscClick);
    };
  }, []);

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const main = document.querySelector(".main-chat");
    main.style.minHeight = `${windowHeight - 60 - 56}px`;
  }, [location]);

  return (
    <main className="main-chat pt-2">
      {chats.length === 0 ? (
        <div className="flex items-center justify-center">
          <span className="mt-4 inline-block max-w-[90vw] rounded-md bg-[#FFEECD] px-4 py-2 text-center text-sm text-slate-700 dark:bg-[#182229] dark:text-[#F8BF57]">
            {loadingMessages ? `${t("loading")} . . .` : t("no_messages")}
          </span>
        </div>
      ) : (
        <ul className="mb-[58px] flex flex-col gap-y-1">
          {chats.map((chat) => (
            <Suspense
              fallback={
                <ChatBubbleSkeleton
                  position={chat.position}
                ></ChatBubbleSkeleton>
              }
              key={chat.time}
            >
              <ChatBubble chat={chat} />
            </Suspense>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Main;
