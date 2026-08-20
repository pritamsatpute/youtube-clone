// Token Key
const TOKEN_KEY =
  "youtube_clone_token";

// Accounts Key
const ACCOUNTS_KEY =
  "youtube_clone_accounts";

// Get Token
export const getToken = () => {
  return localStorage.getItem(
    TOKEN_KEY,
  );
};

// Save Token
export const setToken = (token) => {
  localStorage.setItem(
    TOKEN_KEY,
    token,
  );
};

// Remove Token
export const removeToken = () => {
  localStorage.removeItem(
    TOKEN_KEY,
  );
};

// Get Saved Accounts
export const getAccounts = () => {
  try {
    const accounts =
      localStorage.getItem(
        ACCOUNTS_KEY,
      );

    return accounts
      ? JSON.parse(accounts)
      : [];
  } catch {
    return [];
  }
};

// Save Accounts
const saveAccounts = (accounts) => {
  localStorage.setItem(
    ACCOUNTS_KEY,
    JSON.stringify(accounts),
  );
};

// Add / Update Account
export const saveAccount = (
  user,
  token,
) => {
  if (!user?._id || !token) {
    return;
  }

  const accounts =
    getAccounts();

  const account = {
    user,
    token,
  };

  const existingIndex =
    accounts.findIndex(
      (item) =>
        String(item.user?._id) ===
        String(user._id),
    );

  if (existingIndex >= 0) {
    accounts[existingIndex] =
      account;
  } else {
    accounts.push(account);
  }

  saveAccounts(accounts);
};

// Remove Account
export const removeAccount = (
  userId,
) => {
  const accounts =
    getAccounts();

  const filtered =
    accounts.filter(
      (item) =>
        String(item.user?._id) !==
        String(userId),
    );

  saveAccounts(filtered);
};

// Remove Current Account
export const removeCurrentAccount =
  (userId) => {
    if (!userId) return;

    removeAccount(userId);
    removeToken();
  };

// Check Authentication
export const isAuthenticated = () => {
  return Boolean(getToken());
};