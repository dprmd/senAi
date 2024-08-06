import DynamicSvgComponent from "@/components/svg/DynamicSvg";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const ScrollToBottom = () => {
  const targetRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div ref={targetRef} className="mb-[60px]"></div>
      {isVisible && (
        <button
          className="fixed bottom-[70px] right-4 z-10 w-max rounded-full bg-[#F0F2F5] p-2 shadow-sm shadow-slate-600 dark:bg-[#202C33] dark:shadow-sm dark:shadow-slate-500"
          onClick={handleScrollToBottom}
        >
          <DynamicSvgComponent
            name="DoubleArrowDown"
            className="h-5 w-5 text-slate-900 dark:text-slate-100"
          />
        </button>
      )}
    </>
  );
};

export default ScrollToBottom;
