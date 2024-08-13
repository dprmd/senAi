import { useTranslation } from "react-i18next";
// shadcn ui
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AlertDialogNormal = ({
  openState,
  setOpenState,
  showTitle,
  title,
  showDescription,
  description,
  centerDescription,
  showCancel,
  cancelTitle,
  handleCancel = () => {},
  showContinue,
  continueTitle,
  handleContinue = () => {},
  customAction = [],
  children,
  className,
}) => {
  // hooks
  const { t } = useTranslation();

  return (
    <AlertDialog open={openState}>
      <AlertDialogContent className={className}>
        <AlertDialogHeader>
          {showTitle && (
            <AlertDialogTitle className="mb-1">{title}</AlertDialogTitle>
          )}
          {showDescription && (
            <AlertDialogDescription
              className={centerDescription ? "text-center" : "text-left"}
            >
              {description ? description : ""}
              {children}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {showCancel && (
            <AlertDialogCancel
              onClick={() => {
                setOpenState(false);
                handleCancel();
              }}
              className="rounded-full px-3 hover:bg-green-200 dark:hover:bg-green-900"
            >
              {cancelTitle ? cancelTitle : t("cancel")}
            </AlertDialogCancel>
          )}
          {showContinue && (
            <AlertDialogAction
              onClick={() => {
                setOpenState(false);
                handleContinue();
              }}
              className="rounded-full px-3 hover:bg-green-200 dark:hover:bg-green-900"
            >
              {continueTitle ? continueTitle : t("continue")}
            </AlertDialogAction>
          )}
          {customAction.map(({ actionTitle, actionFunction }, i) => (
            <AlertDialogAction onClick={actionFunction} key={i}>
              {actionTitle}
            </AlertDialogAction>
          ))}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogNormal;
