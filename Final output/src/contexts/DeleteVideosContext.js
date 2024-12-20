import React, { createContext, useContext } from "react";
import axios from "axios";

const DeleteVideosContext = createContext();

export const DeleteVideosProvider = ({ children }) => {
  const deleteVideo = async (videoId, userId) => {
    try {
      const response = await axios.delete(`/admin/videos/${videoId}`, {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });
      console.log(`Video ${videoId} deleted successfully`, response.data);
    } catch (error) {
      console.error(`Error deleting video ${videoId}:`, error);
    }
  };

  return (
    <DeleteVideosContext.Provider value={{ deleteVideo }}>
      {children}
    </DeleteVideosContext.Provider>
  );
};

export const useDeleteVideos = () => {
  const context = useContext(DeleteVideosContext);
  if (!context) {
    throw new Error(
      "useDeleteVideos must be used within a DeleteVideosProvider"
    );
  }
  return context;
};
