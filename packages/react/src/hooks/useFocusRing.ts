import { useEffect, useState } from "react";
import { focusRingHandler } from "@explore-ds/core/a11y/focusRing";

export function useFocusRing() {
  const [isFocusVisible, setFocusVisible] = useState(false);

  useEffect(() => {
    const { attach, detach } = focusRingHandler(setFocusVisible);
    attach();
    return detach;
  }, []);

  return { isFocusVisible };
}
