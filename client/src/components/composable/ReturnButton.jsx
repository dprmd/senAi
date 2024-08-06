import { ArrowLeft } from "lucide-react";

const ReturnButton = ({ ...props }) => {
  return (
    <button
      className="rounded-full px-3 py-2 active:bg-slate-200 dark:active:bg-slate-600"
      aria-label="back to previous page"
      {...props}
    >
      <ArrowLeft className="h-5 w-5 text-slate-900 dark:text-slate-300" />
    </button>
  );
};

export default ReturnButton;
