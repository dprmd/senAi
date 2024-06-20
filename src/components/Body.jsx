import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const chatStyle =
  "font-inter leading-loose text-sm w-fit h-fit px-2 py-1 mt-3 inline-block rounded-bl-xl rounded-br-xl text-clip";

export default function Body({ messages, endChat }) {
  return (
    <main>
      {messages.length === 0 ? (
        <span className="text-center inline-block w-screen mt-4 text-xl font-thin italic">
          No Messages
        </span>
      ) : (
        <>
          <ul className="flex flex-col w-screen simetris mb-[58px]">
            {messages.map((message, i) => {
              return (
                <li
                  className={`${chatStyle} ${
                    (i + 1) % 2 === 0
                      ? "self-start rounded-tr-xl bg-stone-700"
                      : "self-end rounded-tl-xl bg-green-800"
                  }`}
                  key={i}
                >
                  <Markdown
                    children={message}
                    components={{
                      code(props) {
                        const { children, className, node, ...rest } = props;
                        const match = /language-(\w+)/.exec(className || "");
                        return match ? (
                          <SyntaxHighlighter
                            {...rest}
                            PreTag="div"
                            children={String(children).replace(/\n$/, "")}
                            language={match[1]}
                            style={tomorrow}
                            wrapLongLines={true}
                          />
                        ) : (
                          <code
                            {...rest}
                            className="font-bold bg-stone-500 px-2 py-1 rounded mx-1 text-slate-100"
                          >
                            {children}
                          </code>
                        );
                      },
                    }}
                  />
                </li>
              );
            })}
            <li ref={endChat}></li>
          </ul>
        </>
      )}
    </main>
  );
}
