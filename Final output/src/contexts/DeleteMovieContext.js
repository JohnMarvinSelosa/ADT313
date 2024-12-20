import React, { createContext, useContext } from "react";
import axios from "axios";

const DeleteMovieContext = createContext();

export const DeleteMovieProvider = ({ children }) => {
  const deleteMovie = async (movieId, userId) => {
    try {
      const response = await axios.delete(`/admin/movies/${movieId}`, {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });
      console.log(`Movie ${movieId} deleted successfully`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error deleting movie ${movieId}:`, error);
      throw new Error("Failed to delete movie");
    }
  };

  return (
    <DeleteMovieContext.Provider value={{ deleteMovie }}>
      {children}
    </DeleteMovieContext.Provider>
  );
};

export const useDeleteMovie = () => {
  const context = useContext(DeleteMovieContext);
  if (!context) {
    throw new Error("useDeleteMovie must be used within a DeleteMovieProvider");
  }
  return context;
};
