import { ref, deleteObject } from "firebase/storage";
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

const deleteFilesInFirebaseStorage = (fileList, folderName) => {
  // buat type file target
  let filesTarget;
  console.log(fileList);

  // validasi jika parameter bertipe string maka ubah menjad array
  if (typeof fileList === "string") {
    filesTarget = [fileList];
  } else if (typeof fileList === "object") {
    filesTarget = fileList;
  }

  // tampung success dan failed di dalam array
  const success = [];
  const failed = [];

  // looping array filelist
  filesTarget.forEach((fileName) => {
    // buat referensi berdasarkan filename
    const fileRef = ref(storage, `${folderName}/${fileName}`);

    // hapus file tersebut
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

  // buat referensi chats dan chatsMemory
  const chatsRef = doc(firestore, "chats", userId);
  const chatsMemoryRef = doc(firestore, "chatsMemory", userId);

  try {
    // hapus array chats dengan mengosongkan nya
    updateDoc(chatsRef, {
      chats: [],
    });

    // hapus array chatsMemory dengan mengosongkan nya
    updateDoc(chatsMemoryRef, {
      chatsMemory: [],
    });

    // hapus semua audio di firebase storage
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

    // kebutuhan logging
    printOutput(deleteAllChatsInFirestore.name, req.body, {
      status: 202,
      message: "Delete All Chats And Its Memories",
      deleteTask,
    });

    // HTTP Response
    res.status(202).json({
      status: 202,
      message: "Delete All Chats And Its Memories",
    });
  } catch (error) {
    // kebutuhan logging
    printOutput(deleteAllChatsInFirestore.name, req.body, {
      state: 500,
      error,
    });

    // HTTP Response
    res.status(500).json({ status: 500, error });
  }
};

export const deleteSomeChatsInFirestore = async (req, res) => {
  const { userId, someChatsNew, someChatsDeleted } = req.body;

  // buat chats dan chatsMemory referensi
  const chatsRef = doc(firestore, "chats", userId);
  const chatsMemoryRef = doc(firestore, "chatsMemory", userId);

  // buat chatsMemory yang baru dengan mengambilnya dari array someChatsNew
  // ini akan membuat role dan content berdasarkan data dari someChatsNew
  const chatsMemoryNew = someChatsNew.map((chat) => ({
    role: chat.position === "right" ? "user" : "assistant",
    content: chat.message,
  }));

  try {
    // update chats dengan someChatsNew
    updateDoc(chatsRef, {
      chats: someChatsNew,
    });

    // update juga chatsMemory dengan chatsMemoryNew
    updateDoc(chatsMemoryRef, {
      chatsMemory: chatsMemoryNew,
    });

    // array someChatsDeleted adalah chats yang di hold oleh user lalu di hapus
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

    // kebutuhan logging
    printOutput(deleteSomeChatsInFirestore.name, req.body, {
      status: 202,
      message: "Delete Some Chats You Selected",
      deleteTask,
    });

    // HTTP Response
    res.status(202).json({
      status: 202,
      message: "Delete Some Chats You Selected",
    });
  } catch (error) {
    // kebutuhan logging
    printOutput(deleteSomeChatsInFirestore.name, req.body, {
      status: 500,
      error,
    });

    // HTTP Response
    res.status(500).json({ status: 500, error });
  }
};

export const deleteAllDataInFirestore = async (req, res) => {
  const { userId, securityCode, option } = req.body;

  // buat referensi untuk password, user, chats, backupChats, dan chatsMemory
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

    // cek apakah password document ada ?
    if (passwordSnap.exists()) {
      // jika ada maka ambil password yang terenkripsi dari document tersebut
      const encryptedPassword = passwordSnap.data().passwordDeleteAllData;

      // lalu bandingka lagi
      const compareResult = comparePassword(securityCode, encryptedPassword);

      // jika sama maka izinkan untuk menghapus semua data
      if (compareResult) {
        if (
          userSnap.exists() &&
          chatsSnap.exists() &&
          backupChatsSnap.exists() &&
          chatsMemorySnap.exists()
        ) {
          // hapus chatsMemory jika user memilih menghapus chats atau backupChats
          if (option.withChats || option.withBackupChats) {
            await updateDoc(chatsMemoryRef, { chatsMemory: [] });
          }

          // hapus lastSeen dan seenHistory
          if (option.withLastSeenHistory) {
            await updateDoc(userRef, { lastSeen: "", seenHistory: [] });
          }

          // hapus chats
          if (option.withChats) {
            await updateDoc(chatsRef, { chats: [] });
          }

          // hapus backupChats
          if (option.withBackupChats) {
            await updateDoc(backupChatsRef, { backupChats: [] });
          }

          // hapus semua koleksi
          if (option.withDestroyAllCollections) {
            MY_COLLECTION.forEach((collectionName) => {
              const batchSize = 100;
              deleteCollection(collectionName, batchSize)
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
          }

          // TODO Hapus images dan voices folder

          // kebutuhan logging
          printOutput(deleteAllDataInFirestore.name, req.body, {
            status: 202,
            whichDelete: {
              chats: option.withChats,
              backupChats: option.withBackupChats,
              lastSeenHistory: option.withLastSeenHistory,
              allCollections: option.withDestroyAllCollections,
            },
          });

          // HTTP Response
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
          // kebutuhan logging
          printOutput(deleteAllDataInFirestore.name, req.body, {
            status: 404,
            message: `No Such Document Match With ${userId}`,
          });

          // HTTP Response
          res.status(404).json({
            status: 404,
            message: `No Such Document Match With ${userId}`,
          });
        }
      } else {
        // password salah dan jangan izinkan untuk menghapus semua data

        // kebutuhan logging
        printOutput(deleteAllDataInFirestore, req.body, {
          status: 405,
          message: "Wrong Security Code",
        });

        // HTTP Response
        res.status(405).json({ status: 405, message: "Wrong Security Code" });
      }
    } else {
      // document password tidak tersedia

      // kebutuhan logging
      printOutput(deleteAllDataInFirestore.name, req.body, {
        state: 404,
        message: `No Such Document Match With passwordDeleteAllData`,
      });

      // HTTP Response
      res.status(404).json({
        state: 404,
        message: `No Such Document Match With passwordDeleteAllData`,
      });
    }
  } catch (error) {
    // kebutuhan logging
    printOutput(deleteAllDataInFirestore.name, req.body, {
      state: 500,
      error,
    });

    // HTTP Response
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
