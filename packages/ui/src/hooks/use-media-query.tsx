"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [isMatch, setIsMatch] = useState<boolean | undefined>();

  useEffect(() => {
    const mql = window.matchMedia(`(${query})`);
    const onChange = () => setIsMatch(mql.matches);
    mql.addEventListener("change", onChange);
    setIsMatch(mql.matches);

    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return !!isMatch;
}
