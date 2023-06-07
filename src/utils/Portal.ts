import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface IProps {
  children: ReactNode;
}

export const Portal = ({ children }: IProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(
        children,
        document.querySelector("#modal-root") as HTMLElement
      )
    : null;
};
