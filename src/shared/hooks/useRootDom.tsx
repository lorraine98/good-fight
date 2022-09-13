import { useEffect, useState } from "react";

export const useNextDom = () => {
  const [rootDom, setRootDom] = useState<HTMLElement | null>();

  useEffect(() => {
    setRootDom(document.getElementById("__next"));
  }, []);

  return rootDom;
};
