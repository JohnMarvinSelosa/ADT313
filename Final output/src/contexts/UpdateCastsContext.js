import React, { createContext, useContext } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

const UpdateCastsContext = createContext();

export const UpdateCastsProvider = ({ children }) => {
  const { accessToken } = useUser();

  const updateCast = async (castId, castData) => {
    try {
      const response = await axios.patch(`/admin/casts/${castId}`, castData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log(`Cast ${castId} updated successfully`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating cast ${castId}:`, error);
      throw new Error("Failed to update cast");
    }
  };

  return (
    <UpdateCastsContext.Provider value={{ updateCast }}>
      {children}
    </UpdateCastsContext.Provider>
  );
};

export const useUpdateCasts = () => {
  const context = useContext(UpdateCastsContext);
  if (!context) {
    throw new Error(
      "useUpdateCasts must be used within an UpdateCastsProvider"
    );
  }
  return context;
};
