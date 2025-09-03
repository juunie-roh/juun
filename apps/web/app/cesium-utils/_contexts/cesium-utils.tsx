"use client";

import React from "react";

import type { Feature } from "../_utils";

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
  const removeFeature = React.useCallback(() => setFeature(undefined), []);
  // Context value memoization to prevent re-rendering
  const contextValue = React.useMemo(
    () => ({
      feature,
      setFeature,
      removeFeature,
    }),
    [feature, setFeature, removeFeature],
  );

  return (
    <CesiumUtilsContext.Provider value={contextValue}>
      {children}
    </CesiumUtilsContext.Provider>
  );
}
