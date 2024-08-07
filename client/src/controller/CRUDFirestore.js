import {
  firestoreAddNewChatsEndPoint,
  firestoreGetAllChatsEndPoint,
  firestoreAddNewUserEndPoint,
  firestoreDeleteAllChatsEndPoint,
  firestoreGetNameEndPoint,
  firestoreUpdateNameEndPoint,
  firestoreUploadSeenHistoryEndPoint,
  firestoreDeleteSomeChatsEndPoint,
  firestoreGetPermissionToDeleteAllDataEndPoint,
  firestoreDeleteAllDataEndPoint,
  firestoreAddNewVoiceChatEndPoint,
} from "./serverSource";
import { fetchJson } from "../lib/myUtils";

export const addNewUserToFirestoreIfNotExists = async () => {
  if (localStorage.getItem("senAi-userId")) {
    const userIdFromLocalStorage = localStorage.getItem("senAi-userId");
    return userIdFromLocalStorage;
  } else {
    const { getDeviceName } = await import("../lib/myUtils");
    const { generateTimeNow } = await import("../lib/generateTime");

    const deviceName = getDeviceName();
    const { day, monthName, year, hour, minute, second } = generateTimeNow();
    const lastSeen = `${day} ${monthName} ${year} , ${hour}:${minute}:${second}`;

    const createdNewUserId = await fetchJson(firestoreAddNewUserEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deviceName, lastSeen }),
    });

    if (createdNewUserId.status === 201) {
      return createdNewUserId.newUserId;
    } else {
      console.log(createdNewUserId);
    }
  }
};

export const getAllChatsFromFirestore = async (userId) => {
  const chats = await fetchJson(firestoreGetAllChatsEndPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  if (chats.status === 200) {
    return await chats.chats;
  }
  if (chats.status === 404) {
    localStorage.removeItem("senAi-userId");
    const newUserId = await addNewUserToFirestoreIfNotExists();
    localStorage.setItem("senAi-userId", newUserId);
    return await getAllChatsFromFirestore(newUserId);
  } else {
    console.log(chats);
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
  }
  if (savedChats.status === 404) {
    localStorage.removeItem("senAi-userId");
    const newUserId = await addNewUserToFirestoreIfNotExists();
    localStorage.setItem("senAi-userId", newUserId);
    return await addNewChatsToFirestore(
      newUserId,
      newChatFromUser,
      newChatFromAi,
    );
  } else {
    console.log(savedChats);
  }
};

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

export const getName = async (userId) => {
  const gettedName = await fetchJson(firestoreGetNameEndPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  if (gettedName.status === 200) {
    return gettedName.name;
  }
  if (gettedName.status === 404) {
    return "Unknown";
  } else {
    console.log(gettedName);
  }
};

export const updateName = async (userId, newName) => {
  const updatedName = await fetchJson(firestoreUpdateNameEndPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, newName }),
  });

  if (updatedName.status === 202) {
    return updatedName;
  }
  if (updatedName.status === 404) {
    console.log(updatedName);
  } else {
    console.log(updatedName);
  }
};

export const uploadSeenHistory = async (userId) => {
  const { generateTimeNow } = await import("../lib/generateTime");
  const { day, monthName, year, hour, minute, second } = generateTimeNow();
  const lastSeen = `${day} ${monthName} ${year} , ${hour}:${minute}:${second}`;

  const uploadSeenHistory = await fetchJson(
    firestoreUploadSeenHistoryEndPoint,
    {
      method: "PATCH",
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

export const getPermissionToDeleteAllData = async (securityCode) => {
  const getPermission = await fetchJson(
    firestoreGetPermissionToDeleteAllDataEndPoint,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ securityCode }),
    },
  );

  if (getPermission.status === 202 || getPermission.status === 405) {
    return getPermission.allow;
  } else {
    console.log(getPermission);
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
    const { chats, backupChats, lastSeenHistory } = deleteAllData.whichDelete;
    const message = `${chats ? "chats ," : ""} ${backupChats ? "backup chats" : ""} ${lastSeenHistory ? "and last seen history" : ""}`;
    return message;
  } else {
    console.log(deleteAllData);
  }
};

export const addNewVoiceChatToFireStorage = async (formData) => {
  const req = await fetch(firestoreAddNewVoiceChatEndPoint, {
    method: "POST",
    body: formData,
  });

  const uploadTask = await req.json();
  console.log(uploadTask);
  if (uploadTask.status === 201) {
    return uploadTask;
  }
  if (uploadTask.status === 500) {
    return uploadTask.error;
  }
};
