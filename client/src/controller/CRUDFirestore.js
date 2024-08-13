import {
  firestoreAddNewChatsEndPoint,
  firestoreGetAllChatsEndPoint,
  firestoreAddNewUserEndPoint,
  firestoreDeleteAllChatsEndPoint,
  firestoreUpdateNameEndPoint,
  firestoreUploadSeenHistoryEndPoint,
  firestoreDeleteSomeChatsEndPoint,
  firestoreGetPermissionToDeleteAllDataEndPoint,
  firestoreDeleteAllDataEndPoint,
  firestoreAddNewVoiceChatEndPoint,
  firestoreGetAllChatsMemoryEndPoint,
  firestoreCheckAUser,
  firestoreGetNameAndPPUrlEndPoint,
  firestoreUpdateProfilePhotoEndPoint,
  firestoreUpdatePPUrlEndPoint,
} from "./serverSource";
import { fetchJson, resetLocalStorage } from "../lib/myUtils";
import { toast } from "@/components/ui/use-toast";

// GET

const checkAUser = async (userId) => {
  const req = await fetchJson(`${firestoreCheckAUser}?userId=${userId}`);

  if (req.status === 200 || req.status === 404) {
    return req.userExist;
  } else {
    console.log(req);
  }
};

export const getAllChatsFromFirestore = async (userId) => {
  const chats = await fetchJson(
    `${firestoreGetAllChatsEndPoint}?userId=${userId}`,
  );

  if (chats.status === 200) {
    return chats.chats;
  } else if (chats.status === 404) {
    const newUserId = await addNewUserToFirestoreIfNotExists();
    return await getAllChatsFromFirestore(newUserId);
  } else {
    console.log(chats);
  }
};

export const getAllChatsMemoryFromFirestore = async (userId) => {
  const chatsMemory = await fetchJson(
    `${firestoreGetAllChatsMemoryEndPoint}?userId=${userId}`,
  );

  if (chatsMemory.status === 200) {
    return chatsMemory.chatsMemory;
  } else if (chatsMemory.status === 404) {
    const newUserId = await addNewUserToFirestoreIfNotExists();
    return getAllChatsMemoryFromFirestore(newUserId);
  } else {
    console.log(chatsMemory);
  }
};

export const getNameAndPPUrl = async (userId) => {
  const gettedData = await fetchJson(
    `${firestoreGetNameAndPPUrlEndPoint}?userId=${userId}`,
  );

  if (gettedData.status === 200) {
    return gettedData;
  } else if (gettedData.status === 404) {
    const newUserId = await addNewUserToFirestoreIfNotExists();
    return await getNameAndPPUrl(newUserId);
  } else {
    console.log(gettedData);
  }
};

export const getPermissionToDeleteAllData = async (securityCode) => {
  const getPermission = await fetchJson(
    `${firestoreGetPermissionToDeleteAllDataEndPoint}?securityCode=${securityCode}`,
  );

  if (getPermission.status === 202 || getPermission.status === 405) {
    return getPermission.permits;
  } else if (getPermission.status === 404) {
    toast({
      description: "Error : Password Collection Not Exist",
      duration: 3000,
      variant: "destructive",
    });
  } else {
    console.log(getPermission);
  }
};

// POST

export const addNewUserToFirestoreIfNotExists = async () => {
  if (localStorage.getItem("senAi-userId")) {
    const userIdFromLocalStorage = localStorage.getItem("senAi-userId");
    const letsCheckTheUserId = await checkAUser(userIdFromLocalStorage);
    if (letsCheckTheUserId) {
      return userIdFromLocalStorage;
    } else {
      localStorage.removeItem("senAi-userId");
      return addNewUserToFirestoreIfNotExists();
    }
  } else {
    resetLocalStorage();
    const { getDeviceName, getDeviceType } = await import("../lib/myUtils");
    const { generateTimeNow } = await import("../lib/generateTime");

    const deviceName = getDeviceName();
    const deviceType = getDeviceType();
    const { day, monthName, year, hour, minute, second } = generateTimeNow();
    const lastSeen = `${day} ${monthName} ${year} , ${hour}:${minute}:${second}`;

    const createdNewUserId = await fetchJson(firestoreAddNewUserEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deviceName, deviceType, lastSeen }),
    });

    if (createdNewUserId.status === 201) {
      return createdNewUserId.newUserId;
    } else {
      console.log(createdNewUserId);
    }
  }
};

