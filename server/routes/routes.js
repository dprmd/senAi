import { Router } from "express";
import {
  getGroqReply,
  getGroqModels,
  getGroqTranscription,
} from "../controller/groqController.js";
import multer from "multer";
import fs from "fs";
import {
  deleteAllChatsInFirestore,
  deleteAllDataInFirestore,
  deleteSomeChatsInFirestore,
} from "../controller/firebaseControllerDelete.js";
import {
  checkAUser,
  getAllChatsFromFirestore,
  getAllChatsMemoryFromFirestore,
  getNameAndProfilePhotoUrl,
  getPermissionToDeleteAllData,
  getPPUrlFromFirestore,
} from "../controller/firebaseControllerGet.js";
import {
  addNewChatsToFirestore,
  addNewChatVoiceToFireStorage,
  addNewUserToFirestore,
  uploadSeenHistory,
} from "../controller/firebaseController.js";
import {
  updateName,
  updatePPUrl,
  updateProfilePhoto,
} from "../controller/firebaseControllerUpdate.js";

export const router = Router();

export const pathUpload =
  process.env.NODE_ENV === "production" ? "/tmp/media" : "media";

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pathUpload);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

console.log(process.env.NODE_ENV);
// Create uploads directory if it doesn't exist
if (!fs.existsSync(pathUpload)) {
  fs.mkdirSync(pathUpload);
}

router.post("/getGroqReply", getGroqReply);
router.post("/getGroqModels", getGroqModels);
router.post("/checkAUser", checkAUser);
router.post("/addNewUser", addNewUserToFirestore);
router.post("/getAllChats", getAllChatsFromFirestore);
router.post("/getAllChatsMemory", getAllChatsMemoryFromFirestore);
router.post("/addNewChats", addNewChatsToFirestore);
router.delete("/deleteAllChats", deleteAllChatsInFirestore);
router.delete("/deleteSomeChats", deleteSomeChatsInFirestore);
router.post("/getNameAndPPUrl", getNameAndProfilePhotoUrl);
router.post("/updateName", updateName);
router.patch("/uploadSeenHistory", uploadSeenHistory);
router.delete("/getPermissionToDeleteAllData", getPermissionToDeleteAllData);
router.delete("/deleteAllData", deleteAllDataInFirestore);
router.post(
  "/getGroqTranscription",
  upload.single("audio"),
  getGroqTranscription,
);
router.post(
  "/addNewVoiceChat",
  upload.single("audio"),
  addNewChatVoiceToFireStorage,
);
router.post("/updateProfilePhoto", upload.single("image"), updateProfilePhoto);
router.patch("/updatePPUrl", updatePPUrl);
router.post("/getPPUrl", getPPUrlFromFirestore);
