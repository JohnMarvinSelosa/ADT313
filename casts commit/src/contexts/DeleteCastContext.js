import React, { createContext, useContext } from "react";
import axios from "axios";

const DeleteCastContext = createContext();

export const DeleteCastProvider = ({ children }) => {
  const deleteCast = async (castId, userId) => {
    try {
      const response = await axios.delete(`/admin/casts/${castId}`, {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });
      console.log(`Cast ${castId} deleted successfully`, response.data);
    } catch (error) {
      console.error(`Error deleting cast ${castId}:`, error);
    }
  };

  return (
    <DeleteCastContext.Provider value={{ deleteCast }}>
      {children}
    </DeleteCastContext.Provider>
  );
};

export const useDeleteCast = () => {
  const context = useContext(DeleteCastContext);
  if (!context) {
    throw new Error("useDeleteCast must be used within a DeleteCastProvider");
  }
  return context;
};
