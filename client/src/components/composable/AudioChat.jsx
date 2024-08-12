import { useState } from "react";
import DynamicSvgComponent from "../svg/DynamicSvg";
import { useRef } from "react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";

const AudioChat = ({ chat }) => {
  // zustand
  const [profilePhotoUrl] = useSettingsStore(
    useShallow((state) => [state.profilePhotoUrl]),
  );

  // state and ref
  const [isLoadPP, setIsLoadPP] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const seekBar = useRef(null);

  // callback
  const handleClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  };

  const handlePlayEnd = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    const value =
      (100 / audioRef.current.duration) * audioRef.current.currentTime;
    seekBar.current.value = value;
  };

  const handleSeekBarChange = () => {
    const time = audioRef.current.duration * (seekBar.current.value / 100);
    audioRef.current.currentTime = time;
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
    <div className="flex items-center gap-x-2 pt-2">
      <audio
        src={chat.downloadUrl}
        ref={audioRef}
        onEnded={handlePlayEnd}
        onTimeUpdate={handleTimeUpdate}
      >
        <track kind="captions" />
      </audio>
      {isLoadPP ? (
        <img
          src={profilePhotoUrl}
          alt="sen"
          className="h-11 w-11 rounded-full"
        />
      ) : (
        <Skeleton className="h-11 w-11 rounded-full" />
      )}
      <div className="flex flex-1 items-center gap-x-2">
        {isPlaying ? (
          <button onClick={handleClick}>
            <DynamicSvgComponent name="Pause" className="h-7 w-7" />
          </button>
        ) : (
          <button onClick={handleClick}>
            <DynamicSvgComponent name="Play" className="h-7 w-7" />
          </button>
        )}
        <input
          type="range"
          value="0"
          max="100"
          ref={seekBar}
          onInput={handleSeekBarChange}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default AudioChat;
