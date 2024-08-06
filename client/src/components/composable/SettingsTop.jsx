import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SettingsTop = ({ title, urlBack }) => {
  // hooks
  const navigate = useNavigate();

  return (
    <header className="simetris sticky left-0 right-0 top-0 z-10 flex max-h-[60px] min-h-[60px] items-center justify-start border-b border-slate-200 bg-[#FFFFFF] text-slate-900 dark:border-b-[1px] dark:border-slate-600 dark:bg-[#0B141A] dark:text-slate-100">
      <button
        className="rounded-full p-2 active:bg-slate-200 dark:active:bg-slate-600"
        aria-label="back to previous page"
        onClick={() => {
          navigate(urlBack);
        }}
      >
        <ArrowLeft className="h-5 w-5 text-slate-900 dark:text-slate-300" />
      </button>
      <h1 className="p-1 text-slate-900 dark:text-slate-300">{title}</h1>
    </header>
  );
};

export default SettingsTop;
