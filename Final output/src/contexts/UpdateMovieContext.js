import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

const UpdateMovieContext = createContext();

export const UpdateMovieProvider = ({ children }) => {
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
    console.log("UpdateMovieProvider - User:", user);
    console.log("UpdateMovieProvider - Access Token:", accessToken);
  }, [user, accessToken]);

  const updateMovie = async (movieId, movieData) => {
    console.log("updateMovie called with:", {
      movieId,
      movieData,
      user,
      accessToken,
    });

    if (!user || !accessToken) {
      const errorMsg = "User not authenticated";
      console.error(errorMsg, { user, accessToken });
      setUpdateError(errorMsg);
      throw new Error(errorMsg);
    }

    setUpdateError(null);
    setIsUpdating(true);

    try {
      if (!movieId) {
        throw new Error("Movie ID is required");
      }

      const response = await axios.patch(`admin/movies/${movieId}`, {
        ...movieData,
        userId: user.id,
      });

      if (!response || !response.data) {
        throw new Error("No response from server");
      }

      console.log("Movie Update Full Response:", response.data);

      return response.data;
    } catch (error) {
      let errorMessage = "Failed to update movie";

      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          error.response.data?.errors?.join(", ") ||
          `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "No response received from server";
      } else {
        errorMessage = error.message;
      }

      console.error("Movie Update Error:", errorMessage, error);
      setUpdateError(errorMessage);

      throw new Error(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  const contextValue = {
    updateMovie,
    isUpdating,
    updateError,
  };

  return (
    <UpdateMovieContext.Provider value={contextValue}>
      {children}
    </UpdateMovieContext.Provider>
  );
};

export const useUpdateMovie = () => {
  const context = useContext(UpdateMovieContext);
  if (context === null) {
    throw new Error(
      "useUpdateMovie must be used within an UpdateMovieProvider"
    );
  }
  return context;
};
