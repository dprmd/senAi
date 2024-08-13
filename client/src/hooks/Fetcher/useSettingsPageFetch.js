import { toast } from "@/components/ui/use-toast";
import { useAppStore } from "@/store/appStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useShallow } from "zustand/react/shallow";

export const useSettingsPageFetch = () => {
  // zustand
  const [
    settingModelComponentDidFetch,
    setSettingModelComponentDidFetch,
    setCurrentModels,
    setOldName,
    setName,
    setProfilePhotoUrl,
    setCustomProfilePhotoUrl,
    setCustomPPFileName,
  ] = useSettingsStore(
    useShallow((state) => [
      state.settingModelComponentDidFetch,
      state.setSettingModelComponentDidFetch,
      state.setCurrentModels,
      state.setOldName,
      state.setName,
      state.setProfilePhotoUrl,
      state.setCustomProfilePhotoUrl,
      state.setCustomPPFileName,
    ]),
  );
  const [
    getUserId,
    setUserId,
    shouldCheckAUser,
    setShouldCheckAUser,
    shouldGetName,
    setShouldGetName,
  ] = useAppStore(
    useShallow((state) => [
      state.getUserId,
      state.setUserId,
      state.shouldCheckAUser,
      state.setShouldCheckAUser,
      state.shouldGetName,
      state.setShouldGetName,
    ]),
  );

  const settingsPageFetch = async () => {
    try {
      if (!settingModelComponentDidFetch) {
        const { getGroqModels } = await import("../../controller/groq");
        getGroqModels().then((models) => {
          setCurrentModels(models);
          setSettingModelComponentDidFetch(true);
        });
      }

      const { addNewUserToFirestoreIfNotExists, getNameAndPPUrl } =
        await import("../../controller/CRUDFirestore");

      if (shouldCheckAUser) {
        const getUserId = await addNewUserToFirestoreIfNotExists();
        localStorage.setItem("senAi-userId", getUserId);
        setUserId(getUserId);
        setShouldCheckAUser(false);
      }

      if (shouldGetName) {
        const { name, PPUrl, customPPUrl, PPFileName } =
          await getNameAndPPUrl(getUserId());
        setName(name);
        setOldName(name);
        setProfilePhotoUrl(PPUrl);
        setCustomProfilePhotoUrl(customPPUrl);
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

  return settingsPageFetch;
};
