import { useState, useEffect, useRef } from "react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import { motion } from "framer-motion";
import { toast } from "../ui/use-toast";
import { useTranslation } from "react-i18next";
import { useUpdateProfilePhoto } from "@/hooks/useUpdateProfilePhoto";
import Loading from "./Loading";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const setCanvasPreview = (image, canvas, crop, t) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    toast({
      description: t("no_2d_context"),
      duration: 3000,
      variant: "destructive",
    });
  }

  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";
  ctx.save();

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  ctx.translate(-cropX, -cropY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
  );
  ctx.restore();
};

const ImageCropper = () => {
  // zustand
  const [
    imageFile,
    setImageFile,
    haveSelectImageFile,
    setHaveSelectImageFile,
    loadingCompressImage,
    loadingUploadImage,
  ] = useSettingsStore(
    useShallow((state) => [
      state.imageFile,
      state.setImageFile,
      state.haveSelectImageFile,
      state.setHaveSelectImageFile,
      state.loadingCompressImage,
      state.loadingUploadImage,
    ]),
  );

  // hooks
  const { t } = useTranslation();
  const navigate = useNavigate();
  const updateProfilePhoto = useUpdateProfilePhoto();

  // state and ref
  const reactCropRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [crop, setCrop] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [beingUpdateProfilePhoto, setBeingUpdateProfilePhoto] = useState(false);

  // callback
  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      { unit: "%", width: cropWidthInPercent },
      ASPECT_RATIO,
      width,
      height,
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const backToSettingsPage = () => {
    setImageFile("");
    setHaveSelectImageFile(false);
    navigate("/settings");
  };

  useEffect(() => {
    if (!haveSelectImageFile) {
      navigate("/settings");
    }
  }, []);

  useEffect(() => {
    const reader = new FileReader();

    const handleLoadImageElement = (e, imageUrl) => {
      const { naturalWidth, naturalHeight } = e.currentTarget;
      if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
        toast({
          description: t("image_too_small"),
          variant: "destructive",
          duration: 3000,
        });
        backToSettingsPage();
        return setImageUrl("");
      } else {
        setImageUrl(imageUrl);
      }
    };

    const handleLoadedImage = () => {
      const imageUrl = reader.result?.toString() || "";
      const imageElement = new Image();
      imageElement.src = imageUrl;
      imageElement.addEventListener("load", (e) => {
        handleLoadImageElement(e, imageUrl);
      });
    };

    reader.addEventListener("load", handleLoadedImage);

    if (haveSelectImageFile) {
      reader.readAsDataURL(imageFile);
    }

    return () => {
      reader.removeEventListener("load", handleLoadedImage);
      setImageFile("");
      setHaveSelectImageFile(false);
    };
  }, []);

  return (
    <motion.div
      className="min-w-screen no-scrollbar z-30 flex min-h-screen flex-col items-center justify-start bg-white dark:bg-black"
      initial={{ opacity: 0, transition: { duration: 0.2 } }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div
        className="m-4 mb-[70px] flex max-h-max max-w-[400px] items-center justify-center"
        ref={imageContainerRef}
      >
        <ReactCrop
          ref={reactCropRef}
          onChange={(_, percentCrop) => {
            setCrop(percentCrop);
          }}
          crop={crop}
          circularCrop
          keepSelection
          aspect={ASPECT_RATIO}
          minWidth={MIN_DIMENSION}
        >
          <img
            ref={imageRef}
            src={imageUrl}
            alt="CroppedImage"
            className="max-h-[450px] min-h-[150px] min-w-[150px] border border-slate-400 object-contain duration-100 dark:border dark:border-slate-600"
            onLoad={onImageLoad}
          />
        </ReactCrop>
      </div>

      {/* Action */}
      <div className="fixed bottom-0 left-0 right-0 flex h-[60px] items-center justify-center bg-white text-slate-900 dark:bg-black dark:text-slate-100">
        <button
          className="mx-4 my-2 inline-block rounded-md px-4 py-2 active:bg-slate-200 dark:active:bg-slate-800"
          onClick={backToSettingsPage}
        >
          {t("cancel")}
        </button>
        <button
          className="mx-4 my-2 inline-block rounded-md px-4 py-2 active:bg-slate-200 dark:active:bg-slate-800"
          onClick={async () => {
            if (!beingUpdateProfilePhoto) {
              setCanvasPreview(
                imageRef.current,
                canvasRef.current,
                convertToPixelCrop(
                  crop,
                  imageRef.current.width,
                  imageRef.current.height,
                ),
                t,
              );
              await updateProfilePhoto(canvasRef.current);
            }
            setBeingUpdateProfilePhoto(true);
          }}
        >
          {t("done")}
        </button>
      </div>

      {/* Canvas Preview */}
      {crop && (
        <canvas
          ref={canvasRef}
          style={{
            display: "none",
            width: 150,
            height: 150,
            objectFit: "contain",
          }}
          className="mb-[140px]"
        ></canvas>
      )}

      {/* Loading */}
      {loadingCompressImage && (
        <Loading message={t("loading_compress_image")} />
      )}
      {loadingUploadImage && <Loading message={t("loading_upload_image")} />}
    </motion.div>
  );
};

export default ImageCropper;
