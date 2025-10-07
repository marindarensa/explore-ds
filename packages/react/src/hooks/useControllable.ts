import { useEffect, useState } from "react";
import { controllable } from "@explore-ds/core/hooks/controllable";

export function useControllable<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
) {
  const [getter, setValueCore] = controllable(controlledValue, defaultValue, onChange);
  const [value, setValue] = useState(getter());

  useEffect(() => {
    if (controlledValue !== undefined) setValue(controlledValue);
  }, [controlledValue]);

  const setValueControlled = (next: T) => {
    setValue(next);
    setValueCore(next);
  };

  return [value, setValueControlled] as const;
}
