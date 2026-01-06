"use client";
import type { Viewer } from "cesium";
import React from "react";

type ViewerContextType = {
  viewer?: Viewer;
  setViewer: (v: Viewer | undefined) => void;
};

const ViewerContext = React.createContext<ViewerContextType | null>(null);

export function useViewer() {
  const context = React.useContext(ViewerContext);
  if (!context) throw new Error("useViewer must be used within ViewerProvider");
  return context;
}

export function ViewerProvider({ children }: { children: React.ReactNode }) {
  const [viewer, setViewer] = React.useState<Viewer>();

  return (
    <ViewerContext.Provider value={{ viewer, setViewer }}>
      {children}
    </ViewerContext.Provider>
  );
}
