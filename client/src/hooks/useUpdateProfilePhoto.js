import { toast } from "@/components/ui/use-toast";
import { useAppStore } from "@/store/appStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import imageCompression from "browser-image-compression";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

export const useUpdateProfilePhoto = () => {
  // zustand
  const [userId] = useAppStore(useShallow((state) => [state.userId]));
  const [
    setProfilePhotoUrl,
    setCustomProfilePhotoUrl,
    customPPFileName,
    setCustomPPFileName,
    setLoadingCompressImage,
    setLoadingUploadImage,
  ] = useSettingsStore(
    useShallow((state) => [
      state.setProfilePhotoUrl,
      state.setCustomProfilePhotoUrl,
      state.customPPFileName,
      state.setCustomPPFileName,
      state.setLoadingCompressImage,
      state.setLoadingUploadImage,
    ]),
  );

  // hooks
  const { t } = useTranslation();
  const navigate = useNavigate();

  const limitFileSize = async (file) => {
    const maxSize = 200;
    const fileSize = file.size / 1024;

    if (fileSize < maxSize) {
      return file;
    } else {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      let compressAgain = true;
      let tempFile = file;

      try {
        while (compressAgain) {
          const compressedFile = await imageCompression(tempFile, options);
          tempFile = compressedFile;
          if (compressedFile.size / 1024 > maxSize) {
            compressAgain = true;
            continue;
          } else {
            compressAgain = false;
            break;
          }
        }
      } catch (error) {
        toast({
          description: t("error_compressing_image"),
          duration: 3000,
          variant: "destructive",
        });
        console.log(error);
      }

      return tempFile;
    }
  };

  const updateProfilePhoto = async (canvasElement) => {
    canvasElement.toBlob(async (blob) => {
      const formData = new FormData();

      // compress image before upload
      setLoadingCompressImage(true);
      const compressedBlob = await limitFileSize(blob);
      setLoadingCompressImage(false);

      formData.append(
        "image",
        compressedBlob,
        `${userId}-profilePhotoUpdate.jpg`,
      );
      formData.append(
        "oldPPFileName",
        JSON.stringify({ oldPPFileName: customPPFileName }),
      );

      const { updateProfilePhoto, updatePPUrlInFirestore } = await import(
        "@/controller/CRUDFirestore"
      );

      // upload image
      setLoadingUploadImage(true);
      const { PPFileName, newPPUrl } = await updateProfilePhoto(formData);
      const successUpdatePPUrl = await updatePPUrlInFirestore(
        userId,
        newPPUrl,
        PPFileName,
        true,
      );
      setLoadingUploadImage(false);

      if (successUpdatePPUrl) {
        toast({
          description: t("update_pp_success"),
          duration: 3000,
        });
        setProfilePhotoUrl(newPPUrl);
        setCustomProfilePhotoUrl(true);
        setCustomPPFileName(PPFileName);
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
