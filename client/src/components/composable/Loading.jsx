import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from "../ui/alert-dialog";

const Loading = ({ message }) => {
  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="min-w-[300px] rounded-md p-2">
        <AlertDialogHeader>
          <AlertDialogDescription>
            <div className="flex h-full w-full items-center justify-center py-6">
              <div>
                <Loader2 className="h-8 w-8 animate-spin text-green-500 dark:text-green-600" />
              </div>
              <span className="ml-2 inline-block">{message}</span>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Loading;
