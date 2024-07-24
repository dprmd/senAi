import { Skeleton } from "../ui/skeleton";

const ChatBubbleSkeleton = ({ position }) => {
  return position === "right" ? (
    <li className="simetris flex w-screen flex-col py-0">
      <Skeleton className="message message-right h-[36px] min-w-[80vw] max-w-[80vw]"></Skeleton>
    </li>
  ) : (
    <li className="simetris flex w-screen flex-col py-0">
      <Skeleton className="message message-left h-40 min-w-[80vw] max-w-[80vw]"></Skeleton>
    </li>
  );
};

export default ChatBubbleSkeleton;
