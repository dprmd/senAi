import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  gruvboxLight,
  gruvboxDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  getAllMessagesFromFirestoreAndSetToTempMessages,
  useAppStore,
} from "../store/appStore";
import { useEffect, useState } from "react";
import {
  addNewUserToFirestoreIfNotExists,
  uploadSeenHistory,
} from "@/store/CRUDFirestore";

const chatStyle =
  "font-inter leading-loose text-sm h-fit px-3 py-1 mt-3 inline-block rounded-bl-xl rounded-br-xl max-w-[90vw] text-wrap";

export default function Body({ endChat }) {
  // zustand appStore
  const [messages, setMessages, darkMode, userId, setUserId] = useAppStore(
    (state) => [
      state.messages,
      state.setMessages,
      state.darkMode,
      state.userId,
      state.setUserId,
    ],
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const generateUserId = await addNewUserToFirestoreIfNotExists();
      setUserId(generateUserId);
    };

    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      const messages =
        await getAllMessagesFromFirestoreAndSetToTempMessages(userId);
      const compareUserId = localStorage.getItem("senAi-userId2") === userId;
      if (!compareUserId) setUserId(localStorage.getItem("senAi-userId2"));
      setMessages(messages);
      uploadSeenHistory(userId);
      setLoading(false);
    };

    init();
  }, [userId]);

  return (
    <main>
      {messages.length === 0 ? (
        <div className="flex items-center justify-center">
          <span className="mt-8 inline-block max-w-[90vw] rounded-md bg-[#FFEECD] px-4 py-2 text-center text-sm text-slate-500 dark:bg-[#182229] dark:text-[#F8BF57]">
            {loading ? "Loading . . ." : "No Messages"}
          </span>
        </div>
      ) : (
        <>
          <ul className="simetris mb-[58px] flex w-screen flex-col">
            {messages.map((message, i) => {
              return (
                <li
                  className={`${chatStyle} ${
                    (i + 1) % 2 === 0
                      ? "self-start rounded-tr-xl bg-[#FFFFFF] dark:bg-[#202C33]"
                      : "self-end rounded-tl-xl bg-[#D9FDD3] dark:bg-[#005C4B]"
                  }`}
                  ref={endChat}
                  key={i}
                >
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      code({ inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");

                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={darkMode ? gruvboxDark : gruvboxLight}
                            PreTag="div"
                            language={match[1]}
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
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
                      },
                    }}
                  >
                    {message}
                  </Markdown>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </main>
  );
}
