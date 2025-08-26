"use client";

import React from "react";

import { Feature } from "../_components/api";

type CesiumUtilsContextType = {
  feature?: Feature;
  setFeature: (feature?: Feature) => void;
  removeFeature: () => void;
};

const CesiumUtilsContext = React.createContext<CesiumUtilsContextType | null>(
  null,
);

export function useCesiumUtils() {
  const context = React.useContext(CesiumUtilsContext);
  if (!context)
    throw new Error("useCesiumUtils must be used within CesiumUtilsProvider");
  return context;
}

export function CesiumUtilsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [feature, setFeature] = React.useState<Feature>();

  return (
    <CesiumUtilsContext.Provider
      value={{
        feature,
        setFeature,
        removeFeature: () => setFeature(undefined),
      }}
    >
      {children}
    </CesiumUtilsContext.Provider>
  );
}