export const addNewChatsToFirestore = async (
  userId,
  newChatFromUser,
  newChatFromAi,
) => {
  const savedChats = await fetchJson(firestoreAddNewChatsEndPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, newChatFromUser, newChatFromAi }),
  });

  if (savedChats.status === 201) {
    return;
  } else if (savedChats.status === 404) {
    const newUserId = addNewUserToFirestoreIfNotExists();
    return await addNewChatsToFirestore(
      newUserId,
      newChatFromUser,
      newChatFromAi,
    );
  } else {
    console.log(savedChats);
  }
};

export const addNewVoiceChatToFireStorage = async (formData) => {
  const uploadTask = await fetchJson(firestoreAddNewVoiceChatEndPoint, {
    method: "POST",
    body: formData,
  });

  if (uploadTask.status === 201) {
    return uploadTask;
  } else {
    return uploadTask.error;
  }
};

export const uploadSeenHistory = async (userId) => {
  const { generateTimeNow } = await import("../lib/generateTime");
  const { day, monthName, year, hour, minute, second } = generateTimeNow();
  const lastSeen = `${day} ${monthName} ${year} , ${hour}:${minute}:${second}`;

  const uploadSeenHistory = await fetchJson(
    firestoreUploadSeenHistoryEndPoint,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, lastSeen }),
    },
  );

  if (uploadSeenHistory.status === 201) {
    return;
  } else {
    console.log(uploadSeenHistory);
  }
};

// DELETE

export const deleteAllChatsInFirestore = async (userId, chats) => {
  const deletedAllChats = await fetchJson(firestoreDeleteAllChatsEndPoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, chats }),
  });

  if (deletedAllChats.status === 202) {
    return;
  } else {
    console.log(deletedAllChats);
  }
};

export const deleteSomeChatsInFirestore = async (
  userId,
  someChatsNew,
  someChatsDeleted,
) => {
  const deletedSomeChats = await fetchJson(firestoreDeleteSomeChatsEndPoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, someChatsNew, someChatsDeleted }),
  });

  if (deletedSomeChats.status === 202) {
    return;
  } else {
    console.log(deletedSomeChats);
  }
};

export const deleteAllDataInFirestore = async (
  userId,
  securityCode,
  option,
) => {
  const deleteAllData = await fetchJson(firestoreDeleteAllDataEndPoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, securityCode, option }),
  });

  if (deleteAllData.status === 202) {
    const { chats, backupChats, lastSeenHistory, allCollections } =
      deleteAllData.whichDelete;
    const message = `${chats ? "chats ," : ""} ${backupChats ? "backup chats" : ""} ${allCollections ? "all collections" : ""} ${lastSeenHistory ? "and last seen history" : ""}`;
    return message;
  } else {
    console.log(deleteAllData);
  }
};

// PUT

export const updateName = async (userId, newName) => {
  const updatedName = await fetchJson(firestoreUpdateNameEndPoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, newName }),
  });

  if (updatedName.status === 202) {
    return updatedName;
  } else if (updatedName.status === 404) {
    const newUserId = await addNewUserToFirestoreIfNotExists();
    return await updateName(newUserId, newName);
  } else {
    console.log(updatedName);
  }
};

export const updateProfilePhoto = async (formData) => {
  const updatedProfilePhoto = await fetchJson(
    firestoreUpdateProfilePhotoEndPoint,
    {
      method: "PUT",
      body: formData,
    },
  );

  if (updatedProfilePhoto.status === 201) {
    return updatedProfilePhoto;
  } else {
    console.log(updatedProfilePhoto);
  }
};

export const updatePPUrlInFirestore = async (
  userId,
  newPPUrl,
  newPPFileName,
  oldPPFileName,
  customPPUrl,
) => {
  const updatePPUrl = await fetchJson(firestoreUpdatePPUrlEndPoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      newPPUrl,
      newPPFileName,
      oldPPFileName,
      customPPUrl,
    }),
  });

  if (updatePPUrl.status === 202) {
    return true;
  } else {
    console.log(updatePPUrl);
    return false;
  }
};
