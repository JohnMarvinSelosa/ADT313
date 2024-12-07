import React, { createContext, useContext } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

const AddMovieContext = createContext(null);

export const AddMovieProvider = ({ children }) => {
  const { accessToken } = useUser();
  const TMDB_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmQxYTllMmM4MzkwZDIxYTY4YmJlMzE3YTNiM2ZmYSIsIm5iZiI6MTczMzMwNjUwMC43MjEsInN1YiI6IjY3NTAyODg0NWY3NDRiZjE3NDFlMDEwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.09r7rTktrNXWylHcXNAKDEjf5NeabsVwVwBTuMOp2mc";

  const searchMovies = async (query) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          query
        )}`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error searching movies:", error);
      throw error;
    }
  };

  const getMovieDetails = async (movieId) => {
    try {
      const [movieDetails, credits, images, videos] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
          },
        }).then((res) => res.json()),
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
          },
        }).then((res) => res.json()),
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
          headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
          },
        }).then((res) => res.json()),
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
          headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
          },
        }).then((res) => res.json()),
      ]);

      return { movieDetails, credits, images, videos };
    } catch (error) {
      console.error("Error fetching movie details:", error);
      throw error;
    }
  };

  const addMovie = async (movieData) => {
    try {
      const response = await axios.post("/admin/movies", movieData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.data) {
        throw new Error("Failed to add movie");
      }
      return response.data;
    } catch (error) {
      console.error("Error adding movie:", error);
      if (error.response) {
        console.error("Response Error:", error.response.data);
        console.error("Response Status:", error.response.status);
        console.error("Response Headers:", error.response.headers);
        throw new Error(error.response.data.message || "Failed to add movie");
      }
      throw error;
    }
  };

  const addCasts = async (casts) => {
    try {
      const castPromises = casts.map((cast) =>
        axios.post("/admin/casts", cast, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
      );
      await Promise.all(castPromises);
    } catch (error) {
      console.error("Error adding casts:", error);
      if (error.response) {
        console.error("Response Error:", error.response.data);
        throw new Error(error.response.data.message || "Failed to add casts");
      }
      throw error;
    }
  };

  const addPhotos = async (photos) => {
    try {
      const photoPromises = photos.map((photo) =>
        axios.post("/admin/photos", photo, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
      );
      await Promise.all(photoPromises);
    } catch (error) {
      console.error("Error adding photos:", error);
      if (error.response) {
        console.error("Response Error:", error.response.data);
        throw new Error(error.response.data.message || "Failed to add photos");
      }
      throw error;
    }
  };

  const addVideos = async (videos) => {
    try {
      const videoPromises = videos.map((video) =>
        axios.post("/admin/videos", video, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
      );
      await Promise.all(videoPromises);
    } catch (error) {
      console.error("Error adding videos:", error);
      if (error.response) {
        console.error("Response Error:", error.response.data);
        throw new Error(error.response.data.message || "Failed to add videos");
      }
      throw error;
    }
  };

  return (
    <AddMovieContext.Provider
      value={{
        searchMovies,
        getMovieDetails,
        addMovie,
        addCasts,
        addPhotos,
        addVideos,
      }}
    >
      {children}
    </AddMovieContext.Provider>
  );
};

export const useAddMovie = () => {
  const context = useContext(AddMovieContext);
  if (context === null) {
    throw new Error("useAddMovie must be used within a AddMovieProvider");
  }
  return context;
};
