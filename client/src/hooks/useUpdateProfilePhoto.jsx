import { toast } from "@/components/ui/use-toast";
import { useAppStore } from "@/store/appStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

export const useUpdateProfilePhoto = () => {
  // zustand
  const [userId] = useAppStore(useShallow((state) => [state.userId]));
  const [setProfilePhotoUrl] = useSettingsStore(
    useShallow((state) => [state.setProfilePhotoUrl]),
  );

  // hooks
  const { t } = useTranslation();
  const navigate = useNavigate();

  const updateProfilePhoto = (canvasElement) => {
    canvasElement.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("image", blob, `${userId}-profilePhotoUpdate.jpg`);

      const { updateProfilePhoto, updatePPUrlInFirestore } = await import(
        "@/controller/CRUDFirestore"
      );
      const newPPUrl = await updateProfilePhoto(formData);
      const successUpdatePPUrl = await updatePPUrlInFirestore(userId, newPPUrl);
      setProfilePhotoUrl(newPPUrl);
      if (successUpdatePPUrl) {
        toast({
          description: t("update_pp_success"),
          duration: 3000,
        });
      } else {
        toast({
          description: t("update_pp_failed"),
          variant: "destructive",
          duration: 3000,
        });
      }
      navigate("/settings");
    }, "image/jpeg");
  };

  return updateProfilePhoto;
};
