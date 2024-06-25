import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  gruvboxLight,
  gruvboxDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const chatStyle =
  "font-inter leading-loose text-sm max-w-full h-fit px-3 py-1 mt-3 inline-block rounded-bl-xl rounded-br-xl text-clip";

export default function Body({ messages, endChat, darkMode }) {
  return (
    <main>
      {messages.length === 0 ? (
        <span className="text-center inline-block w-screen text-xl mt-8">
          No Messages
        </span>
      ) : (
        <>
          <ul className="flex flex-col w-screen simetris mb-[58px]">
            {messages.map((message, i) => {
              return (
                <li
                  className={`${chatStyle} ${(i + 1) % 2 === 0
                    ? "self-start rounded-tr-xl bg-stone-300 dark:bg-stone-700 mr-4"
                    : "self-end rounded-tl-xl bg-green-300 dark:bg-green-800 ml-4"
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
                              " font-bold text-slate-900 dark:text-white"
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
