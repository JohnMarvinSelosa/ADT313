import React, { createContext, useContext } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

const DeletePhotosContext = createContext();

export const DeletePhotosProvider = ({ children }) => {
  const { accessToken } = useUser();

  const deletePhoto = async (photoId) => {
    try {
      const response = await axios.delete(`/admin/photos/${photoId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(`Photo ${photoId} deleted successfully`, response.data);
    } catch (error) {
      console.error(`Error deleting photo ${photoId}:`, error);
    }
  };

  return (
    <DeletePhotosContext.Provider value={{ deletePhoto }}>
      {children}
    </DeletePhotosContext.Provider>
  );
};

export const useDeletePhotos = () => {
  const context = useContext(DeletePhotosContext);
  if (!context) {
    throw new Error(
      "useDeletePhotos must be used within a DeletePhotosProvider"
    );
  }
  return context;
};
