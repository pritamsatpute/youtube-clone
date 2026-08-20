// React
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// Services
import {
  login,
  register,
  getCurrentUser,
  logout as logoutRequest,
} from "../services/authService";

// Token Service
import {
  getToken,
  setToken,
  removeToken,
  saveAccount,
  getAccounts,
  removeAccount,
} from "../services/tokenService";

// Context
const AuthContext =
  createContext(null);

// Provider
export default function AuthProvider({
  children,
}) {
  // Initial User
  const [user, setUser] = useState(() => {
    const token = getToken();

    if (!token) {
      return null;
    }

    const accounts = getAccounts();

    const currentAccount = accounts.find(
      (account) =>
        account?.token === token,
    );

    return currentAccount?.user || null;
  });

  // Loading
  const [loading, setLoading] =
    useState(true);

  // Refresh User
  const refreshUser =
    async () => {
      try {
        // Check Token
        if (!getToken()) {
          setUser(null);
          setLoading(false);

          return;
        }

        // Get Current User
        const response =
          await getCurrentUser();

        setUser(response.data);

        // Update Saved Account
        saveAccount(
          response.data,
          getToken(),
        );
      } catch (error) {
        removeToken();

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

  // Login
  const signIn = async (
    credentials,
  ) => {
    // Preserve Current Account
    if (
      user &&
      getToken()
    ) {
      saveAccount(
        user,
        getToken(),
      );
    }

    // Login
    const response =
      await login(credentials);

    const token =
      response.data.token;

    const loggedInUser =
      response.data.user;

    // Save Active Token
    setToken(token);

    // Save Account
    saveAccount(
      loggedInUser,
      token,
    );

    // Set User
    setUser(loggedInUser);

    return response;
  };

  // Register
  const signUp = async (
    data,
  ) => {
    // Register
    const response =
      await register(data);

    const token =
      response.data.token;

    const registeredUser =
      response.data.user;

    // Save Token
    setToken(token);

    // Save Account
    saveAccount(
      registeredUser,
      token,
    );

    // Set User
    setUser(registeredUser);

    return response;
  };

  // Switch Account
  const switchAccount =
    async (account) => {
      // Validate Account
      if (!account?.token) {
        return;
      }

      // Save Current Account
      if (
        user &&
        getToken()
      ) {
        saveAccount(
          user,
          getToken(),
        );
      }

      // Activate Selected Token
      setToken(account.token);

      // Set Immediately
      setUser(account.user);

      // Refresh From Server
      try {
        const response =
          await getCurrentUser();

        setUser(
          response.data,
        );

        saveAccount(
          response.data,
          account.token,
        );
      } catch (error) {
        removeToken();

        removeAccount(
          account.user?._id,
        );

        setUser(null);

        throw error;
      }
    };

  // Get Saved Accounts
  const getSavedAccounts =
    () => {
      return getAccounts();
    };

  // Remove Saved Account
  const removeSavedAccount =
    (userId) => {
      removeAccount(userId);
    };

  // Logout
  const logout = async () => {
    const currentUserId =
      user?._id;

    try {
      // Logout Request
      if (getToken()) {
        await logoutRequest();
      }
    } catch (error) {
      // Ignore Logout Errors
    } finally {
      // Remove Current Session
      removeToken();

      // Remove Saved Account
      if (currentUserId) {
        removeAccount(
          currentUserId,
        );
      }

      // Clear User
      setUser(null);
    }
  };

  // Initialize
  useEffect(() => {
    refreshUser();
  }, []);

  // Context Value
  const value = useMemo(
    () => ({
      user,
      loading,
      signIn,
      signUp,
      logout,
      refreshUser,
      switchAccount,
      getSavedAccounts,
      removeSavedAccount,
    }),
    [
      user,
      loading,
    ],
  );

  // Render
  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider.",
    );
  }

  return context;
};