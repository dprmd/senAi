import { useShallow } from "zustand/react/shallow";
import { useAppStore } from "../store/appStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
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

export default function Settings() {
  // zustand appStore
  const [
    model,
    setModel,
    role,
    setRole,
    showSettings,
    setShowSettings,
    showAskBoxWhenApiKeyChanged,
  ] = useAppStore(
    useShallow((state) => [
      state.model,
      state.setModel,
      state.role,
      state.setRole,
      state.showSettings,
      state.setShowSettings,
      state.showAskBoxWhenApiKeyChanged,
    ]),
  );

  const [user, setUser] = useState(
    localStorage.getItem("senAi-user")
      ? localStorage.getItem("senAi-user")
      : "0",
  );
  const [userChangeDialog, setUserChangeDialog] = useState(false);

  const handleGearMenuClicked = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="simetris fixed bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center bg-[#FFFFFF] text-slate-900 dark:bg-[#202C33] dark:text-slate-100">
      {!showAskBoxWhenApiKeyChanged && (
        <i
          className="bi bi-x-lg absolute right-0 top-0 cursor-pointer px-4 py-3 text-xl"
          onClick={handleGearMenuClicked}
        ></i>
      )}

      <form className="flex min-h-[75vh] w-full flex-col items-center gap-y-3 px-6 py-4 sm:w-[80%] md:w-[40%]">
        {/* Alert */}
        <AlertDialog open={userChangeDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Refresh ?</AlertDialogTitle>
              <AlertDialogDescription>
                To apply the changes, you must refresh this page. Do you want to
                refresh?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setUserChangeDialog(false);
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-green-600 text-white hover:bg-green-400 dark:bg-green-600 dark:text-white dark:hover:bg-green-400"
                onClick={() => {
                  location.reload();
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* User */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="w-56">
            <Button variant="senAi">User</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup
              value={user}
              onValueChange={(e) => {
                localStorage.setItem("senAi-user", e);
                setUser(e);
                setUserChangeDialog(true);
              }}
            >
              <DropdownMenuRadioItem value="0">User 0</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="1">User 1</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="2">User 2</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="3">User 3</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="4">User 4</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Role */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="w-56">
            <Button variant="senAi">Role</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup
              value={role}
              onValueChange={(e) => {
                localStorage.setItem("senAi-role", e);
                setRole(e);
              }}
            >
              <DropdownMenuRadioItem value="user">User</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="system">
                System
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="assistant">
                Assistant
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Model */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="w-56">
            <Button variant="senAi">Model</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup
              value={model}
              onValueChange={(e) => {
                localStorage.setItem("senAi-model", e);
                setModel(e);
              }}
            >
              <DropdownMenuRadioItem value="gemma-7b-it">
                gemma-7b-it
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="llama3-70b-8192">
                llama3-70b-8192
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="llama3-8b-8192">
                llama3-8b-8192
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="mixtral-8x7b-32768">
                mixtral-8x7b-32768
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </form>
    </div>
  );
}
