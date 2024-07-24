import { Router } from "express";
import { getGroqReply, getGroqModels } from "../controller/groqController.js";
import {
  addNewUserToFirestore,
  getAllChatsFromFirestore,
  addNewChatsToFirestore,
  deleteAllChatsInFirestore,
  uploadSeenHistory,
  getName,
  updateName,
  deleteSomeChatsInFirestore,
  getPermissionToDeleteAllData,
  deleteAllDataInFirestore,
  getUsersDocs,
} from "../controller/firebaseController.js";
export const router = Router();

router.post("/getGroqReply", getGroqReply);
router.post("/getGroqModels", getGroqModels);
router.post("/addNewUser", addNewUserToFirestore);
router.post("/getAllChats", getAllChatsFromFirestore);
router.post("/addNewChats", addNewChatsToFirestore);
router.delete("/deleteAllChats", deleteAllChatsInFirestore);
router.delete("/deleteSomeChats", deleteSomeChatsInFirestore);
router.post("/getName", getName);
router.post("/updateName", updateName);
router.patch("/uploadSeenHistory", uploadSeenHistory);
router.delete("/getPermissionToDeleteAllData", getPermissionToDeleteAllData);
router.delete("/deleteAllData", deleteAllDataInFirestore);
router.get("/getUsersDocs", getUsersDocs);
