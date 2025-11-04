// Cesium base URL global variable
declare global {
  interface Window {
    CESIUM_BASE_URL?: string;
  }

  // Global constant defined by webpack.DefinePlugin or Next.js env
  const CESIUM_BASE_URL: string;
}

export {};
