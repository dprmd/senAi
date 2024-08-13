/* eslint-disable no-undef */
import { Router } from "express";
import {
  getGroqReply,
  getGroqModels,
  getGroqTranscription,
} from "../controller/groqController.js";
import multer from "multer";
import fs from "fs";

// DELETE
import {
  deleteAllChatsInFirestore,
  deleteAllDataInFirestore,
  deleteSomeChatsInFirestore,
} from "../controller/firebaseControllerDelete.js";

// GET
import {
  checkAUser,
  getAllChatsFromFirestore,
  getAllChatsMemoryFromFirestore,
  getNameAndProfilePhotoUrl,
  getPermissionToDeleteAllData,
} from "../controller/firebaseControllerGet.js";

// POST
import {
  addNewChatsToFirestore,
  addNewChatVoiceToFireStorage,
  addNewUserToFirestore,
  uploadSeenHistory,
} from "../controller/firebaseController.js";

// PUT
import {
  updateName,
  updatePPUrl,
  updateProfilePhoto,
} from "../controller/firebaseControllerUpdate.js";

export const router = Router();

// Multer
export const pathUpload =
  process.env.NODE_ENV === "production" ? "/tmp/media" : "media";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pathUpload);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
if (!fs.existsSync(pathUpload)) {
  fs.mkdirSync(pathUpload);
}

// GET
router.get("/getGroqModels", getGroqModels);
router.get("/checkAUser", checkAUser);
router.get("/getAllChats", getAllChatsFromFirestore);
router.get("/getAllChatsMemory", getAllChatsMemoryFromFirestore);
router.get("/getNameAndPPUrl", getNameAndProfilePhotoUrl);
router.get("/getPermissionToDeleteAllData", getPermissionToDeleteAllData);

// POST
router.post("/getGroqReply", getGroqReply);
router.post(
  "/getGroqTranscription",
  upload.single("audio"),
  getGroqTranscription,
);
router.post("/addNewUser", addNewUserToFirestore);
router.post("/addNewChats", addNewChatsToFirestore);
router.post(
  "/addNewVoiceChat",
  upload.single("audio"),
  addNewChatVoiceToFireStorage,
);
router.post("/uploadSeenHistory", uploadSeenHistory);

// DELETE
router.delete("/deleteAllChats", deleteAllChatsInFirestore);
router.delete("/deleteSomeChats", deleteSomeChatsInFirestore);
router.delete("/deleteAllData", deleteAllDataInFirestore);

// PUT
router.put("/updateName", updateName);
router.put("/updatePPUrl", updatePPUrl);
router.put("/updateProfilePhoto", upload.single("image"), updateProfilePhoto);
