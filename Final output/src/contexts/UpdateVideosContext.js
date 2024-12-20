import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

const UpdateVideosContext = createContext();

export const UpdateVideosProvider = ({ children }) => {
  const { user, accessToken } = useUser();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    axios.defaults.baseURL = "/";

    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [accessToken]);

  useEffect(() => {
    console.log("UpdateVideosProvider - User:", user);
    console.log("UpdateVideosProvider - Access Token:", accessToken);
  }, [user, accessToken]);

  const updateVideo = async (videoId, videoData) => {
    try {
      console.log("Updating video:", { videoId, videoData });

      const preparedPayload = {
        ...videoData,
        userId: user.id,
      };

      const response = await axios.patch(
        `admin/videos/${videoId}`,
        preparedPayload
      );

      console.log("Video update response:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error updating video:",
        error.response ? error.response.data : error.message
      );

      throw new Error(
        error.response?.data?.message ||
          "Failed to update video. Please try again."
      );
    }
  };

  const updateVideos = async ({
    videoData,
    editedVideoName,
    movieId,
    user,
    accessToken,
  }) => {
    console.log("Updating video with new name:", {
      videoId: videoData.id,
      currentName: videoData.name,
      newName: editedVideoName,
      userId: user.id,
    });

    const requestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const payload = {
      current: {
        id: videoData.id,
        userId: user.id,
        movieId: videoData.movieId || movieId,
        url: videoData.url,
        name: videoData.name,
        site: videoData.site,
        videoKey: videoData.video_key || videoData.videoKey,
        videoType: videoData.video_type || videoData.videoType,
        official: videoData.official ? 1 : 0,
      },
      new: {
        id: videoData.id,
        userId: user.id,
        movieId: videoData.movieId || movieId,
        url: videoData.url,
        name: editedVideoName,
        site: videoData.site,
        videoKey: videoData.video_key || videoData.videoKey,
        videoType: videoData.video_type || videoData.videoType,
        official: videoData.official ? 1 : 0,
      },
    };

    console.log("Sending payload:", payload);
    try {
      const response = await axios.patch(
        `admin/videos/${videoData.id}`,
        payload,
        requestConfig
      );

      console.log("Video update response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating video:", error);
      throw new Error(
        error.response?.data?.message || "Failed to update video"
      );
    }
  };

  const contextValue = {
    updateVideo,
    updateVideos,
    isUpdating,
    updateError,
  };

  return (
    <UpdateVideosContext.Provider value={contextValue}>
      {children}
    </UpdateVideosContext.Provider>
  );
};

export const useUpdateVideos = () => {
  const context = useContext(UpdateVideosContext);

  if (!context) {
    throw new Error(
      "useUpdateVideos must be used within an UpdateVideosProvider"
    );
  }

  return context;
};
