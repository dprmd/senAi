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
  title,
  description,
  centerDescription,
  showCancel,
  showContinue,
  handleCancel = () => {},
  handleContinue = () => {},
  cancelTitle,
  continueTitle,
  children,
}) => {
  // hooks
  const { t } = useTranslation();

  return (
    <AlertDialog open={openState}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-1">
            {title ? title : ""}
          </AlertDialogTitle>
          <AlertDialogDescription
            className={centerDescription ? "text-center" : "text-left"}
          >
            {description ? description : ""}
            {children}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setOpenState(false);
              handleCancel();
            }}
          >
            {showCancel ? (cancelTitle ? cancelTitle : t("cancel")) : null}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setOpenState(false);
              handleContinue();
            }}
          >
            {showContinue
              ? continueTitle
                ? continueTitle
                : t("continue")
              : null}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogNormal;
