import { useState, useRef } from "react";
import { useMobileDeviceType } from "@/hooks/useUtils";
import { useTranslation } from "react-i18next";
import DynamicSvgComponent from "@/components/svg/DynamicSvg";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
// shadcn ui
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useShallow } from "zustand/react/shallow";
import AlertDialogNormal from "@/components/composable/AlertDialogNormal";
import { useAppStore } from "@/store/appStore";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

const SettingFieldImage = () => {
  // zustand
  const [
    setImageFile,
    setHaveSelectImageFile,
    profilePhotoUrl,
    setProfilePhotoUrl,
    customProfilePhotoUrl,
    setCustomProfilePhotoUrl,
    customPPFileName,
    setCustomPPFileName,
  ] = useSettingsStore(
    useShallow((state) => [
      state.setImageFile,
      state.setHaveSelectImageFile,
      state.profilePhotoUrl,
      state.setProfilePhotoUrl,
      state.customProfilePhotoUrl,
      state.setCustomProfilePhotoUrl,
      state.customPPFileName,
      state.setCustomPPFileName,
    ]),
  );
  const [userId] = useAppStore(useShallow((state) => [state.userId]));

  // hooks
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isMobile = useMobileDeviceType();

  // state dan ref
  const [openDeletePPDialog, setOpenDeletePPDialog] = useState(false);
  const getLove = localStorage.getItem("senAi-love")
    ? localStorage.getItem("senAi-love")
    : "no";
  const [isLove, setIsLove] = useState(getLove === "yes" ? true : false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [openFilePicker, setOpenFilePicker] = useState(false);
  const [openPhotoPreviewSmall, setOpenPhotoPreviewSmall] = useState(false);
  const [isLoadPP, setIsLoadPP] = useState(false);

  // callback
  const handleCameraClick = async () => {
    cameraInputRef.current.click();
  };

  const handleFilesClick = () => {
    fileInputRef.current.click();
  };

  const handleCameraChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setHaveSelectImageFile(true);
      setOpenFilePicker(false);
      navigate("/settings/cropImage");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setImageFile(file);
      setHaveSelectImageFile(true);
      setOpenFilePicker(false);
      navigate("/settings/cropImage");
    } else {
      toast({
        description: t("image_format_wrong"),
        duration: 4000,
        variant: "destructive",
      });
    }
  };

  const handleLoveImage = () => {
    if (isLove) {
      localStorage.setItem("senAi-love", "no");
    } else {
      localStorage.setItem("senAi-love", "yes");
    }
    setIsLove((prev) => !prev);
  };

  const handleDeletePP = async () => {
    // ubah customPPUrl di firestore menjadi false
    const { updatePPUrlInFirestore } = await import(
      "@/controller/CRUDFirestore"
    );
    await updatePPUrlInFirestore(
      userId,
      "img/haku.jpeg",
      customPPFileName,
      "",
      false,
    );
    setCustomProfilePhotoUrl(false);
    setCustomPPFileName("");
    setOpenPhotoPreviewSmall(false);
    setProfilePhotoUrl("img/haku.jpeg");
  };

  useEffect(() => {
    const imageElement = new Image();
    imageElement.src = profilePhotoUrl;

    imageElement.addEventListener("load", () => {
      setIsLoadPP(true);
    });

    return () => {
      imageElement.removeEventListener("load", () => {});
    };
  });

  return (
    <>
      <div className="flex items-center justify-center py-5">
        <div className="relative rounded-full">
          {isLoadPP ? (
            <img
              src={profilePhotoUrl}
              className="h-full max-h-[150px] min-h-[150px] min-w-[150px] max-w-[150px] rounded-full"
              alt="Profile Photo"
              loading="lazy"
              onClick={() => {
                setOpenPhotoPreviewSmall(true);
              }}
              aria-hidden={true}
            />
          ) : (
            <Skeleton className="h-full max-h-[150px] min-h-[150px] min-w-[150px] max-w-[150px] rounded-full" />
          )}
          <button
            className="absolute bottom-4 right-0 rounded-full bg-green-600 p-2 dark:bg-green-400"
            onClick={() => {
              setOpenFilePicker(true);
            }}
          >
            <DynamicSvgComponent
              name="Camera"
              className="h-5 w-5 text-slate-100 dark:text-slate-900"
            />
          </button>
        </div>
      </div>

      {/* Change Profile Dialog */}
      <AlertDialog open={openFilePicker}>
        <AlertDialogContent
          className="top-[100%] w-full translate-y-[-100%] rounded-none rounded-t-xl sm:top-[50%] sm:translate-y-[-50%] sm:rounded-xl"
          onClickOverlay={() => {
            setOpenFilePicker(false);
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="mb-6 text-left font-bold">
              {t("profile_photo")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="flex items-center gap-x-6 pb-6">
                {/* Open Camera */}
                {isMobile && (
                  <div
                    className="flex min-w-20 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl p-1 duration-300 active:bg-green-200 dark:active:bg-green-700"
                    onClick={handleCameraClick}
                    aria-hidden={true}
                  >
                    <div>
                      <DynamicSvgComponent
                        name="Camera"
                        className="h-7 w-7 font-bold text-green-400 dark:text-green-600"
                      />
                    </div>
                    <p>Camera</p>
                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleCameraChange}
                      style={{ display: "none" }}
                      id="cameraInput"
                    />
                  </div>
                )}

                {/* Open File */}
                <div
                  className="flex min-w-20 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl p-1 duration-300 active:bg-green-200 dark:active:bg-green-700"
                  onClick={() => {
                    handleFilesClick();
                  }}
                  aria-hidden={true}
                >
                  <div>
                    <DynamicSvgComponent
                      name="CardImage"
                      className="h-7 w-7 font-bold text-green-400 dark:text-green-600"
                    />
                  </div>
                  <p>Files</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept=".png, .jpg, .jpeg"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Profile Photo */}
      <AlertDialogNormal
        openState={openDeletePPDialog}
        setOpenState={setOpenDeletePPDialog}
        showTitle={false}
        showDescription={true}
        description={t("delete_pp")}
        centerDescription={true}
        showCancel={true}
        cancelTitle={t("cancel")}
        showContinue={true}
        continueTitle={t("continue")}
        handleContinue={handleDeletePP}
      />

      {/* Profile Photo Preview Small */}
      <AlertDialog open={openPhotoPreviewSmall}>
        <AlertDialogContent
          className="h-[300px] w-[300px] rounded-none p-0"
          onClickOverlay={() => {
            setOpenPhotoPreviewSmall(false);
          }}
        >
          <AlertDialogHeader>
            <AlertDialogDescription>
              <img
                src={profilePhotoUrl}
                alt=""
                className="h-[300px] w-[300px]"
                loading="lazy"
              />
              <div className="flex w-full items-center justify-center gap-x-4 rounded-b-xl bg-slate-100 py-2 dark:bg-slate-800">
                {isLove ? (
                  <button
                    onClick={handleLoveImage}
                    className="inline-block min-h-8 min-w-8"
                  >
                    <DynamicSvgComponent
                      name="HeartFill"
                      className="h-6 w-6 animate-small-to-big text-green-400 dark:text-green-600"
                    />
                  </button>
                ) : (
                  <button
                    onClick={handleLoveImage}
                    className="inline-block min-h-8 min-w-8"
                  >
                    <DynamicSvgComponent
                      name="Heart"
                      className="h-6 w-6 animate-small-to-big text-green-400 dark:text-green-600"
                    />
                  </button>
                )}
                {customProfilePhotoUrl && (
                  <button
                    onClick={() => {
                      setOpenDeletePPDialog(true);
                    }}
                  >
                    <DynamicSvgComponent
                      name="Trash3"
                      className="h-6 w-6 animate-small-to-big text-green-400 dark:text-green-600"
                    />
                  </button>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SettingFieldImage;
