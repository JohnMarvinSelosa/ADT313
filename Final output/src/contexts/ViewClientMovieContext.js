import React, { createContext, useContext } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

const ViewClientMovieContext = createContext(null);

export const ViewClientMovieProvider = ({ children }) => {
  const { user } = useUser();

  const getUserMovies = async (userId) => {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }

      const response = await axios.get(`/movies`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Fetched ALL movies:", response.data);

      return response.data.map((movie) => ({
        id: movie.id || movie.movieId,
        title: movie.title,
        overview: movie.overview,
        releaseDate: movie.releaseDate || movie.release_date,
        popularity: movie.popularity,
        backdropPath: movie.backdropPath,
        posterPath: movie.posterPath,
        casts: movie.casts || [],
        photos: movie.photos
          ? movie.photos.map((photo) => ({
              ...photo,
              url: photo.url,
            }))
          : [],
        videos: movie.videos
          ? movie.videos.map((video) => ({
              ...video,
              url: video.url,
            }))
          : [],
      }));
    } catch (error) {
      console.error("Error fetching client movies:", error);

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

  const getMovieDetails = async (movieId) => {
    try {
      if (!movieId) {
        throw new Error("Movie ID is required");
      }

      const response = await axios.get(`/movies/${movieId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Fetched movie details:", response.data);

      const movie = response.data;

      return {
        id: movie.id || movieId,
        title: movie.title,
        overview: movie.overview,
        releaseDate: movie.releaseDate || movie.release_date,
        popularity: movie.popularity,
        backdropPath: movie.backdropPath,
        posterPath: movie.posterPath,
        casts: movie.casts
          ? movie.casts.map((cast) => ({
              ...cast,
              url: cast.url,
            }))
          : [],
        videos: movie.videos
          ? movie.videos.map((video) => ({
              ...video,
              url: video.url,
            }))
          : [],
        photos: movie.photos
          ? movie.photos.map((photo) => ({
              ...photo,
              url: photo.url,
            }))
          : [],
      };
    } catch (error) {
      console.error("Error fetching movie details:", error);

      if (error.response) {
        console.error("Response Error:", error.response.data);
        console.error("Response Status:", error.response.status);
        console.error("Response Headers:", error.response.headers);
        throw new Error(
          error.response.data.message || "Failed to fetch movie details"
        );
      }

      throw error;
    }
  };

  return (
    <ViewClientMovieContext.Provider
      value={{
        getUserMovies,
        getMovieDetails,
      }}
    >
      {children}
    </ViewClientMovieContext.Provider>
  );
};

export const useViewClientMovie = () => {
  const context = useContext(ViewClientMovieContext);

  if (context === null) {
    throw new Error(
      "useViewClientMovie must be used within a ViewClientMovieProvider"
    );
  }

  return context;
};
