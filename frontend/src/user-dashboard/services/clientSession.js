const parseStoredClient = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
};

export const DEFAULT_CLIENT_PHOTO =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80";

export const CLIENT_PROFILE_PHOTO_KEY = "clientProfilePhoto";

const getStoredClientPhoto = () => {
  return localStorage.getItem(CLIENT_PROFILE_PHOTO_KEY);
};

export const getCurrentClient = () => {
  const registeredClient = parseStoredClient("registeredUser") || {};
  const loggedInClient = parseStoredClient("loggedInUser") || {};
  const storedPhoto = getStoredClientPhoto();

  return {
    ...registeredClient,
    ...loggedInClient,
    ...(storedPhoto ? { photo: storedPhoto } : {}),
  };
};

export const getClientDisplayName = (client = getCurrentClient()) => {
  return client.username || client.name || "Client";
};

export const getClientInitial = (client = getCurrentClient()) => {
  return getClientDisplayName(client).trim().charAt(0).toUpperCase() || "C";
};

export const getClientPhoto = (client = getCurrentClient()) => {
  return getStoredClientPhoto() || client.photo || DEFAULT_CLIENT_PHOTO;
};
