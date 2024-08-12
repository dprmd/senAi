import { ref, deleteObject, listAll } from "firebase/storage";
import { firestore, MY_COLLECTION, storage } from "./firebaseInit.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { comparePassword, printOutput } from "../lib/utils.js";

const deleteFolderInFirebaseStorage = (folderName) => {
  const folderPath = `${folderName}/`;
  const folderRef = ref(storage, folderPath);

  listAll(folderRef)
    .then((result) => {
      result.items.forEach((fileRef) => {
        deleteObject(fileRef)
          .then(() => {
            console.log(`Delete ${fileRef.name} Successfully`);
          })
          .catch((error) => {
            console.error(`Failed to delete ${fileRef.name}:`, error);
          });
      });
    })
    .catch((error) => {
      console.error(
        `Failed to get list all files in folder ${folderName} :`,
        error,
      );
    });
};

const deleteFilesInFirebaseStorage = (fileList, folderName) => {
  let filesTarget;

  if (typeof fileList === "string") {
    filesTarget = [fileList];
  } else if (typeof fileList === "object") {
    filesTarget = fileList;
  }

  const success = [];
  const failed = [];

  filesTarget.forEach((fileName) => {
    const fileRef = ref(storage, `${folderName}/${fileName}`);

    deleteObject(fileRef)
      .then(() => {
        success.push({ message: `Delete ${fileName} Successfully` });
      })
      .catch(() => {
        failed.push({ message: `Delete ${fileName} Failed` });
      });
  });

  return { success, failed };
};

export const deleteAllChatsInFirestore = async (req, res) => {
  const { userId, chats } = req.body;

  const chatsRef = doc(firestore, "chats", userId);
  const chatsMemoryRef = doc(firestore, "chatsMemory", userId);

  try {
    updateDoc(chatsRef, {
      chats: [],
    });
    updateDoc(chatsMemoryRef, {
      chatsMemory: [],
    });
    const deleteTask = chats.map((chat) => {
      if (chat.type === "audio") {
        const successTask = [];
        const failedTask = [];
        const { success, failed } = deleteFilesInFirebaseStorage(
          chat.audioFileName,
          "voices",
        );
        successTask.push(...success);
        failedTask.push(...failed);
        return { success: successTask, failed: failedTask };
      }
    });

    printOutput(deleteAllChatsInFirestore.name, req.body, {
      status: 202,
      message: "Delete All Chats And Its Memories",
      deleteTask,
    });
    res.status(202).json({
      status: 202,
      message: "Delete All Chats And Its Memories",
    });
  } catch (error) {
    printOutput(deleteAllChatsInFirestore.name, req.body, {
      state: 500,
      error,
    });
    res.status(500).json({ status: 500, error });
  }
};

export const deleteSomeChatsInFirestore = async (req, res) => {
  const { userId, someChatsNew, someChatsDeleted } = req.body;

  const chatsRef = doc(firestore, "chats", userId);
  const chatsMemoryRef = doc(firestore, "chatsMemory", userId);
  const chatsMemoryNew = someChatsNew.map((chat) => ({
    role: chat.position === "right" ? "user" : "assistant",
    content: chat.message,
  }));

  try {
    updateDoc(chatsRef, {
      chats: someChatsNew,
    });
    updateDoc(chatsMemoryRef, {
      chatsMemory: chatsMemoryNew,
    });
    const deleteTask = someChatsDeleted.map((chat) => {
      if (chat.type === "audio") {
        const successTask = [];
        const failedTask = [];
        const { success, failed } = deleteFilesInFirebaseStorage(
          chat.audioFileName,
          "voices",
        );
        successTask.push(...success);
        failedTask.push(...failed);
        return { success: successTask, failed: failedTask };
      }
    });

    printOutput(deleteSomeChatsInFirestore.name, req.body, {
      status: 202,
      message: "Delete Some Chats You Selected",
      deleteTask,
    });
    res.status(202).json({
      status: 202,
      message: "Delete Some Chats You Selected",
    });
  } catch (error) {
    printOutput(deleteSomeChatsInFirestore.name, req.body, {
      status: 500,
      error,
    });
    res.status(500).json({ status: 500, error });
  }
};

