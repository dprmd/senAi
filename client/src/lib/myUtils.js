import { toast } from "@/components/ui/use-toast";

// device maps
const iosDeviceMapping = new Map([
  ["320x480", "IPhone 4S, 4, 3GS, 3G, 1st gen"],
  ["320x568", "IPhone 5, SE 1st Gen,5C, 5S"],
  ["375x667", "IPhone SE 2nd Gen, 6, 6S, 7, 8"],
  ["375x812", "IPhone X, XS, 11 Pro, 12 Mini, 13 Mini"],
  ["390x844", "IPhone 13, 13 Pro, 12, 12 Pro"],
  ["414x736", "IPhone 8+"],
  ["414x896", "IPhone 11, XR, XS Max, 11 Pro Max"],
  ["428x926", "IPhone 13 Pro Max, 12 Pro Max"],
  ["476x847", "IPhone 7+, 6+, 6S+"],
  ["744x1133", "IPad Mini 6th Gen"],
  [
    "768x1024",
    "IPad Mini (5th Gen), IPad (1-6th Gen), iPad Pro (1st Gen 9.7), Ipad Mini (1-4), IPad Air(1-2)  ",
  ],
  ["810x1080", "IPad 7-9th Gen"],
  ["820x1180", "iPad Air (4th gen)"],
  ["834x1194", "iPad Pro (3-5th Gen 11)"],
  ["834x1112", "iPad Air (3rd gen), iPad Pro (2nd gen 10.5)"],
  ["1024x1366", "iPad Pro (1-5th Gen 12.9)"],
]);

const desktopDeviceMapping = new Map([
  ["Win32", "Windows"],
  ["Linux", "Linux"],
  ["MacIntel", "Mac OS"],
]);

// get device name for android
const getAndroidDeviceName = () => {
  const androidUserAgentString = window.navigator.userAgent.slice(
    window.navigator.userAgent.indexOf("Android"),
  );
  const androidDeviceName = androidUserAgentString.slice(
    androidUserAgentString.indexOf("; ") + 1,
    androidUserAgentString.indexOf(")"),
  );
  if (androidDeviceName) {
    return androidDeviceName.trim().split(" ")[0];
  }

  return "Android";
};

// get device name for ios
const getIosDeviceName = () => {
  const screenResolution = `${window.screen.width}x${window.screen.height}`;
  const device = iosDeviceMapping.get(screenResolution);
  if (device) {
    return device;
  }
  return "Iphone";
};

// get device name for desktop
const getDesktopDeviceName = () => {
  let device;
  const platform =
    navigator?.userAgentData?.platform || navigator?.platform || "unknown";
  device = desktopDeviceMapping.get(platform) ?? "Unknown";
  return device;
};

// get device name utility
export const getDeviceName = () => {
  let device = "";

  // check if mobile device
  const isMobileDevice = window.navigator.userAgent
    .toLowerCase()
    .includes("mobi");

  if (isMobileDevice) {
    if (window.navigator.userAgent.includes("Android")) {
      device = getAndroidDeviceName();
    } else {
      device = getIosDeviceName();
    }
  } else {
    device = getDesktopDeviceName();
  }

  return device;
};

// Copy to clipboard utility, just pass the text :)
export const copyToClipboard = (text) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

// fetch data to server utility
export const fetchJson = async (endPoint, options) => {
  try {
    const request = await fetch(endPoint, options);
    const response = await request.json();
    if (import.meta.env.DEV) {
      console.log(response);
    }
    return response;
  } catch (error) {
    toast({
      title: "An Error Occured",
      description: error.message,
      duration: 2500,
      variant: "destructive",
    });
  }
};

export const resetLocalStorage = () => {
  localStorage.removeItem("senAi-theme");
  localStorage.removeItem("senAi-userId");
  localStorage.removeItem("senAi-user");
  localStorage.removeItem("senAi-model");
  localStorage.removeItem("senAi-language");
  localStorage.removeItem("senAi-languageLabel");
  localStorage.removeItem("senAi-botLanguage");
  localStorage.removeItem("senAi-enterIsSend");
  localStorage.removeItem("senAi-love");
};

export const getDeviceType = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(userAgent)) {
    return "Android";
  }
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }
  if (
    /Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent) &&
    !/iPad|iPhone|iPod/.test(userAgent)
  ) {
    return "Mac";
  }
  return "Desktop";
};
