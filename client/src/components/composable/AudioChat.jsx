import { useState } from "react";
import DynamicSvgComponent from "../svg/DynamicSvg";
import { useRef } from "react";

const AudioChat = ({ chat }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const seekBar = useRef(null);

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

  return (
    <div className="flex items-center gap-x-2 p-2">
      <audio
        src={chat.downloadUrl}
        ref={audioRef}
        onEnded={handlePlayEnd}
        onTimeUpdate={handleTimeUpdate}
      >
        <track kind="captions" />
      </audio>
      <img src="img/sen.jpg" alt="sen" className="h-11 w-11 rounded-full"></img>
      <div className="flex flex-1 items-center">
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
