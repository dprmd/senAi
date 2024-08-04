import { lazy, Suspense } from "react";
import { useShallow } from "zustand/react/shallow";
import HeaderSkeleton from "@/components/Skeleton/HeaderSkeleton";
import { useChatsStore } from "@/store/useChatsStore";
// lazy import to spliting code
const MainNavbarTop = lazy(
  () => import("@/pages/SenAiPage/Header/MainNavbarTop"),
);
const SecondNavbarTop = lazy(
  () => import("@/pages/SenAiPage/Header/SecondNavbarTop"),
);

const Header = () => {
  // hooks
  const [stillHold] = useChatsStore(useShallow((state) => [state.stillHold]));

  return (
    <header className="simetris sticky top-0 z-10 flex max-h-[60px] min-h-[60px] items-center justify-between bg-[#F0F2F5] text-slate-900 dark:bg-[#202C33] dark:text-slate-100">
      {stillHold ? (
        <Suspense fallback={<HeaderSkeleton></HeaderSkeleton>}>
          <SecondNavbarTop />
        </Suspense>
      ) : (
        <Suspense fallback={<HeaderSkeleton></HeaderSkeleton>}>
          <MainNavbarTop />
        </Suspense>
      )}
    </header>
  );
};

export default Header;
