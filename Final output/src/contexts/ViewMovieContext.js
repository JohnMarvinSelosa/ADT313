import React, { createContext, useContext } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

const ViewMovieContext = createContext(null);

export const ViewMovieProvider = ({ children }) => {
  const { accessToken } = useUser();

  const getUserMovies = async (userId) => {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }

      const response = await axios.get(`/movies`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Fetched ALL movies for admin:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      if (error.response) {
        console.error("Response Error:", error.response.data);
        console.error("Response Status:", error.response.status);
        console.error("Response Headers:", error.response.headers);
        throw new Error(
          error.response.data.message || "Failed to fetch movies"
        );
      }
      throw error;
    }
  };

  return (
    <ViewMovieContext.Provider
      value={{
        getUserMovies,
      }}
    >
      {children}
    </ViewMovieContext.Provider>
  );
};

export const useViewMovie = () => {
  const context = useContext(ViewMovieContext);
  if (context === null) {
    throw new Error("useViewMovie must be used within a ViewMovieProvider");
  }
  return context;
};
