// React
import {
  createContext,
  useContext,
  useState,
} from "react";

// Components
import UploadModal from "../components/Studio/UploadModal/UploadModal";

// Context
const UploadContext =
  createContext(null);

// Provider
export function UploadProvider({
  children,
}) {
  // State
  const [
    isUploadOpen,
    setIsUploadOpen,
  ] = useState(false);

  // Upload Version
  const [
    uploadVersion,
    setUploadVersion,
  ] = useState(0);

  // Open
  const openUpload = () =>
    setIsUploadOpen(true);

  // Close
  const closeUpload = () =>
    setIsUploadOpen(false);

  // Upload Completed
  const handleUploadCompleted = () => {
    setUploadVersion(
      (previous) =>
        previous + 1,
    );
  };

  return (
    <UploadContext.Provider
      value={{
        openUpload,
        closeUpload,
        uploadVersion,
      }}
    >
      {children}

      <UploadModal
        open={isUploadOpen}
        onClose={closeUpload}
        onUploaded={
          handleUploadCompleted
        }
      />
    </UploadContext.Provider>
  );
}

// Hook
export function useUpload() {
  return useContext(
    UploadContext,
  );
}