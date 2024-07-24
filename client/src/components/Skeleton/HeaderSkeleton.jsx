import { Skeleton } from "../ui/skeleton";

const HeaderSkeleton = () => {
  return (
    <Skeleton className="absolute left-0 right-0 top-0 max-h-[60px] min-h-[60px] w-full rounded-none"></Skeleton>
  );
};

export default HeaderSkeleton;
