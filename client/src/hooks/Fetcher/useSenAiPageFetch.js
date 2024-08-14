import { toast } from "@/components/ui/use-toast";
import { setLS } from "@/lib/myUtils";
import { useAppStore } from "@/store/appStore";
import { useChatsStore } from "@/store/useChatsStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useShallow } from "zustand/react/shallow";

export const useSenAiPageFetch = () => {
  // zustand
  const [
    getUserId,
    setUserId,
    setLoadingMessages,
    shouldCheckAUser,
    setShouldCheckAUser,
    shouldGetName,
    setShouldGetName,
  ] = useAppStore(
    useShallow((state) => [
      state.getUserId,
      state.setUserId,
      state.setLoadingMessages,
      state.shouldCheckAUser,
      state.setShouldCheckAUser,
      state.shouldGetName,
      state.setShouldGetName,
    ]),
  );
  const [setChats, setChatsMemory] = useChatsStore(
    useShallow((state) => [state.setChats, state.setChatsMemory]),
  );
  const [
    setName,
    setOldName,
    setCustomPPFileName,
    setCustomProfilePhotoUrl,
    setProfilePhotoUrl,
  ] = useSettingsStore(
    useShallow((state) => [
      state.setName,
      state.setOldName,
      state.setCustomPPFileName,
      state.setCustomProfilePhotoUrl,
      state.setProfilePhotoUrl,
    ]),
  );

  const senAiPageFetch = async () => {
    try {
      const {
        addNewUserToFirestoreIfNotExists,
        uploadSeenHistory,
        getAllChatsFromFirestore,
        getAllChatsMemoryFromFirestore,
        getNameAndPPUrl,
      } = await import("@/controller/CRUDFirestore");

      if (shouldCheckAUser) {
        const getUserId = await addNewUserToFirestoreIfNotExists();
        setLS("senAi-userId", getUserId);
        setUserId(getUserId);
        setShouldCheckAUser(false);
      }

      // get chats and set to state
      const [gettedChats, gettedChatsMemory] = await Promise.all([
        getAllChatsFromFirestore(getUserId()),
        getAllChatsMemoryFromFirestore(getUserId()),
        uploadSeenHistory(getUserId()),
      ]);
      setChats(gettedChats);
      setChatsMemory(gettedChatsMemory);
      setLoadingMessages(false);

      // get name and PP Url
      if (shouldGetName) {
        const { name, customPPUrl, PPUrl, PPFileName } =
          await getNameAndPPUrl(getUserId());
        setName(name);
        setOldName(name);
        setCustomProfilePhotoUrl(customPPUrl);
        setProfilePhotoUrl(PPUrl);
        setCustomPPFileName(PPFileName);
        setShouldGetName(false);
      }
    } catch (error) {
      toast({
        description: error.message,
        duration: 2000,
        variant: "destructive",
      });
    }
  };

  return senAiPageFetch;
};