export const deleteAllDataInFirestore = async (req, res) => {
  const { userId, securityCode, option } = req.body;

  const passwordRef = doc(firestore, "password", "passwordDeleteAllData");
  const userRef = doc(firestore, "users", userId);
  const chatsRef = doc(firestore, "chats", userId);
  const backupChatsRef = doc(firestore, "backupChats", userId);
  const chatsMemoryRef = doc(firestore, "chatsMemory", userId);

  try {
    const passwordSnap = await getDoc(passwordRef);
    const userSnap = await getDoc(userRef);
    const chatsSnap = await getDoc(chatsRef);
    const backupChatsSnap = await getDoc(backupChatsRef);
    const chatsMemorySnap = await getDoc(chatsMemoryRef);

    if (passwordSnap.exists()) {
      const encryptedPassword = passwordSnap.data().passwordDeleteAllData;
      const compareResult = comparePassword(securityCode, encryptedPassword);

      if (compareResult) {
        if (
          userSnap.exists() &&
          chatsSnap.exists() &&
          backupChatsSnap.exists() &&
          chatsMemorySnap.exists()
        ) {
          if (option.withChats || option.withBackupChats) {
            await updateDoc(chatsMemoryRef, { chatsMemory: [] });
          }

          if (option.withLastSeenHistory) {
            await updateDoc(userRef, { lastSeen: "", seenHistory: [] });
          }

          if (option.withChats) {
            await updateDoc(chatsRef, { chats: [] });
          }

          if (option.withBackupChats) {
            await updateDoc(backupChatsRef, { backupChats: [] });
          }

          if (option.withDestroyAllCollections) {
            MY_COLLECTION.forEach(async (collectionName) => {
              const batchSize = 100;
              await deleteCollection(collectionName, batchSize)
                .then(() => {
                  console.log(`Collection ${collectionName} Has Deleted`);
                })
                .catch((error) => {
                  console.error(
                    `Fail to delete ${collectionName} Collection`,
                    error,
                  );
                });
            });
            deleteFolderInFirebaseStorage("images");
            deleteFolderInFirebaseStorage("voices");
          }

          printOutput(deleteAllDataInFirestore.name, req.body, {
            status: 202,
            whichDelete: {
              chats: option.withChats,
              backupChats: option.withBackupChats,
              lastSeenHistory: option.withLastSeenHistory,
              allCollections: option.withDestroyAllCollections,
            },
          });
          res.status(202).json({
            status: 202,
            whichDelete: {
              chats: option.withChats,
              backupChats: option.withBackupChats,
              lastSeenHistory: option.withLastSeenHistory,
              allCollections: option.withDestroyAllCollections,
            },
          });
        } else {
          printOutput(deleteAllDataInFirestore.name, req.body, {
            status: 404,
            message: `No Such Document Match With ${userId}`,
          });
          res.status(404).json({
            status: 404,
            message: `No Such Document Match With ${userId}`,
          });
        }
      } else {
        printOutput(deleteAllDataInFirestore, req.body, {
          status: 405,
          message: "Wrong Security Code",
        });
        res.status(405).json({ status: 405, message: "Wrong Security Code" });
      }
    } else {
      printOutput(deleteAllDataInFirestore.name, req.body, {
        state: 404,
        message: `No Such Document Match With passwordDeleteAllData`,
      });
      res.status(404).json({
        state: 404,
        message: `No Such Document Match With passwordDeleteAllData`,
      });
    }
  } catch (error) {
    printOutput(deleteAllDataInFirestore.name, req.body, {
      state: 500,
      error,
    });
    res.status(500).json({ status: 500, error });
  }
};

const deleteCollection = async (collectionPath, batchSize) => {
  const colRef = collection(firestore, collectionPath);
  const q = query(colRef, limit(batchSize));

  const snapshot = await getDocs(q);
  const batchSizeCount = snapshot.size;

  if (batchSizeCount === 0) {
    console.log(`Collection ${collectionPath} is empty`);
    return;
  }

  const batch = writeBatch(firestore);

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  await deleteCollection(collectionPath, batchSize);
};
