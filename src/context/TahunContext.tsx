import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Type for the context data
interface TahunContextType {
  tahun: number;
  setTahun: (tahun: number) => void;
}

// Create context with a default value
const TahunContext = createContext<TahunContextType | undefined>(undefined);

// Provider to wrap your application
export const TahunProvider = ({ children }: { children: ReactNode }) => {
  const DEFAULT_TAHUN = 789631; // Default value

  // Initialize state with a function to avoid SSR issues
  const [tahun, setTahun] = useState<number>(() => {
    if (typeof window !== "undefined" && localStorage) {
      const storedTahun = localStorage.getItem("tahun");
      return storedTahun ? parseInt(storedTahun, 10) : DEFAULT_TAHUN;
    }
    return DEFAULT_TAHUN; // Fallback for SSR
  });

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage) {
      localStorage.setItem("tahun", tahun.toString());
    }
  }, [tahun]);

  return (
    <TahunContext.Provider value={{ tahun, setTahun }}>
      {children}
    </TahunContext.Provider>
  );
};

// Hook for using the context in other components
export const useTahun = () => {
  const context = useContext(TahunContext);
  if (!context) {
    throw new Error("useTahun must be used within a TahunProvider");
  }
  return context;
};
