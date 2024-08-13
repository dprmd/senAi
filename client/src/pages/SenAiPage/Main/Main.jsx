import ChatBubbleSkeleton from "@/components/Skeleton/ChatBubbleSkeleton";
import { useSenAiPageFetch } from "@/hooks/Fetcher/useSenAiPageFetch";
import { useEscClicked } from "@/hooks/useUtils";
import { useAppStore } from "@/store/appStore";
import { useChatsStore } from "@/store/useChatsStore";
import { lazy, Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import ScrollToBottom from "./ScrollToBottom";
const ChatBubble = lazy(() => import("./ChatBubble"));

const Main = () => {
  // hooks
  const [chats] = useChatsStore(useShallow((state) => [state.chats]));
  const [
    loadingMessages,
    bodyComponentDidFetch,
    setBodyComponentDidFetch,
    groqFetchProses,
  ] = useAppStore(
    useShallow((state) => [
      state.loadingMessages,
      state.bodyComponentDidFetch,
      state.setBodyComponentDidFetch,
      state.groqFetchProses,
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
  }, [bodyComponentDidFetch]);

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const main = document.querySelector(".main-chat");
    main.style.minHeight = `${windowHeight - 60 - 56}px`;
  }, [location]);

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [groqFetchProses]);

  return (
    <main className="main-chat relative pt-2">
      {chats.length === 0 ? (
        <div className="flex items-center justify-center">
          <span className="mt-4 inline-block max-w-[90vw] rounded-md bg-[#FFEECD] px-4 py-2 text-center text-sm text-slate-700 dark:bg-[#182229] dark:text-[#F8BF57]">
            {loadingMessages ? `${t("loading")} . . .` : t("no_messages")}
          </span>
        </div>
      ) : (
        <>
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
        </>
      )}
      <ScrollToBottom />
    </main>
  );
};

export default Main;
