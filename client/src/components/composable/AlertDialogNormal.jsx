import { useTranslation } from "react-i18next";
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
  showDescription,
  showCancel,
  showContinue,
  title,
  description,
  centerDescription,
  cancelTitle,
  continueTitle,
  handleCancel = () => {},
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
