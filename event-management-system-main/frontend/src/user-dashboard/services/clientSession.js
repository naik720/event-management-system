const parseStoredClient = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
};

const getStoredProfiles = () => {
  try {
    return JSON.parse(localStorage.getItem("userProfiles") || "{}") || {};
  } catch {
    return {};
  }
};

const saveStoredProfiles = (profiles) => {
  localStorage.setItem("userProfiles", JSON.stringify(profiles));
};

const normalizeEmail = (email) => {
  return String(email || "").trim().toLowerCase();
};

export const DEFAULT_CLIENT_PHOTO =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80";

export const getProfileForEmail = (email) => {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return null;
  const profiles = getStoredProfiles();
  return profiles[normalizedEmail] || null;
};

export const saveClientProfile = (clientProfile) => {
  const email = normalizeEmail(clientProfile?.email);
  if (!email) return;

  const profiles = getStoredProfiles();
  const existingProfile = profiles[email] || {};
  profiles[email] = {
    ...existingProfile,
    ...clientProfile,
    email,
  };
  saveStoredProfiles(profiles);
};

export const getCurrentClient = () => {
  const registeredClient = parseStoredClient("registeredUser") || {};
  const loggedInClient = parseStoredClient("loggedInUser") || {};
  const email = normalizeEmail(loggedInClient.email || registeredClient.email);
  const storedProfile = getProfileForEmail(email) || {};
  const useRegisteredClient = normalizeEmail(registeredClient.email) === email;

  return {
    ...(useRegisteredClient ? registeredClient : {}),
    ...storedProfile,
    ...loggedInClient,
  };
};

export const getClientDisplayName = (client = getCurrentClient()) => {
  return client.username || client.name || "Client";
};

export const getClientInitial = (client = getCurrentClient()) => {
  return getClientDisplayName(client).trim().charAt(0).toUpperCase() || "C";
};

export const getClientPhoto = (client = getCurrentClient()) => {
  return client.photo || DEFAULT_CLIENT_PHOTO;
};
